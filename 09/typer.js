let playerName = prompt('Palun sisesta oma nimi');

class Typer{
    constructor(name){
        this.name = name;
        this.wordsInGame = 10;
        this.startingWordLength = 2;
        this.words = [];
        this.startTime = 0;
        this.endTime = 0;
        this.typeWords = [];
        this.wordsTyped = 0;
        this.word = "a";

        this.loadFromFile();

    }

    loadFromFile(){
        $.get("lemmad2013.txt", (data) => this.getWords(data));
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

        this.startTyper();
    }

    startTyper(){
        this.generateWords();
        this.startTime = performance.now();
        $(document).on('keypress', (event)=>this.shortenWords(event.key))
    }

    shortenWords(keypressed){
        console.log(keypressed);
        if(this.word.length > 1 && this.word.charAt(0) == keypressed){
            this.word = this.word.slice(1);
            this.drawWord();
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped != this.wordsInGame - 1){
            this.wordsTyped++;
            this.selectWord();
        } else if(this.word.length == 1 && this.word.charAt(0) == keypressed && this.wordsTyped == this.wordsInGame - 1){
            this.endTime = performance.now();
            $('#score').html(this.name + " sinu aeg oli " + ((this.endTime-this.startTime)/1000).toFixed(2));
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
}

let typer = new Typer(playerName);