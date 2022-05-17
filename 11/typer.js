class Typer{
    constructor(){
        this.name;
        this.wordsInGame = 3;
        this.startingWordLength = 4;
        this.words = [];
        this.startTime = 0;
        this.endTime = 0;
        this.typeWords = [];
        this.wordsTyped = 0;
        this.word = "a";
        this.results = []
        this.charsTyped = 0;

        this.loadFromFile();


    }

    loadFromFile(){
        $.get("lemmad2013.txt", (data) => this.getWords(data));

        $.get("database.txt", (data) => {
            let content = JSON.parse(data).content;
            console.log(content);
            this.results = content;
            localStorage.setItem('score', JSON.stringify(content));
        });
    }

    getWords(data){
        console.log(data);
        const dataFromFile = data.split('\n');
        this.seprateWordsByLength(dataFromFile);
    }

    seprateWordsByLength(data){
        for(let i = 0; i < data.length; i++){
            const wordLength = data[i].length;

            if(this.words[wordLength] === undefined){
                this.words[wordLength] = [];
            }

            this.words[wordLength].push(data[i]);
        }

        console.log(this.words);

        $('#submitName').click(()=>{
            this.name= $('#nameValue').val();
            this.wordsInGame = parseFloat($('#wordsInGame').val());
            this.startingWordLength = parseFloat($('#startingWordLength').val());
            if(this.wordsInGame+this.startingWordLength < 31){
                this.startTyper();
                $('#name').hide();
            }else{
                $('#error').show();
            }

        })

    }

    startTyper(){
        this.generateWords();
        this.startTime = performance.now();
        $(document).off('keypress');
        $(document).on('keypress', (event)=>this.shortenWords(event.key));
        $('#byCharsInMinute').click(()=>{this.showResults()})
        this.updateGameInfo();
        this.showResults();
    }

    shortenWords(keypressed){
        console.log(keypressed);
        if(this.word.length > 1 && this.word.charAt(0) == keypressed){
            this.word = this.word.slice(1);
            this.charsTyped++;
            this.drawWord();
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped != this.wordsInGame - 1){
            this.wordsTyped++;
            this.charsTyped++;
            this.selectWord();
            this.updateGameInfo();
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped == this.wordsInGame - 1){
            this.endTime = performance.now();
            this.charsTyped++;
            this.updateGameInfo();
            this.wordsTyped = 0;

            $('#score').html(this.name + " sinu aeg oli " + ((this.endTime-this.startTime)/1000).toFixed(2) + " Sinu keskmine kirjutamise kiirus oli " + (this.charsTyped/((this.endTime-this.startTime)/1000)*60).toFixed(0) + " tähte minutis");
            $('#wordDiv').hide();
            $('#startNew').show();
            this.saveResults();
            $(document).off('keypress');
            $(document).on('keypress', (event) =>{
                this.startNewGame(event.keyCode);
            })
        } else if(this.word.charAt(0) != keypressed){
             $('#container').addClass('red-background');
             setTimeout(function(){
                $('#container').removeClass('red-background');
             }, 100);
        }
    }

    updateGameInfo(){
        $('#info').html(this.wordsTyped + 1 + "/" + this.wordsInGame);
    }

    startNewGame(key){
        console.log(key)

        if(key===114){

            this.startTyper();
            $('#wordDiv').show();
            $('#startNew').hide();
        }
    }

    saveResults(){
        let result = {
            name: this.name,
            time: ((this.endTime-this.startTime)/1000).toFixed(2),
            charsInMinute: (this.charsTyped/((this.endTime-this.startTime)/1000)*60).toFixed(0)
        }



        this.results.push(result);

        this.sortResults();

        this.results.splice(10, 10);

        localStorage.setItem('score', JSON.stringify(this.results));

        $.post('server.php', {save: this.results}).done(function(){
            console.log('Success');
        }).fail(function(){
            alert('FAIL');
        }).always(
            function(){
                console.log('Tegime midagi AJAXiga');
            }
        )

        this.showResults();
    }

    sortResults(){
        if($('#byCharsInMinute').prop('checked')){
            this.results.sort((a, b) => parseFloat(a.charsInMinute) - parseFloat(b.charsInMinute));
        }else{
            this.results.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
        }
    }

    showResults(){
        $('#results').html("");
        this.sortResults();
        for(let i = 0; i < this.results.length; i++){
            if(i === 10){break;}
            $('#results').append('<div class="'+ i +'"><div>' + (i+1) + '. ' + this.results[i].name + '</div><div> ' + this.results[i].time + '</div><div> ' + this.results[i].charsInMinute + '</div></div>');
            $("." + i).click(()=>{this.deleteResult(i)});
        }
    }

    generateWords(){
        for(let i = 0; i < this.wordsInGame; i++){
            const wordLength = this.startingWordLength + i;
            const randomWord = Math.round(Math.random() * this.words[wordLength].length);
            console.log(wordLength, randomWord);

            this.typeWords[i] = this.words[wordLength][randomWord];
        }
        console.log(this.typeWords);
        this.selectWord();
    }

    selectWord(){
        this.word = this.typeWords[this.wordsTyped];
        this.drawWord();
    }

    drawWord(){
        $('#wordDiv').html(this.word);
    }

    deleteResult(i){
        if(window.location.search.indexOf("?admin=12345678") > -1){
            console.log(i + 'delete');
            this.results.splice(i, 1);
            localStorage.setItem('score', JSON.stringify(this.results));

            $.post('server.php', {save: this.results}).done(function(){
                console.log('Success');
            }).fail(function(){
                alert('FAIL');
            }).always(
                function(){
                    console.log('Tegime midagi AJAXiga');
                }
            )

            this.showResults();
        }

    }
}

let typer = new Typer();