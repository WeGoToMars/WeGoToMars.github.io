const canvas = document.getElementById('canvasOne'); //setup canvas size
canvas.height = window.innerHeight-1;
canvas.width = window.innerWidth-1;

radarMode = false
mylat = 0
mylong = 0

fullexplore = true

var wwd = new WorldWind.WorldWindow("canvasOne"); //define worldwindow
wwd.addLayer(new WorldWind.StarFieldLayer());
wwd.goToAnimator.travelTime = 0;
wwd.goTo(new WorldWind.Position(-180,-70,1000000000));
wwd.goToAnimator.travelTime = 3000;
wwd.globe = new WorldWind.Globe(new WorldWind.EarthElevationModel());

function switchglobe() {
    console.log(wwd.globe.projection.is2D)
    if (wwd.globe.projection.is2D) {
        wwd.globe = new WorldWind.Globe(new WorldWind.EarthElevationModel());
        console.log('to 3d')
    } else {
        wwd.globe = new WorldWind.Globe2D();
        console.log('to 2d')
    }
    wwd.redraw();
}

var attributes = new WorldWind.ShapeAttributes(null);
attributes.outlineColor = WorldWind.Color.GREEN;
attributes.interiorColor = new WorldWind.Color(0, 1, 0, 0.1);

function introanim() {
    if (document.getElementById('intro').style.display != 'none') {
        document.getElementById('intro').style.display = 'none';

        var x = document.getElementById("myAudio"); 
        x.play(); 

        //wwd.goTo(new WorldWind.Position(30,-50,21000000));
        wwd.goTo(new WorldWind.Position(0,0,71000000));
        wwd.addLayer(new WorldWind.BMNGLayer());
        wwd.addLayer(new WorldWind.AtmosphereLayer());
       
        if (mylong!=0 && mylat!=0) {
            radar0 = new WorldWind.SurfaceCircle(new WorldWind.Location(mylat,mylong), 2000e3, attributes)
            radar1 = new WorldWind.SurfaceCircle(new WorldWind.Location(mylat,mylong), 1000e3, attributes)
            radar2 = new WorldWind.SurfaceCircle(new WorldWind.Location(mylat,mylong), 300e3, attributes)
        
            /* 
            bounds=[]
            for (let i=Math.round(mylat)-30;i<Math.round(mylat)+30;i++) {
                for (let j=Math.round(mylong)-30;j<Math.round(mylong)+30;j++) {
                    console.log(distance(i,mylat,j,mylong))
                    if(distance(i,mylat,j,mylong)>1900 && 2100>distance(i,mylat,j,mylong)){
                        bounds.push(new WorldWind.Location(i,j));
                        break;
                    }
                }
            }
            for (let i=bounds.length-1;i>=0;i--) {
                bounds.push(new WorldWind.Location(bounds[i].latitude,bounds[i].longitude+2*(mylong-bounds[i].longitude)));
            }
            */

            //piclayer.addRenderable(new WorldWind.SurfacePolyline(bounds))
            piclayer.addRenderable(radar0)
            piclayer.addRenderable(radar1)
            piclayer.addRenderable(radar2)
            wwd.addLayer(piclayer);
        }

        //wwd.addLayer(new WorldWind.FrameStatisticsLayer(wwd));
        //wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
        update();
        document.getElementById('settings').style.display = 'block';
        document.getElementById('controls').style.display = 'block';
    }
}

const loadDB= async () => {
    //https://www.space-track.org/basicspacedata/query/class/gp/OBJECT_TYPE/ROCKET%20BODY,DEBRIS/DECAY_DATE/null-val/orderby/NORAD_CAT_ID%20asc/metadata/true/predicates/OBJECT_NAME,OBJECT_ID,PERIOD,APOAPSIS,PERIAPSIS,OBJECT_TYPE,COUNTRY_CODE,LAUNCH_DATE,SITE,RCS_SIZE,TLE_LINE1,TLE_LINE2/format/csv
    csv = await fetch('db.csv');
    cat = await csv.text();
    cata = Papa.parse(cat);
    console.log('data loaded!')
    return cata['data']
}

function distance(lat1,lat2, lon1, lon2)
{
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;

    return(c * r);
}

