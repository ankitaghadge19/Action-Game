score = 0;
cross = true;

audio =new Audio('gameAudio.mp3');
over =new Audio('gameOver.wav');

setTimeout(() => {
    audio.play();
}, 1000);


document.onkeydown = function(e){
    console.log("Key code is: ", e.keyCode);
    if(e.keyCode == 40){
        piku = document.querySelector('.piku');
        piku.classList.add('animatePiku');
        setTimeout(()=>{
            piku.classList.remove('animatePiku');
        }, 700);

    }

    if(e.keyCode == 39){
        piku = document.querySelector('.piku');
        pikuX = parseInt(window.getComputedStyle(piku, null).getPropertyValue('left'));
        piku.style.left = (pikuX + 112)+ "px";
    }

    if(e.keyCode == 37){
        piku = document.querySelector('.piku');
        pikuX = parseInt(window.getComputedStyle(piku, null).getPropertyValue('left'));
        piku.style.left = (pikuX - 112) + "px";
    }
}

setInterval(()=>{
    piku = document.querySelector('.piku');
    gameOver = document.querySelector('.gameOver');
    monsto =  document.querySelector('.monsto');

    dx = parseInt(window.getComputedStyle(piku, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(piku, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(monsto, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(monsto, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    // console.log( offsetX,  offsetY);

    if(offsetX<73 && offsetY<52){
        
        gameOver.innerHTML = "Game Over - Reload to start again";
        monsto.classList.remove('monstoAni');
        piku.classList.remove('piku');
        piku.classList.add('cryingPiku');
        audio.pause();
        over.play();
        setTimeout(() => {
            over.pause();
        }, 5000);
    }
    else if(offsetX < 145 && cross)
    {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(()=>{
            cross = true;
        }, 1000);

        setTimeout(()=>{
            aniDur = parseFloat(window.getComputedStyle(monsto, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            monsto.style.animationDuration = newDur + 's';
            console.log('New animation duration', newDur);
        }, 500)
      
    }

  

}, 10);

function updateScore(score){
    scoreCont.innerHTML = "Your Score: " + score;
}