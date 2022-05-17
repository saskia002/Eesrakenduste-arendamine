//esimesed pildid.
$('img').css({'width':'90px', 'height':'90px'});
$('#picContainer').css({'padding':'5px'});

//esimine pilt, mdia suurelt näidatakse.
let firstPic = $('img.active').attr('src');
$('.big-img').html('<img src="' + firstPic + '">').hide().fadeIn(255, "swing");
$('.big-img img').css({'width':'510px'});

console.log(firstPic);

//event listener, kui vajutad pildile.
$('#picContainer img').click(function(){
    let currentPic = $('img.active');
    let selectedPic = $(this);

    currentPic.removeClass('active');
    selectedPic.addClass('active');

    $('.big-img').html('<img src="' + selectedPic.attr('src') + '">').hide().fadeIn(255, "swing");
    $('.big-img img').css({'width':'510px'});
});

//Piltide nav nuppud.
$('#prev').click(picBackward);
$('#next').click(picForward);

function picForward(){
    let currentPic = $('img.active');
    let selectedPic = currentPic.next(); //next viitab jätgmisele elemendile, mis DOM-is. ehk siis rida all pool.

    console.log(selectedPic);

    //kontroll, et kas on ikka järgmist pilti saada.
    if(selectedPic.length == 0){
        selectedPic = $('#picContainer img').siblings().first();
    }

    currentPic.removeClass('active');
    selectedPic.addClass('active');

    $('.big-img').html('<img src="' + selectedPic.attr('src') + '">').hide().fadeIn(255, "swing");
    $('.big-img img').css({'width':'510px'});
}

function picBackward(){
    let currentPic = $('img.active');
    let selectedPic = currentPic.prev(); //prev viitab eelmisele elemendile, mis DOM-is. ehk siis rida üleval pool.

    console.log(selectedPic);

    //kontroll, et kas on ikka eelmist pilti saada.
    if(selectedPic.length == 0){
        selectedPic = $('#picContainer img').siblings().last();
    }

    currentPic.removeClass('active');
    selectedPic.addClass('active');

    $('.big-img').html('<img src="' + selectedPic.attr('src') + '">').hide().fadeIn(255, "swing");
    $('.big-img img').css({'width':'510px'});
}

//keyboard event listner
$(document).keydown(buttonPress);

function buttonPress(event){
    //console.log(event.keyCode);
    //37, 39

    if(event.keyCode == 39){picForward();}
    if(event.keyCode == 37){picBackward();}

    //fulscreen, vajutaed F (70) kalhvi.
    if(event.keyCode == 70){picFullscreen();}

    //ESC (27) vajutades kaub full screenilt.
    if(event.keyCode == 27){
        isFullscreen = true;
        picFullscreen();
    }
}

//fullscreen, dispaly css paika sättimine...
//var isFullscreen = new Boolean(false);
let isFullscreen = false;
function picFullscreen(){
    
    if(isFullscreen == false){
        //$('#fullscreen').show();
        $('#fullscreen').fadeIn(128, "swing");
        isFullscreen = true;
    }else{
        //$('#fullscreen').hide();
        $('#fullscreen').fadeOut(64, "swing")
        isFullscreen = false;
    }
}

//täisekraanile minek..
$('#enterFullscreen').click(function(){
    isFullscreen = false;
    picFullscreen();
});

//täisekraanilt exit..
$('#exitFullscreen').click(function(){
    isFullscreen = true;
    picFullscreen();
});

//fulscreen piltide nav läbi nuppude..
$('#exitFullscreen').click(function(){
    isFullscreen = true;
    picFullscreen();
});

$('#nextPic').click(picForward);
$('#prevPic').click(picBackward);