pickid = 10;
function draw(db,layer){ //draw debris
    db.forEach(function(item) {
        try{
        var satrec = satellite.twoline2satrec(item[10], item[11]);
        var positionAndVelocity = satellite.propagate(satrec, new Date());
        var positionEci = positionAndVelocity.position;
        var gmst = satellite.gstime(new Date());
        var positionGd = satellite.eciToGeodetic(positionEci, gmst);
        var longitude = positionGd.longitude,
            latitude  = positionGd.latitude,
            height    = positionGd.height*1000;

        longitudeDeg = satellite.degreesLong(longitude),
            latitudeDeg  = satellite.degreesLat(latitude);

        dis = distance(latitudeDeg,mylat,longitudeDeg,mylong)
        if (radarMode) {
            if ((Math.atan(height/1000/dis) < 0.35) || (dis > 3000.0)) {
                return
            }
        }
        
        placemarkAttributes = new WorldWind.PlacemarkAttributes();
        //placemarkAttributes.drawLeaderLine = true;
        //placemarkAttributes.leaderLineAttributes.outlineColor = new WorldWind.Color(0,0,255,0.01);
        placemarkAttributes.imageSource = 'circle.png'
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.labelAttributes.font.size = 32;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 2.1);

        switch (item[9]) {
            case "SMALL":
                placemarkAttributes.imageScale = document.getElementById('size').value / 100;
                break;
            case "MEDIUM":
                placemarkAttributes.imageScale = document.getElementById('size').value / 100 * 3;
                break;
            case "LARGE":
                placemarkAttributes.imageScale = document.getElementById('size').value / 100 * 5;
                break;
        }
        placemarkAttributes.imageColor = new WorldWind.Color(1/height*10000e3,height-35e6,1-1/height*10000e3,1)

        //placemarkAttributes.labelAttributes.font.size = document.getElementById('size').value;

        placemark = new WorldWind.Placemark(new WorldWind.Position(latitudeDeg,longitudeDeg,height),true,placemarkAttributes)
        placemark.label = item[0];
        placemark.eyeDistanceScalingLabelThreshold = 4e5 * document.getElementById('size').value;

        layer.addRenderable(placemark);
        } catch (err) {}
    });
    if (layer == placemarkLayer0) {
        placemarkLayer1.removeAllRenderables()
    } else {
        placemarkLayer0.removeAllRenderables()
    }
}

function drawOrbit(db) {
    orbits.removeAllRenderables();
    orb = new WorldWind.Path(pathcords(pickid), null)
    document.getElementById('0').innerHTML = 'Object name: '+db[pickid][0]
    document.getElementById('1').innerHTML = 'Object type: '+db[pickid][5]
    document.getElementById('2').innerHTML = 'Country: '+db[pickid][6]
    document.getElementById('3').innerHTML = 'Launch date: '+db[pickid][7]
    document.getElementById('4').innerHTML = 'Launch site: '+db[pickid][8]
    document.getElementById('5').innerHTML = 'Size: '+db[pickid][9]

    document.getElementById('6').innerHTML = 'Orbit apoapsis: '+db[pickid][3] +' km'
    document.getElementById('7').innerHTML = 'Orbit periapsis: '+db[pickid][4] + ' km'
    document.getElementById('8').innerHTML = 'Orbital period: '+db[pickid][2] +' minutes'

    selectdescription(db[pickid][0])
    orbits.addRenderable(orb)
    wwd.redraw()
}

function switchradar() {
    if (!radarMode) {
        console.log('on')
        wwd.goTo(new WorldWind.Position(mylat,mylong,0))
        radarMode = true
        var x = document.getElementById('radar')
        x.play();
        document.getElementById('per').value = 100
        document.getElementById('ups').value = 1
    } else {
        console.log('off')
        var x = document.getElementById('radar')
        x.pause();
        radarMode = false;
        document.getElementById('per').value = 20
        document.getElementById('ups').value = 0.2
    }
    ups();
    draw(localdb, ACTIVELAYER);
    limitObjects();
}

