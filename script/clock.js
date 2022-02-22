//date time meetod
let d = new Date();
//console.log(d);

//lisad sii keele valiku...



//päevad
let day = d.getDay();
let days = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
let dayContainer = document.getElementById('day');
dayContainer.innerHTML = days[day];

//aastad
let year = d.getFullYear();
document.getElementById('year').innerHTML = year;

//kuud
let month = d.getMonth();
let months = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
let monthConatiner = document.getElementById('month').innerHTML = months[month] + '.';

//kuupäev
let date = d.getDate();
document.getElementById('date').innerHTML = date + '.';

//kella aeg
let hours = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();

let secondsContainer = document.getElementById('seconds');
let minutesContainer = document.getElementById('minutes');
let hoursContainer = document.getElementById('hours');

////seda asendab update blokk
secondsContainer.innerHTML = seconds;
minutesContainer.innerHTML = minutes + ':';
hoursContainer.innerHTML = hours+ ':';

//kella uuendamine siin selle fnc sees
function updateClock(){
    let d = new Date();
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    //kella õige formmat ehk 00 mitte 0
    if(hours <10){
        hours = '0' + hours;
    }
    if(minutes <10){
        minutes = '0' + minutes;
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }

    secondsContainer.innerHTML = seconds;
    minutesContainer.innerHTML = minutes + ':';
    hoursContainer.innerHTML = hours+ ':';
}

//kella uuendamine iga teatud aja tagant, ehk teeb seda koguaeg
window.setInterval(updateClock, 100);

////

//event listener button jaoks
let fontSize = 13;

//väiksemaks
document.getElementById('smaller').addEventListener('click', function(){
    fontSize --;
    document.getElementById('container').style.fontSize = fontSize + 'px';
})

//suurmekas
document.getElementById('bigger').addEventListener('click', function(){
    fontSize ++;
    document.getElementById('container').style.fontSize = fontSize + 'px';
})

//ctrl f5 teeb full refesh lehel!