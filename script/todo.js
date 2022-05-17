class Entry{
    constructor(title, description, date, time){
        this.title = title;
        this.description = description;
        this.date = date;
        this.done = false;
        this.time = time;
        this.notify = false;
    }
}

class Todo{
    constructor(){
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        document.querySelector('#addButton').addEventListener('click', () => {this.addEntry();});
        //document.querySelector("#addButton").addEventListener("click", functionthis.addEntry)

        this.render();
        setInterval(()=>{
            this.getNotification();
        }, 10000);
              

        
    }

    getNotification(){
        const d = new Date();
        let date = d.getDate();
        let month = d.getMonth() + 1;
        const year = d.getFullYear();
		
		let hours = d.getHours();
		let minutes = d.getMinutes();
		
        let change = false;
        if(date < 10){
            date = "0"+ date;
        }
        if(month < 10){
            month = "0"+ month;
        }
        if(minutes < 10){
            minutes = "0"+ minutes;
        }
        if(hours < 10){
            hours = "0"+ hours;
        }

        const fulldate = year + "-" + month + "-" + date;
		const fullTime = hours + ":" + minutes;
		
        console.log(fulldate);
        this.entries.forEach((entryValue)=>{
            if(entryValue.date == fulldate && entryValue.time == fullTime && entryValue.done == false){
                entryValue.notify = true;
                change = true;
                this.saveLocal();
            }
        });

        if(change == true){
            this.render();
        }
            
       
        
    }

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const descriptionValue = document.querySelector('#description').value;
        const dateValue = document.querySelector('#date').value;
        const timeValue = document.querySelector('#time').value;

        this.entries.push(new Entry(titleValue, descriptionValue, dateValue, timeValue));

        console.log(this.entries);

        this.saveLocal();
        this.render();

    }

    render(){
        if(document.querySelector('.todo-list')){
            document.body.removeChild(document.querySelector('.todo-list'));
        }
        const ul = document.createElement('ul');
        ul.className = "todo-list";

        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            const div = document.createElement('div');
            const deleteDiv = document.createElement('div');
            deleteDiv.className ="delete-div";
            const removeButton = document.createElement('button');
            removeButton.className = 'delete-button';
            const removeIcon = document.createTextNode('X');
            div.innerHTML = `<div class="title-value">${entryValue.title}</div><div class="description-value">${entryValue.description}</div><div class="date-value">${entryValue.date}<br>${entryValue.time}</div>`;

            if(entryValue.done){
                li.classList.add('task-completed');
            }
            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.saveLocal();
                this.render();
            });

            div.addEventListener('click', ()=>{
                if(!entryValue.done){
                    li.classList.add('task-completed');
                    this.entries[entryIndex].done = true;
					this.entries[entryIndex].notify = false;
                    this.saveLocal();
					this.render();
                }else{
                    li.classList.remove('task-completed');
					this.entries[entryIndex].done = false;
					this.entries[entryIndex].notify = true;
                    this.saveLocal();
					this.render();
                }
            });

            if(entryValue.notify){
                li.classList.add('notification');
            }else{
				li.classList.remove('notification');
			}

            removeButton.appendChild(removeIcon);
            deleteDiv.appendChild(removeButton);
            li.appendChild(div);
            li.appendChild(deleteDiv);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }

    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
    }
}

const todo = new Todo();