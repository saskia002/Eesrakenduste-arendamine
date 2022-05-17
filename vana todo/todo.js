class Entry{
    constructor(title, description, date){
        //kõik mis html siia läheb..
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
    }
}

class Todo{
    constructor(){
        //koht kus hoiame väärtusi..
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        //nupu vajutusel salvestab siia..
        document.querySelector("#addButton").addEventListener('click', () => {this.addEntry();}); //fnc aga lic noolena läheb..

        this.render();
    }

    addEntry(){
        //fnc selle salvestamiseks..
        const titleValue = document.querySelector("#title").value;
        const descriptionValue = document.querySelector("#description").value;
        const dateValue = document.querySelector("#date").value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue));

        this.saveLocal();
        this.render();
    }

    render(){
        if(document.querySelector('.todo-list')){
            document.body.removeChild(document.querySelector('.todo-list'));
        }

        const ul = document.createElement('ul');
        ul.className = "todo-list"

        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            const div = document.createElement('div');
            const removeButton = document.createElement('div');
            removeButton.className = 'delete-button';
            const removeIcon = document.createTextNode('X')
            div.innerHTML = `${entryIndex+1}. ${entryValue.title}<br>${entryValue.description}<br>${entryValue.date}`;

            if(entryValue.done){
                li.classList.add('task-completed');
            }

            //kustutuamine
            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.saveLocal();

                this.render();
            });

            //done valiku sättimine..
            div.addEventListener('click', ()=>{
                if(!entryValue.done){
                    li.classList.add('task-completed');
                    this.entries[entryIndex].done = true;
                    this.saveLocal();
                }else{
                    li.classList.remove('task-completed');
                    this.entries[entryIndex].done = false;
                    this.saveLocal();
                }
            });

            removeButton.appendChild(removeIcon)
            li.appendChild(div);
            li.appendChild(removeButton);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }

    //meetod lokaalselt andmete salvestamiseks..
    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
    }
}

const todo = new Todo();