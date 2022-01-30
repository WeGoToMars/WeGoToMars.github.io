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

var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        console.log(content)
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        }
    });
};

leftbar = document.getElementById('tsparticlesleft');
rightbar = document.getElementById('tsparticlesright');

if (window.innerWidth > 1200) {
    console.log('starting particles')
    console.log(window.innerWidth - parseInt(getComputedStyle(document.getElementById('main')).width))
    leftbar.style.width = (window.innerWidth - parseInt(getComputedStyle(document.getElementById('main')).width))/1.2 + 'px';
    leftbar.style.height = window.innerHeight + 'px';
    rightbar.style.width = (window.innerWidth - parseInt(getComputedStyle(document.getElementById('main')).width))/1.2 + 'px';
    rightbar.style.height = window.innerHeight + 'px';

    fetch("particles.json")
    .then(response => response.json())
    .then(json => {tsParticles.load('tsparticlesleft',json); tsParticles.load('tsparticlesright',json)});
} else {
    console.log('nah')
    leftbar.remove();
    rightbar.remove();
};

const getLastUpdate= async () => {
    response = await fetch('https://api.github.com/repos/WeGoToMars/WeGoToMars.github.io/commits');
    myJson = await response.json();
    var lastupdate = myJson[0]['commit']['author']['date'];
    document.getElementById('footer').innerHTML = "It always seems imposible until it's done.<br>Made by Ihor a.k.a. @wegotomars with ❤️ circa 2021 - <a href='https://github.com/WeGoToMars/WeGoToMars.github.io/commits/master'>"+lastupdate.slice(0,4)+"</a>";
    };

getLastUpdate();