function selectdescription(name){
    switch (name) {
        case 'FENGYUN 1C DEB':
            source = '2007 Chinese anti-satellite<br>missile test'
            link = 'https://en.wikipedia.org/wiki/2007_Chinese_anti-satellite_missile_test'
            break
        case 'COSMOS 2251 DEB':
            source = '2009 satellite collision:<br>Iridium 33 and Kosmos-2251'
            link = 'https://en.wikipedia.org/wiki/2009_satellite_collision'
            break
        case 'DELTA 1 DEB':
            source = 'Delta rocket second stage fragment'
            link = 'https://en.wikipedia.org/wiki/Delta_(rocket_family)'
            break
        case 'NOAA 16 DEB':
            source = 'Critical anomaly, on orbit fragmentation'
            link = 'https://en.wikipedia.org/wiki/NOAA-16'
            break
        case 'COSMOS 1275 DEB':
            source = 'On orbit explosion: reason unknown'
            link = 'https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D1%81%D0%BC%D0%BE%D1%81-1275'
            break
        case 'SL-16 DEB':
            source = 'Upper stage of Zenit-2 launcher fragment'
            link = 'https://en.wikipedia.org/wiki/Zenit-2'
            break
        case 'THORAD AGENA D DEB':
            source = 'Thorad-Agena upper stage fragment'
            link = 'https://en.wikipedia.org/wiki/Thorad-Agena'
            break
        case 'IRIDIUM 33 DEB':
            source = '2009 satellite collision:<br>Iridium 33 and Kosmos-2251'
            link = 'https://en.wikipedia.org/wiki/2009_satellite_collision'
            break
        case 'FREGAT DEB':
            source = 'Fregat second stage fragment'
            link = 'https://en.wikipedia.org/wiki/Fregat'
            break
        case 'BREEZE-M DEB':
            source = 'Briz upper stage fragment'
            link = 'https://en.wikipedia.org/wiki/Briz_(rocket_stage)'
            break
        case 'CZ-4 DEB':
            source = 'Long March 4A upper stage fragment'
            link = 'https://en.wikipedia.org/wiki/Long_March_4A'
            break
        case 'ATLAS 5 CENTAUR DEB':
            source = 'Atlas V (Centaur) upper stage fragment'
            link = 'https://en.wikipedia.org/wiki/Centaur_(rocket_stage)'
            break
        case 'THOR ABLESTAR DEB':
            source = 'Exploded for unknown reasons'
            link = 'https://en.wikipedia.org/wiki/Thor-Ablestar'
            break
        case 'TITAN 3C TRANSTAGE DEB':
            source = 'Titan 3C upper stage fragment'
            link = 'https://en.wikipedia.org/wiki/Titan_IIIC'
            break
        case 'OPS 4682 DEB':
            source = 'SNAP-10A nuclear satellite fragments'
            link = 'https://en.wikipedia.org/wiki/SNAP-10A'
            break
        default:
            source = ''
            link = ''
            break
    }
    if (source != '') {
        document.getElementById('9').innerHTML = 'Source: '+source
        document.getElementById('10').innerHTML = '<a target="_blank" href='+link+'>More info</a>'
    } else {
        document.getElementById('9').innerHTML = ''
        document.getElementById('10').innerHTML = ''    
    }
}

cancelled = false
function animateRotation(speed) {
    if(!cancelled) {
        wwd.goToAnimator.travelTime = speed;
        wwd.goToAnimator.animationFrequency = 5;
        wwd.goTo(new WorldWind.Location(0,0,0),frame2);
    }
}

function frame2(){wwd.goTo(new WorldWind.Location(0,150,0),frame3);}
function frame3(){wwd.goTo(new WorldWind.Location(0,-60,0),frame4);}
function frame4(){wwd.goTo(new WorldWind.Location(0,0,0), frame2);}

function pathcords(id) {
    patharr = []
    item = localdb[id]
    console.log(item)
    period = item[2]
    n = document.getElementById('n').value
    if (period > 300) {period = 300}
    console.log(Math.round(period)*n)
    for (k = 0; k<Math.round(period)*n; k++) {
        var satrec = satellite.twoline2satrec(item[10], item[11]);
        var positionAndVelocity = satellite.propagate(satrec, subbSecs(new Date(),k));
        var positionEci = positionAndVelocity.position;
        var gmst = satellite.gstime(subbSecs(new Date(),k));
        var positionGd = satellite.eciToGeodetic(positionEci, gmst);
        patharr.push(new WorldWind.Position.fromRadians(positionGd.latitude,positionGd.longitude,positionGd.height*1000));
    }
    return patharr
}

