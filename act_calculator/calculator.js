// get number of mistakes in each section from localstorage (if user visited the page before)
e = localStorage.getItem("actscoree");
m = localStorage.getItem("actscorem");
r = localStorage.getItem("actscorer");
s = localStorage.getItem("actscores");

// get number of mistakes in each section from URL parameters (if user uses a ready-made link)
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
ep = urlParams.get('e')
mp = urlParams.get('m')
rp = urlParams.get('r')
sp = urlParams.get('s')

// save URL paramenters to localstorage
if (ep !== null) {localStorage.setItem('actscoree',ep)};
if (mp !== null) {localStorage.setItem('actscorem',mp)};
if (rp !== null) {localStorage.setItem('actscorer',rp)};
if (sp !== null) {localStorage.setItem('actscores',sp)};

// set value in each input field to the value of the corresponding localstorage variable
document.getElementById('actscoree').value = localStorage.getItem('actscoree');
document.getElementById('actscorem').value = localStorage.getItem('actscorem');
document.getElementById('actscorer').value = localStorage.getItem('actscorer');
document.getElementById('actscores').value = localStorage.getItem('actscores');

// get date and time of the last update from GitHub API
const getLastUpdate= async () => {
    response = await fetch('https://api.github.com/repos/WeGoToMars/WeGoToMars.github.io/commits?path=/act_calculator/');
    myJson = await response.json();
    var lastupdate = moment(myJson[0]['commit']['author']['date'])
    var now  = moment();
    var diffHuman = moment.duration(lastupdate.diff(now)).humanize();
    document.getElementById('lastupdate').innerHTML = 'Last update was '+diffHuman+' ago, on '+lastupdate.format('MMM Do YYYY, h:mm a');
};
// puts ready-made link to user's clipboard
function copyLink() {
    var promise = navigator.clipboard.writeText(document.getElementById('copylink').value);
    document.getElementById('copylinkprompt').innerHTML = '<b>Copied!</b>';
    setTimeout(() => {document.getElementById('copylinkprompt').innerHTML = 'Click to copy direct link to this result'},1500)
};

// get dark mode preference from browser
userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
// override broser's dark mode preference with localStorage (if different)
if (localStorage.getItem("theme")=='light') { userPrefersDark = false};
if (localStorage.getItem("theme")=='dark') { userPrefersDark = true};
// put theme switch to the correct position
if (userPrefersDark) { // dark mode
    document.getElementById("dark").checked = true
    var IsOff = true;
    switchmode();
    document.getElementById("themelabel").innerHTML='Switch to light theme';
} else { // light mode
    var IsOff = false;
    document.getElementById("themelabel").innerHTML='Switch to dark theme';
    switchmode();
    options={scales:{x:{grid:{color:"rgba(0,0,0,0.3)"},ticks:{color:"black"}},y:{grid:{color:"rgba(0,0,0,0.3)"},ticks:{color:"black"}}}};
};

// function to make the switch between dark and light theme
function switchmode()
{
    if(IsOff) //Turn on dark theme
    {
        localStorage.setItem("theme", "dark");
        document.documentElement.style.setProperty("--invert", "1");
        document.documentElement.style.setProperty("--main-bg-color", "black");
        document.documentElement.style.setProperty("--text-color", "white");
        document.documentElement.style.setProperty("--button-color", "rgb(68, 14, 90)");
        document.documentElement.style.setProperty("--button-focus-color", "rgb(47, 9, 62)");
        document.documentElement.style.setProperty("--button-shadow-color", "rgb(68, 14, 90)");
        ocument.documentElement.style.setProperty("color-scheme", "dark");
        document.getElementById("themelabel").innerHTML='Switch to light theme';
        IsOff = false;
        options = {scales:{x:{grid:{color:"rgba(255,255,255,0.3)"},ticks:{color:"white"}},y:{grid:{color:"rgba(255,255,255,0.3)"},ticks:{color:"white"}}}};
    }
    else //Turn off dark theme
    {
        localStorage.setItem("theme", "light");
        document.documentElement.style.setProperty("--invert", "0");
        document.documentElement.style.setProperty("--main-bg-color", "white");
        document.documentElement.style.setProperty("--text-color", "black");
        document.documentElement.style.setProperty("--button-color", "rgb(46, 204, 113)");
        document.documentElement.style.setProperty("--button-focus-color", "rgb(39, 174, 96)");
        document.documentElement.style.setProperty("--button-shadow-color", "rgba(0, 0, 0, 0.3)");
        ocument.documentElement.style.setProperty("color-scheme", "light");
        document.getElementById("themelabel").innerHTML='Switch to dark theme'
        IsOff = true;
        options = {scales:{x:{grid:{color:"rgba(0,0,0,0.3)"},ticks:{color:"black"}},y:{grid:{color:"rgba(0,0,0,0.3)"},ticks:{color:"black"}}}};
    };
    try{updateAll()} catch {}; // update all graphs with new theme
};

