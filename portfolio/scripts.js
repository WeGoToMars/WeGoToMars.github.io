//Age counter on top of the page
birthdate = new Date('February 7, 2005 12:24:00');
milisecondsInYear = 1000*3600*24*365.24
function findMyAge() {
    current_date = new Date();
    document.getElementById('age').innerHTML = ((current_date-birthdate)/milisecondsInYear).toString().slice(0,12);
}

intervalId = window.setInterval(findMyAge, 200);

//Video autoplay on first input
function autoplayVideo() {
    console.log('trying to start video')

    document.getElementById('satcomvid').play()
    .then(result => {
        clearInterval(startVideo);
    })
    .catch(error => {
    });
}

startVideo = window.setInterval(autoplayVideo, 1000);

//Fade out navbar on image zooming
let navbar = document.getElementById('nav');
let astropics = document.getElementsByClassName('astropic');
function fadeOutEffect() {
    for(pic of astropics){
        pic.classList.remove('h');
      };
    navbar.classList.add('h');
};

//Fade in navbar on image zooming
function fadeInEffect() {
    for(pic of astropics){
        pic.classList.add('h');
      };
    navbar.classList.remove('h');
};

//zooming.js instance setup
const instance =
    new Zooming({onBeforeOpen: fadeOutEffect, 
                onBeforeClose: fadeInEffect,
                bgColor: 'rgb(0, 0, 0)',
                bgOpacity: 0.85,
                scaleBase: 0.9
                })
instance.listen('.zoomable')
instance.listen('.astropic img')
instance.listen('.screenshot-container img')

//Set up collapisible that hides the YouTube video
var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        }
    });
};

//Set up particle sidebars on desktop
leftbar = document.getElementById('tsparticlesleft');
rightbar = document.getElementById('tsparticlesright');

if (window.innerWidth > 1200) {
    leftbar.style.width = (window.innerWidth - parseInt(getComputedStyle(document.getElementById('main')).width))/1.2 + 'px';
    leftbar.style.height = window.innerHeight + 'px';
    rightbar.style.width = (window.innerWidth - parseInt(getComputedStyle(document.getElementById('main')).width))/1.2 + 'px';
    rightbar.style.height = window.innerHeight + 'px';

    fetch("particles.json")
    .then(response => response.json())
    .then(json => {tsParticles.load('tsparticlesleft',json); tsParticles.load('tsparticlesright',json)});
} else {
    leftbar.remove();
    rightbar.remove();
};

//Set up grads list
let grads = document.getElementById('grads');
let long = document.getElementById('gradslong').innerHTML;
if (window.innerWidth > 900) {
    let short = grads.innerHTML;
    let mypic = document.getElementById('mypic');

    mypic.addEventListener('mouseenter', function() {
        grads.classList.add('hov');
        setTimeout(() => {
            grads.innerHTML = long;
            grads.style.fontSize = '1.1rem';
            grads.style.color = 'white';
            grads.classList.remove('hov');
        }, 250);
    });
    mypic.addEventListener('mouseleave', function() {
        grads.classList.add('hov');
        setTimeout(() => {
            grads.innerHTML = short;
            grads.style.fontSize = '1.3rem';
            grads.style.color = 'darkgrey';
            grads.classList.remove('hov');
        }, 250);
    });
} else {
    grads.style.fontSize = '1.1rem';
    grads.style.color = 'white';
    grads.innerHTML = long;
};

//Get last update year for footer copyright from GitHub API
const getLastUpdate= async () => {
    response = await fetch('https://api.github.com/repos/WeGoToMars/WeGoToMars.github.io/commits');
    myJson = await response.json();
    var lastupdate = myJson[0]['commit']['author']['date'];
    document.getElementById('footer').innerHTML = "It always seems imposible until it's done.<br>Made by Ihor a.k.a. @wegotomars with ❤️ circa 2021 - <a href='https://github.com/WeGoToMars/WeGoToMars.github.io/commits/master'>"+lastupdate.slice(0,4)+"</a>";
    };

getLastUpdate();