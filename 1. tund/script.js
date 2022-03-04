 // crt k ja ss ctrl f
 //alt nooled muuvib

 //<script defer src="script.js"></script> 
 // kui defer ss laeb viimasena...
 
 
 
 
 //id järgi 1 
        //document.getElementById('first').style.backgroundColor = "pink";

        //id järgi 2
        let first = document.getElementById('first');
        let second = document.getElementById('second');

        first.style.backgroundColor = "pink";
        first.style.fontSize = "2em";
        second.style.display = "flex";


        //sisu muutmine
        first.innerHTML = 'siin on uus sisu';
        //second.textContent = 'siin on ka uus sisu';

        //sisu muutmine 2
        ///kui input siis value muutmine
        // let third = document.getElementById('third');
        // third.value = 'uus väärtus.';

        //num / value
        

        function calculate(){
            let printMan;
            let third = parseFloat(document.getElementById('third').value);
            let fourth = parseFloat(document.getElementById('fourth').value);
            printMan = third + fourth;
            second.textContent = 'arv on ' + printMan;
        }

        


        
        
        




        // let calculation;
        // let first = 1;
        // const second = "5";
        // let array = [1, 2, 3, 4, 5];
        // let object = {car:"ferrari", color:"red"}; //sõnastik põmst

        // //
        // //var third = 10; sama mis let põmst
        // //semi koolonit pole vaja otseselt.
        
        // first = 6;
        // console.log(`Esimene väärtus ${first}`);
        // console.info('info');
        // console.warn(`warning`); 

        // calculation = first + second;
        // console.log(typeof second);
        // console.log(typeof first);
        // console.log(typeof array);
        // console.log(typeof obejct);

        // console.log(typeof calculation);

        // console.log(`Väärtus on: ${calculation}`);



// massiivist lugemine

let fifth = ['orange', 'banana', 'apple']

console.log(fifth)
console.log(fifth[0])

let fruits = document.getElementById('fruits');
fruits.appendChild('<li>' + fifth[i] + '</li>\n');

for(let i = 0; i<fifth.length; i++){
    //fruits.innerHTML += fifth[i] + ' ';
    //append ja appendChild
}