// chart.js configuration
Chart.defaults.plugins.legend.display = false; // hide legend
Chart.defaults.plugins.tooltip.displayColors = false; // disable color display in tooltip
Chart.defaults.scales.linear.ticks.callback = function(value) {
    if(this.chart.config.data.datasets[0].data.length > 10){ 
        return value*100+'%' // if chart has no real data, override axis labels so it shows as 0-100%
    } else {
        return value+'%' // if chart has real data, add percent sign to axis labels
    };
};
Chart.defaults.plugins.tooltip.callbacks.title = function(value) {return 'Score: '+value[0].label};
Chart.defaults.plugins.tooltip.callbacks.label = function(value) {return 'Probability: '+value.raw.toFixed(2)+'%'};

class Database {
    constructor(chart) {
        this.fullDatabase = chart.database;
    };

    get() {
        updateStatus(); // update checkboxes status

        var database = this.fullDatabase;

        var filtered = [...database]; // copy database for non-destructive filtering

        // remove specific curve if appropriate checkbox is unchecked
        for (var i=0;i<database.length;i++) {
            if (!checkboxStatus[i]) {
                filtered[i] = [];
            };
            if (checkboxStatus[i] && filtered[i]==[]) {
                filtered[i] = database[i]
            };
        };
        
        return filtered;
    };

    calculateDifficulty() {
        var difficulty = [];
        // sum first 10 data points for 
        for (let i = 0; i < this.fullDatabase.length; i++) {
            var sum = 0;
            for (let j = 0; j < 10; j++) {
                sum = sum + this.fullDatabase[i][j];
            }
            difficulty.push(sum);
        };
        // find the easiest and hardest curves
        var hardest = difficulty.indexOf(Math.max(...difficulty));
        var easiest = Math.min(...difficulty);
        // scale every value on scale from 0 to 1
        var allDifficulties = [];
        for (let i=0; i<difficulty.length; i++) {
            allDifficulties[i] = (difficulty[i]-easiest) / (difficulty[hardest]-easiest);
        };
        return allDifficulties
    };
};

const data = {
    english: {
        database: englishCurveDatabase
    },
    math: {
        database: mathCurveDatabase
    },
    reading: {
        database: readingCurveDatabase
    },
    science: {
        database: scienceCurveDatabase
    }
};

// create database objects
var datae = new Database(data.english);
var datam = new Database(data.math);
var datar = new Database(data.reading);
var datas = new Database(data.science);

const charts_properties = {
    english: {
        id: 'charte',
        color: 'rgb(255, 99, 132)',
        default_labels: [27,28,29,30,31,32,33,34,35,36],
        default_data: new Array(37).fill(0),
        data: datae,
        input: "actscoree"
    },
    math: {
        id: 'chartm',
        color: 'rgb(36, 191, 67)',
        default_labels: [27,28,29,30,31,32,33,34,35,36],
        default_data: new Array(37).fill(0),
        data: datam,
        input: "actscorem"
    },
    reading: {
        id: 'chartr',
        color: 'rgb(22, 11, 179)',
        default_labels: [27,28,29,30,31,32,33,34,35,36],
        default_data: new Array(37).fill(0),
        data: datar,
        input: "actscorer"
    },
    science: {
        id: 'charts',
        color: 'rgb(163, 0, 217)',
        default_labels: [27,28,29,30,31,32,33,34,35,36],
        default_data: new Array(37).fill(0),
        data: datas,
        input: "actscores"
    },
    total: {
        id: 'chartt',
        color: 'rgb(52, 235, 216)',
        default_labels: [27,28,29,30,31,32,33,34,35,36],
        default_data: new Array(37).fill(0)
    },
};

class CalcChart {
    constructor(chart) {
        this.chart = chart;
        this.labels = [];
        var ctx = document.getElementById(chart.id);
        this.chart_obj = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chart.default_labels,
                datasets: [
                { 
                    data: chart.default_data,
                    fill: true,
                    backgroundColor: chart.color
                }
                ]},
            options: options
            }
        );
    };
};