var handlePick = function (o) {
    var x = o.clientX,
        y = o.clientY;

    pickList = wwd.pick(wwd.canvasCoordinates(x, y));
    //pickList = wwd.pickShapesInRegion(new WorldWind.Rectangle(x-20, y-20, 40, 40));
    //console.log(pickList.objects.length, pickid, x,y)
}

var grapPick = function() {
    console.log(pickList.objects)
    pickid = ACTIVELAYER.renderables.findIndex(sat => sat == pickList.objects[0].userObject)
}

wwd.addEventListener("mousemove", handlePick);
wwd.addEventListener('dblclick', grapPick)
document.onkeydown =  changePick;


function changePick(e) {
    e = e || window.event;
    console.log(e.key)
    if (e.key == 'd') { //ahead 1 pick
        pickid++;
    } else if (e.key == 'a') { //behind 1 pick
        pickid--;
    } else if (e.key == 'x') { //random pick
        pickid = Math.round(Math.random()*localdb.length)
        console.log('random')
    } else if (e.key == 'q') { //stop rotation
        wwd.goToAnimator.cancel();
        cancelled = true;
        time=setTimeout(function(){
            wwd.goToAnimator.cancel();
            console.log('1')
        }),100;
        time=setTimeout(function(){
            wwd.goToAnimator.cancel();
            console.log('1')
        }),100;
    } else if (e.key == 'h') { //hide settings
        if (document.getElementById('settings').style.display != 'none') {
            document.getElementById('settings').style.display = 'none'
            document.getElementById('controls').style.display = 'none'
        } else {
            document.getElementById('settings').style.display = 'block'
            document.getElementById('controls').style.display = 'block'
        }
    } else if (e.key == 'f') { //enter fullexplore
        fullexplore = true
        cancelled = false
        fullexplorestart();
    }

    console.log(pickid)
    drawOrbit(localdb)
    wwd.redraw();
}

function subbSecs(t, mins) {
    t.setMinutes(t.getMinutes() - mins);
    return t;
  }

function limitObjects() {
    localdb = []
    for (i = 1;i<cata['data'].length;i++) {
        if (Math.random() < document.getElementById('per').value / 100) {
            localdb.push(cata['data'][i])
        }
    }
    console.log('limit applied!')
}

function fullexplorestart() {
    if (fullexplore) {
        document.getElementById('per').value = 100;
        document.getElementById('ups').value = 0;
        limitObjects();
        ups();
        wwd.redraw();
        animateRotation(30000);
    }
}

wwd.drawContext.fadeTime = 0; //setup
placemarkLayer0 = new WorldWind.RenderableLayer("Placemarks0")
placemarkLayer1 = new WorldWind.RenderableLayer("Placemarks1")
orbits = new WorldWind.RenderableLayer("orbits")
piclayer = new WorldWind.RenderableLayer("pics")
radar = new WorldWind.RenderableLayer("radarline")

wwd.addLayer(placemarkLayer0);
wwd.addLayer(placemarkLayer1);
wwd.addLayer(orbits);
wwd.addLayer(radar);

async function load() {
    getLocation();
    document.getElementById('settings').style.display = 'none';
    document.getElementById('controls').style.display = 'none';
    await loadDB();
    limitObjects();
    getLocation();
}

function ups(){ //onchange ups
    clearInterval(time);
    upsval = document.getElementById('ups').value;
    update();
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    mylat = position.coords.latitude;
    mylong = position.coords.longitude;
  }

upsval = 1;
x=0;
function update(){ //mainloop
    if(upsval > 0) {
        time=setInterval(function(){
            //console.log('UPDATE')
            if (x==0) {
                draw(localdb, placemarkLayer1);
                ACTIVELAYER = placemarkLayer1;
                x++;
            } else {
                draw(localdb, placemarkLayer0);
                ACTIVELAYER = placemarkLayer0;
                x--;
            }
            wwd.redraw();
            ups();
        },2000/upsval);    
}
}