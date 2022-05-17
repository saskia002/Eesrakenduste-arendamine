let notification = ["Ühendust endiselt pole, aga muidu oleks edasi läinud järgnev info: \n"];

function validateEmail(email){
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
    if(regex.test(email)){
        return true;
    }
}

function validateMobile(mobile){
    let regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if(regex.test(mobile)){
        return true;
    }
}

$('#submit').on('click', function(){
    let name = $('#name').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let addInfo = $('#additional-info').val();

    if(name.length == 0 && $('#nameError').is(':empty')){
        $('#nameError').html('<div class="error">Nimi on kohustuslik!</div>')
    } else if(name.length > 0){
        $('#nameError').empty();
        notification.push(`Nimi: ${name}`);
    }

    if(mobile.length == 0 && $('#mobileError').is(':empty')){
        $('#mobileError').html('<div class="error">Telefoninumber on kohustuslik!</div>')
    } else if(!validateMobile(mobile)){
        $('#mobileError').html('<div class="error">Tegemist pole telefoninumbriga!</div>')
    } else if(mobile.length > 0){
        $('#mobileError').empty();
        notification.push(`Telefon: ${mobile}`);
    }

    if(email.length == 0 && $('#emailError').is(':empty')){
        $('#emailError').html('<div class="error">E-post on kohustuslik!</div>')
    } else if(!validateEmail(email)){
        $('#emailError').html('<div class="error">Tegemist pole e-postiga!</div>')
    } else if(email.length > 0 && validateEmail(email)){
        $('#emailError').empty();
        notification.push(`E-post: ${email}`);
    }

    if(addInfo.length == 0 && $('#addInfoError').is(':empty')){
        $('#addInfoError').html('<div class="error">Lisainfo on kohustuslik!</div>')
    } else if(addInfo.length > 0){
        $('#addInfoError').empty();
        notification.push(`Lisainfo: ${addInfo}`);
    }
    
    console.log(notification);

    if($('#nameError').is(':empty') && $('#mobileError').is(':empty') &&
        $('#emailError').is(':empty') && $('#addInfoError').is(':empty')){
            alert(notification.join('\n'));
            notification.splice(1,4);
        } else {
            notification.splice(1,4);
        }

});