class SectionChart extends CalcChart {
    update() {
        // get the data from the input field
        this.input = document.getElementById(this.chart.input).value;
        localStorage.setItem(this.chart.input, this.input);

        if (this.input == '') { // if input is empty
            this.chart_obj.data.datasets[0].data = [...this.chart.default_data]; // make chart blank
            this.chart_obj.options = options; // apply new options
            this.chart_obj.update();

            document.getElementById('allnumstooltip').classList.remove('hide'); // show tooltip
            document.getElementById('analytics').classList.add('hide'); // hide analytics

            this.updatelink();

            return
        };

        var localdatabase = this.chart.data.get(this.input);

        this.localdatabase = localdatabase;

        this.chartdata = [...this.chart.default_data]; // empty the chart data
        localdatabase.forEach(this.countPercentage, this); // count the percentage of each score

        var indexOfMaxValue = this.chartdata.indexOf(Math.max(...this.chartdata)) // find the index of the max value

        if (indexOfMaxValue < 5) { // prevent chart display from going lower than the base score
            indexOfMaxValue = 5;
        } else if (indexOfMaxValue > this.chartdata.length-5) { // or higher than the max score
            indexOfMaxValue = this.chartdata.length-5;
        };
        
        // generate approppriate lables for the chart
        if (this.input!='') {
            for (var i = 0; i <= 9; i++) {
                this.labels[i] = (indexOfMaxValue-5+i);
            }
            this.chart_obj.data.labels = this.labels;
        }; 

        // slice the chart data to show only 10 data points
        this.chartdata = this.chartdata.slice(indexOfMaxValue-5,indexOfMaxValue+5);

        this.chart_obj.options = options;

        // send the data to the chart and update it
        this.chart_obj.data.datasets[0].data = this.chartdata;
        this.chart_obj.update();

        // update the link
        this.updatelink();
    };

    countPercentage(item, index, arr) {
        // filter all disabled values
        var filtered = this.localdatabase.filter(function(val) {
            return Object.keys(val).length !== 0;
        });
        this.chartdata[item[this.input]] = this.chartdata[item[this.input]]+1 / filtered.length  * 100;
    };

    updatelink() {
        // get inputs from localStorage
        e = localStorage.getItem("actscoree");
        m = localStorage.getItem("actscorem");
        r = localStorage.getItem("actscorer");
        s = localStorage.getItem("actscores");

        // generate the link
        var link = 'wegotomars.github.io/act_calculator/?';
        if (e!='') {link = link+'e='+e+'&'};
        if (m!='') {link = link+'m='+m+'&'};
        if (r!='') {link = link+'r='+r+'&'};
        if (s!='') {link = link+'s='+s+'&'};

        document.getElementById('copylink').value = link.slice(0,-1);
    }
};

class TotalChart extends CalcChart {
    update() {
        e = window.all_charts[0];
        m = window.all_charts[1];
        r = window.all_charts[2];
        s = window.all_charts[3];

        if(e.input == '' || m.input == '' || r.input == '' || s.input == '') { // if one of the inputs is empty
            this.chart_obj.data.datasets[0].data = [...this.chart.default_data]; // make chart blank
            this.chart_obj.options = options; // apply new options
            this.chart_obj.update();

            document.getElementById('allnumstooltip').classList.remove('hide'); // show tooltip
            document.getElementById('analytics').classList.add('hide'); // hide analytics
            return
        };

        document.getElementById('allnumstooltip').classList.add('hide'); // hide tooltip
        document.getElementById('analytics').classList.remove('hide'); // show analytics

        this.chartdata = [...this.chart.default_data]; // empty the chart data
        // for every possible combination of scores
        for (let a = 0; a < e.chartdata.length; a++) {
            for (let b = 0; b < m.chartdata.length; b++) {
                for (let c = 0; c < r.chartdata.length; c++){
                    for (let d = 0; d < s.chartdata.length; d++){
                        var finalscore = Math.round((e.labels[a] + m.labels[b] + r.labels[c] + s.labels[d]) / 4) // calculate the total score
                        var prob = e.chartdata[a] * m.chartdata[b] * r.chartdata[c] * s.chartdata[d] / Math.pow(100,(4-1)) // calculate the probability
                        this.chartdata[finalscore] = this.chartdata[finalscore] + prob // write the probability to the chart data
                    }
                }
            }
        }
        var indexOfMaxValue = this.chartdata.indexOf(Math.max(...this.chartdata)); // find the index of the max value
        
        if (indexOfMaxValue < 5) { // prevent chart display from going lower than the base score
            indexOfMaxValue = 5;
        } else if (indexOfMaxValue > this.chartdata.length-5) { // or higher than the max score
            indexOfMaxValue = this.chartdata.length-5;
        };

        // generate approppriate lables for the chart
        for (var i = 0; i <= 9; i++) {
            this.labels[i] = (indexOfMaxValue-5+i);
        }

        this.chart_obj.options = options;

        // send the data to the chart and update it
        this.chart_obj.data.labels = this.labels;
        this.chartdata = this.chartdata.slice(indexOfMaxValue-5,indexOfMaxValue+5);
        this.chart_obj.data.datasets[0].data = this.chartdata;
        this.chart_obj.update();

        // calculate bottom stats
        this.calculateAverage();
    };
    calculateAverage() {
        var chartdata = this.chartdata;

        var middle = chartdata.indexOf(Math.max(...chartdata)); 
        var maxscore = this.labels[middle];
        document.getElementById("median").innerHTML = "Your most likely final score: " + maxscore;

        var persentile = percentiles[4][percentiles[4].length - maxscore]
        var peranswer = "You are better than "+persentile+"% of test takers!"
        document.getElementById('persentile').innerHTML = peranswer
    };
};

