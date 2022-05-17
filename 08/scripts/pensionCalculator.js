let malePension = 65;
let femalePension = 63;

let ageValue = $('#ageRange').val();
let showAge = $('#age');

showAge.html(ageValue);

//slaider pidevalt muutub
let age = $('input[type="range"]').on('input', function(){
    $('#age').html($('#ageRange').val());
    console.log(age.val());
});

//nupuvajutuse peale arvutab
$('input[type="button"]').click(function(){
    let gender = $('input[name="gender"]:checked').val();
    if(!gender){
        $('#result').html("Vali sugu!");
    }
    if(gender == "male" && age.val() <= malePension){
        $('#result').html(`Pensionini on jäänud ${malePension - age.val()} aastat`);
    }
    if(gender == "male" && age.val() > malePension){
        $('#result').html(`Pension hakkas ${age.val() - malePension} aastat tagasi`);
    }
    if(gender == "female" && age.val() <= femalePension){
        $('#result').html(`Pensionini on jäänud ${femalePension - age.val()} aastat`);
    }
    if(gender == "female" && age.val() > femalePension){
        $('#result').html(`Pension hakkas ${age.val() - femalePension} aastat tagasi`);
    }
});
