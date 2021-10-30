birthdate = new Date('February 7, 2005 12:24:00');
milisecondsInYear = 1000*3600*24*365.24
function findMyAge() {
    current_date = new Date();
    document.getElementById('age').innerHTML = ((current_date-birthdate)/milisecondsInYear).toString().slice(0,12);
}

intervalId = window.setInterval(findMyAge, 200);

function autoplayVideo() {
    console.log('trying to start video')

    document.getElementById('satcomvid').play()
    .then(result => {
        clearInterval(startVideo);
    })
    .catch(error => {
    });
}

startVideo = window.setInterval(autoplayVideo, 1000)

fetch("particles.json")
  .then(response => response.json())
  .then(json => tsParticles.load('tsparticles',json));

function fadeOutEffect() {
    var fadeTarget = document.getElementById('nav');
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.05;
        } else {
            clearInterval(fadeEffect);
        }
    }, 5);
}

function fadeInEffect() {
    var fadeTarget = document.getElementById('nav');
    var fadeEffect = setInterval(function () {
        if (fadeTarget.style.opacity < 1) {
            fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) + 0.05;
        } else {
            clearInterval(fadeEffect);
        }
    }, 5);
}

const instance =
    new Zooming({onBeforeOpen: fadeOutEffect, 
                onBeforeClose: fadeInEffect,
                bgColor: 'rgb(0, 0, 0)',
                bgOpacity: 0.85,
                })
instance.listen('.zoomable')
instance.listen('.astropic img')
instance.listen('.screenshot-container img')