// create a new chart object for each chart
var charte = new SectionChart(charts_properties.english);
var chartm = new SectionChart(charts_properties.math);
var chartr = new SectionChart(charts_properties.reading);
var charts = new SectionChart(charts_properties.science);
window.all_charts = [charte, chartm, chartr, charts];

var chartt = new TotalChart(charts_properties.total);

function updateAll() {
    window.all_charts.forEach(chart => chart.update());
    chartt.update();
};

var checkboxStatus = [];
function updateStatus() {
    var checkboxes = [...document.getElementsByClassName('curveCheck')];
    for (var i=0;i<checkboxes.length;i++) {
        checkboxStatus[i] = document.querySelector('#c'+i).checked; // save state of each checkbox
    };
    var checked = checkboxStatus.reduce((partialSum, a) => partialSum + a, 0);
    document.getElementById('curveNumber').innerHTML = 'Currently using '+checked+' different ACT test curves!';
};

// update all charts when enter is pressed
window.addEventListener('keydown', (k) => {
    if (k.key == 'Enter') {updateAll()};
});

// update chart on input change
document.getElementById('actscoree').addEventListener('change', charte.update.bind(charte));
document.getElementById('actscorem').addEventListener('change', chartm.update.bind(chartm));
document.getElementById('actscorer').addEventListener('change', chartr.update.bind(chartr));
document.getElementById('actscores').addEventListener('change', charts.update.bind(charts));

// collapsible code
var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
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

// uncheck all checkboxes function
document.getElementById('uncheckall').onclick = function() {
    var checkboxes = [...document.getElementsByClassName('curveCheck')];
    for (var i=1;i<checkboxes.length;i++) {
        checkboxes[i].checked = false;
    }
};

// generates table for curve selector
function curveSelector() {
    var table = document.getElementById("curveselector").getElementsByTagName('tbody')[0];
    // calculate difficulty for every section
    var e = datae.calculateDifficulty(englishCurveDatabase)
    var m = datam.calculateDifficulty(mathCurveDatabase)
    var r = datar.calculateDifficulty(readingCurveDatabase)
    var s = datas.calculateDifficulty(scienceCurveDatabase)

    var dates = curvesDatabaseEntries

    for (let i = 0; i < dates.length; i++) {
        var row = table.insertRow(i)

        var celldate = row.insertCell(0)

        if (i < curvesDatabaseEntries.length){
            celldate.innerHTML = '<span class="fullcurvesdates"><b>'+dates[i]+'</b></span>'; // full curves
        } else {
            if (dates[i].slice(-14) == ' International') {
                celldate.innerHTML = '<abbr title="International test" class="redditintcurvesdates"><b>'+dates[i].slice(0,-14)+'</b></abbr>'; // international curves
            } else {
                celldate.innerHTML = '<span class="redditcurvesdates"><b>'+dates[i]+'</b></span>'; // reddit curves
            }
        }
        // add data to each cell
        var cellbox = row.insertCell(1)
        cellbox.innerHTML = '<input type="checkbox" class="curveCheck" id="c'+i+'" checked="true">'
        var celle = row.insertCell(2)
        celle.innerHTML = Math.round(e[i] *1000)/1000
        var cellm= row.insertCell(3)
        cellm.innerHTML = Math.round(m[i] *1000)/1000
        var cellr = row.insertCell(4)
        cellr.innerHTML = Math.round(r[i] *1000)/1000
        var cells = row.insertCell(5)
        cells.innerHTML = Math.round(s[i] *1000)/1000
        var cellt = row.insertCell(6)
        cellt.innerHTML = Math.round((e[i]+m[i]+r[i]+s[i])*1000/4) / 1000
    }
    // initialze sorting and sort by date
    sortTable(document.getElementById("curveselector"),0);

    var checkboxes = [...document.getElementsByClassName('curveCheck')];
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', updateAll));
};