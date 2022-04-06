var curvesDatabaseEntries = 
['Apr 2016', 'May 2016', 'Oct 2016', 'Jan 2017', 'Apr 2017', 'May 2017', 'Oct 2017', 'Mar 2018', 'Apr 2018', 'May 2018', 'Oct 2018', 'Mar 2019', 'Apr 2019', 'Mar 2020']
// Source: https://www.reddit.com/r/Sat/comments/llxpn0/official_reddit_sat_qas_megathread_pdfs_of_all/
// Mar 2020 curve: https://www.reddit.com/r/Sat/comments/g3fue2/march_2020_us_curve/

var curvesDataReddit =
['Aug 2019', //https://www.reddit.com/r/Sat/comments/d0jen2/august_2019_sat_curve_scale/
'Nov 2019', //https://www.reddit.com/r/Sat/comments/dww4q6/november_sat_curve_information/
'Sep 2020', //https://www.reddit.com/r/Sat/comments/j7tvvc/official_september_26_2020_sat_score_release/g87hc2l/
'Sep 2020 International', //https://www.reddit.com/r/Sat/comments/j7twcn/official_september_26_2020_sat_score_release/g87hk8t/
'Oct 2020', //https://www.reddit.com/r/Sat/comments/jc6csu/official_october_3_2020_sat_score_release_thread/g90lifw
'Oct 2020 International', //https://www.reddit.com/r/Sat/comments/jc6d49/official_october_3_2020_sat_score_release_thread/g90ndn1
'Nov 2020', //https://www.reddit.com/r/Sat/comments/jxizwn/official_november_7_2020_sat_score_release/gd6plcv/
'Dec 2020', //https://www.reddit.com/r/Sat/comments/kfdy1u/official_december_5_2020_us_sat_score_release/gg8gdtp
'Dec 2020 International', //https://www.reddit.com/r/Sat/comments/kfe01s/official_december_5_2020_international_sat_score/gg8u3gu
'Mar 2021', //https://www.reddit.com/r/Sat/comments/mdk9z5/official_march_13_2021_us_sat_score_release_and/gsa008g/
'Mar 2021 International', //https://www.reddit.com/r/Sat/comments/mdka5l/official_march_13_2021_international_sat_score/gsa0l3t/
'May 2021', //https://www.reddit.com/r/Sat/comments/nhn43z/official_may_8_2021_us_sat_score_release_and/gyxhnms/
'May 2021 International', //https://www.reddit.com/r/Sat/comments/nhn52w/official_may_8_2021_international_sat_score/gyxho6x/
'Aug 2021', //https://www.reddit.com/r/Sat/comments/ple2lh/official_august_28_2021_us_sat_score_release_and/hcao3wi
'Aug 2021 International', //https://www.reddit.com/r/Sat/comments/ple2sv/official_august_28_2021_international_sat_score/hcaocd4
'Oct 2021', //https://www.reddit.com/r/Sat/comments/q8m7ep/comment/hgq54a6
'Oct 2021 International', //https://www.reddit.com/r/Sat/comments/q8m7t8/comment/hgq4vsv
'Nov 2021', //https://www.reddit.com/r/Sat/comments/qx90h6/comment/hl9hvyq
'Dec 2021', //https://www.reddit.com/r/Sat/comments/riam6t/comment/howqrwu
'Dec 2021 International', //https://www.reddit.com/r/Sat/comments/rialb3/comment/howr1it
'Mar 2022', //https://www.reddit.com/r/Sat/comments/tnir39/comment/i229nze
'Mar 2022 International'] //https://www.reddit.com/r/Sat/comments/tniv2o/comment/i21zssp

// "Reddit curves" data, only first 10 data points are selected for consistency
var mathCurveReddit = [
[800, 770, 750, 730, 710, 700, 680, 670, 660, 650],
[800, 790, 770, 750, 730, 720, 700, 690, 680, 670],
[800, 780, 770, 750, 730, 720, 710, 690, 680, 670],
[800, 790, 780, 770, 760, 750, 740, 730, 720, 710],
[800, 780, 760, 740, 730, 710, 700, 690, 680, 670],
[800, 790, 780, 770, 750, 740, 720, 710, 700, 690],
[800, 790, 780, 760, 750, 730, 720, 710, 700, 700],
[800, 790, 780, 760, 750, 730, 720, 710, 700, 700],
[800, 790, 780, 760, 750, 730, 720, 700, 690, 680],
[800, 790, 780, 760, 750, 730, 720, 700, 690, 680],
[800, 790, 780, 770, 750, 740, 730, 720, 700, 690],
[800, 790, 770, 760, 740, 720, 710, 690, 680, 680],
[800, 790, 780, 770, 750, 740, 720, 710, 700, 690],
[800, 790, 780, 770, 760, 750, 730, 720, 710, 700],
[800, 800, 790, 780, 770, 760, 740, 730, 720, 700],
[800, 790, 780, 760, 750, 730, 720, 710, 700, 690],
[800, 790, 780, 770, 760, 740, 720, 720, 700, 690],
[800, 800, 790, 780, 760, 750, 740, 730, 710, 700],
[800, 790, 780, 760, 750, 730, 720, 710, 700, 690],
[800, 790, 780, 770, 760, 750, 740, 720, 710, 700],
[800, 790, 780, 770, 760, 740, 730, 720, 710, 700],
[800, 790, 780, 770, 760, 740, 730, 720, 710, 700]
];
var readingCurveReddit = [
[400, 390, 380, 370, 370, 360, 350, 340, 340, 330],
[400, 390, 390, 380, 370, 370, 360, 350, 350, 340],
[400, 390, 390, 380, 370, 360, 350, 340, 340, 330],
[400, 400, 390, 380, 370, 360, 350, 350, 340, 330],
[400, 400, 390, 380, 370, 360, 360, 350, 340, 330],
[400, 390, 380, 380, 370, 360, 350, 350, 340, 340],
[400, 400, 390, 380, 380, 370, 360, 350, 340, 340],
[400, 390, 380, 370, 360, 350, 350, 340, 330, 320],
[400, 400, 400, 390, 390, 380, 370, 360, 350, 350],
[400, 400, 390, 380, 380, 370, 360, 350, 340, 340],
[400, 400, 390, 380, 370, 360, 360, 350, 340, 340],
[400, 400, 390, 380, 370, 360, 350, 350, 340, 330],
[400, 400, 390, 380, 370, 360, 350, 350, 340, 330],
[400, 400, 390, 390, 380, 370, 370, 360, 350, 350],
[400, 400, 390, 380, 380, 370, 360, 350, 340, 340],
[400, 400, 390, 390, 380, 370, 360, 350, 350, 340],
[400, 390, 390, 390, 380, 370, 360, 360, 350, 340],
[400, 390, 390, 380, 370, 360, 360, 350, 340, 340],
[400, 400, 390, 380, 380, 370, 360, 360, 350, 340],
[400, 400, 390, 380, 370, 360, 360, 350, 350, 340],
[400, 400, 390, 380, 370, 370, 360, 350, 350, 340],
[400, 400, 390, 390, 380, 370, 370, 360, 350, 350]
];
var writingCurveReddit = [
[400, 390, 370, 360, 350, 340, 330, 320, 310, 310],
[400, 380, 360, 350, 340, 330, 320, 310, 310, 300],
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320],
[400, 390, 380, 360, 350, 340, 340, 330, 320, 320],
[400, 390, 380, 360, 350, 340, 340, 330, 320, 310],
[400, 390, 380, 370, 360, 350, 340, 340, 330, 330],
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320],
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320],
[400, 400, 390, 380, 370, 360, 350, 340, 330, 330],
[400, 390, 370, 360, 350, 340, 340, 330, 330, 320],
[400, 390, 380, 370, 360, 350, 350, 340, 340, 330],
[400, 400, 390, 380, 360, 350, 350, 340, 330, 320],
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320],
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320],
[400, 390, 380, 360, 350, 340, 340, 330, 320, 320],
[400, 390, 380, 370, 350, 350, 340, 330, 320, 320],
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320],
[400, 390, 380, 370, 360, 350, 340, 340, 340, 330],
[400, 390, 390, 370, 360, 350, 350, 340, 330, 320],
[400, 390, 390, 370, 360, 350, 350, 340, 330, 330],
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320],
[400, 390, 390, 370, 360, 350, 340, 340, 330, 320]
];

// Full curves data
var mathCurveDatabase = 
[
[800, 790, 780, 770, 760, 740, 730, 720, 710, 700, 690, 680, 670, 670, 660, 650, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 540, 530, 530, 520, 510, 510, 500, 490, 470, 460, 450, 440, 430, 420, 410, 400, 390, 380, 360, 350, 340, 330, 320, 310, 290, 280, 260, 250, 230, 210, 200, 200], 
[800, 790, 770, 760, 750, 730, 720, 710, 710, 700, 690, 680, 670, 660, 660, 650, 640, 630, 620, 610, 600, 600, 590, 580, 570, 560, 550, 540, 540, 530, 520, 510, 510, 500, 490, 480, 470, 460, 450, 440, 430, 420, 410, 400, 390, 370, 360, 340, 330, 320, 300, 290, 270, 260, 250, 230, 210, 200, 200], 
[800, 790, 770, 760, 740, 730, 720, 700, 690, 680, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 550, 540, 530, 530, 520, 510, 510, 500, 490, 480, 470, 460, 450, 440, 430, 430, 420, 400, 390, 380, 370, 360, 350, 330, 320, 310, 290, 280, 260, 250, 230, 210, 200, 200], 
[800, 800, 800, 790, 790, 780, 770, 750, 740, 730, 710, 700, 690, 680, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 580, 580, 570, 560, 550, 540, 540, 530, 520, 520, 510, 500, 490, 480, 470, 460, 450, 440, 430, 420, 400, 390, 380, 360, 350, 340, 320, 300, 290, 270, 250, 240, 220, 210, 200], 
[800, 800, 790, 780, 770, 750, 740, 730, 720, 710, 700, 690, 680, 670, 660, 650, 650, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 540, 540, 530, 520, 520, 510, 500, 490, 480, 470, 460, 450, 440, 430, 420, 400, 390, 380, 360, 350, 340, 320, 310, 290, 280, 260, 250, 230, 220, 210, 200], 
[800, 790, 780, 770, 750, 740, 730, 720, 710, 700, 690, 680, 670, 660, 650, 640, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 550, 540, 530, 530, 520, 510, 510, 500, 490, 480, 470, 450, 440, 430, 420, 410, 390, 380, 370, 350, 340, 330, 310, 300, 290, 270, 260, 240, 230, 210, 200, 200], 
[800, 800, 790, 790, 780, 760, 750, 740, 720, 710, 700, 690, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 550, 540, 530, 520, 520, 510, 500, 490, 480, 470, 460, 450, 440, 420, 410, 400, 390, 380, 370, 360, 340, 330, 320, 310, 290, 280, 260, 250, 230, 220, 210, 200], 
[800, 800, 790, 790, 780, 770, 750, 740, 720, 710, 700, 690, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 580, 570, 560, 560, 550, 540, 530, 530, 520, 510, 510, 500, 490, 480, 470, 460, 450, 440, 430, 420, 410, 400, 380, 370, 360, 350, 340, 330, 310, 300, 280, 270, 250, 230, 220, 210, 200], 
[800, 800, 790, 790, 780, 770, 750, 740, 730, 710, 700, 690, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 540, 530, 530, 520, 510, 510, 500, 490, 480, 470, 460, 450, 440, 430, 410, 400, 390, 380, 360, 350, 340, 330, 320, 300, 290, 270, 260, 240, 230, 220, 210, 200], 
[800, 800, 790, 770, 760, 740, 730, 710, 700, 690, 680, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 540, 530, 520, 520, 510, 500, 490, 480, 470, 460, 450, 440, 440, 430, 420, 400, 390, 380, 370, 360, 350, 340, 330, 320, 310, 290, 280, 260, 250, 230, 220, 210, 200], 
[800, 790, 770, 750, 730, 710, 700, 690, 680, 670, 660, 650, 640, 630, 620, 610, 610, 600, 590, 580, 580, 570, 560, 550, 540, 540, 530, 520, 520, 510, 500, 500, 490, 480, 470, 460, 450, 440, 430, 420, 410, 400, 390, 380, 370, 360, 350, 340, 320, 310, 300, 280, 270, 250, 230, 220, 210, 200, 200], 
[800, 790, 770, 760, 740, 730, 720, 700, 690, 680, 670, 670, 660, 650, 640, 630, 620, 610, 600, 600, 590, 580, 570, 570, 560, 550, 540, 540, 530, 520, 520, 510, 500, 490, 480, 470, 460, 450, 440, 430, 420, 410, 400, 380, 370, 360, 350, 340, 320, 310, 300, 290, 270, 260, 240, 230, 220, 200, 200], 
[800, 790, 780, 770, 750, 740, 720, 710, 700, 690, 680, 670, 660, 650, 640, 630, 620, 610, 600, 590, 590, 580, 570, 560, 550, 550, 540, 530, 530, 520, 510, 510, 500, 490, 480, 470, 460, 450, 430, 420, 410, 400, 390, 370, 360, 350, 340, 330, 310, 300, 290, 280, 260, 250, 240, 220, 210, 200, 200],
[800, 780, 770, 750, 740, 720, 710, 700, 690, 680, 670, 660, 650, 640, 630, 620, 610, 600, 600, 590, 580, 580, 570, 560, 550, 550, 540, 530, 530, 520, 510, 510, 500, 490, 480, 470, 460, 450, 440, 420, 410, 400, 390, 380, 360, 350, 340, 330, 320, 310, 290, 280, 270, 250, 240, 230, 210, 200, 200]
];
var readingCurveDatabase = 
[
[400, 400, 390, 380, 370, 370, 360, 350, 340, 330, 330, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 220, 210, 210, 200, 200, 190, 190, 180, 180, 170, 170, 160, 150, 150, 140, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 370, 370, 360, 350, 350, 340, 330, 330, 320, 320, 310, 310, 300, 300, 290, 290, 290, 280, 280, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 180, 180, 170, 170, 160, 160, 150, 140, 140, 130, 120, 110, 110, 100, 100, 100, 100], 
[400, 390, 390, 380, 370, 370, 360, 350, 350, 340, 330, 320, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 220, 210, 210, 200, 200, 190, 180, 180, 170, 170, 160, 150, 150, 140, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 380, 370, 360, 350, 350, 340, 330, 330, 320, 310, 310, 300, 300, 290, 290, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 220, 210, 210, 200, 200, 190, 190, 180, 180, 170, 170, 160, 150, 150, 140, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 390, 380, 370, 370, 360, 360, 350, 350, 340, 340, 330, 330, 320, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 250, 250, 240, 240, 230, 220, 220, 210, 200, 200, 190, 190, 180, 170, 170, 160, 150, 150, 140, 130, 120, 110, 100, 100, 100, 100], 
[400, 400, 390, 390, 390, 380, 380, 370, 360, 350, 340, 340, 330, 320, 320, 310, 310, 300, 300, 290, 280, 280, 270, 270, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 190, 180, 180, 170, 170, 160, 150, 150, 140, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 380, 380, 370, 360, 360, 350, 350, 340, 340, 330, 330, 320, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 230, 230, 220, 220, 210, 200, 200, 190, 190, 180, 180, 170, 170, 160, 150, 140, 130, 130, 120, 110, 100, 100, 100], 
[400, 390, 390, 380, 370, 360, 360, 350, 340, 340, 330, 330, 320, 310, 310, 300, 300, 290, 290, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 220, 220, 210, 210, 200, 200, 190, 190, 190, 180, 180, 170, 160, 160, 150, 140, 140, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 390, 380, 380, 370, 360, 360, 350, 340, 340, 330, 330, 320, 320, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 180, 180, 170, 160, 150, 150, 140, 130, 120, 110, 100, 100, 100], 
[400, 400, 390, 390, 380, 370, 370, 360, 350, 350, 340, 340, 330, 330, 320, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 180, 180, 170, 170, 160, 150, 140, 130, 130, 120, 110, 100, 100, 100], 
[400, 390, 370, 360, 360, 350, 340, 330, 330, 320, 320, 310, 310, 310, 300, 300, 290, 290, 280, 280, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 220, 210, 210, 200, 200, 190, 190, 180, 180, 170, 170, 160, 160, 150, 140, 130, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 390, 380, 370, 360, 350, 350, 340, 330, 330, 320, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 190, 180, 180, 180, 170, 160, 160, 150, 140, 130, 130, 120, 110, 100, 100, 100], 
[400, 390, 380, 370, 360, 350, 340, 340, 330, 320, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 190, 190, 180, 180, 170, 170, 160, 150, 150, 140, 130, 130, 120, 110, 100, 100, 100, 100],
[400, 400, 390, 390, 380, 380, 370, 360, 350, 340, 340, 330, 320, 320, 310, 310, 300, 300, 290, 280, 280, 270, 270, 260, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 210, 200, 200, 190, 190, 180, 180, 170, 170, 160, 150, 140, 140, 130, 120, 110, 100, 100, 100]
];
var writingCurveDatabase = 
[
[400, 390, 390, 380, 360, 360, 350, 340, 340, 330, 320, 310, 310, 300, 300, 290, 280, 280, 270, 270, 260, 250, 250, 240, 230, 230, 220, 210, 200, 200, 190, 180, 180, 170, 160, 160, 150, 140, 130, 120, 110, 110, 100, 100, 100], 
[400, 400, 390, 380, 370, 360, 350, 340, 340, 330, 320, 320, 310, 300, 300, 290, 280, 280, 270, 260, 250, 250, 240, 230, 230, 220, 210, 200, 200, 190, 180, 180, 170, 160, 160, 150, 140, 130, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 370, 360, 360, 350, 340, 340, 330, 320, 320, 310, 310, 300, 290, 290, 280, 270, 260, 260, 250, 250, 240, 230, 220, 220, 210, 200, 190, 190, 180, 180, 170, 160, 150, 150, 140, 130, 120, 120, 110, 100, 100, 100, 100], 
[400, 390, 380, 370, 360, 350, 340, 330, 330, 320, 310, 310, 300, 290, 290, 280, 270, 270, 260, 250, 250, 240, 240, 230, 220, 220, 210, 210, 200, 190, 190, 180, 170, 170, 160, 150, 140, 140, 130, 120, 110, 100, 100, 100, 100], 
[400, 390, 380, 360, 350, 350, 340, 330, 330, 320, 310, 310, 300, 300, 290, 290, 280, 270, 270, 260, 260, 250, 250, 240, 230, 230, 220, 220, 210, 200, 200, 190, 180, 180, 170, 160, 150, 140, 130, 130, 120, 110, 100, 100, 100], 
[400, 390, 390, 380, 370, 360, 350, 340, 340, 330, 330, 320, 310, 310, 300, 300, 290, 290, 280, 270, 270, 260, 250, 250, 240, 230, 220, 220, 210, 200, 190, 180, 180, 170, 160, 160, 150, 140, 130, 120, 110, 110, 100, 100, 100], 
[400, 390, 380, 370, 360, 350, 350, 340, 330, 330, 320, 310, 310, 300, 290, 290, 280, 270, 270, 260, 260, 250, 240, 240, 230, 220, 220, 210, 210, 200, 190, 190, 180, 170, 160, 160, 150, 140, 130, 120, 120, 110, 100, 100, 100], 
[400, 390, 370, 360, 350, 340, 340, 330, 330, 320, 310, 310, 300, 300, 290, 290, 280, 280, 270, 270, 260, 260, 250, 240, 240, 230, 230, 220, 210, 210, 200, 190, 190, 180, 170, 160, 160, 150, 140, 130, 120, 110, 100, 100, 100], 
[400, 390, 380, 370, 360, 350, 340, 340, 330, 330, 320, 320, 310, 300, 300, 290, 280, 280, 270, 270, 260, 250, 250, 240, 230, 230, 220, 210, 210, 200, 200, 190, 180, 170, 170, 160, 160, 150, 140, 130, 120, 110, 100, 100, 100], 
[400, 390, 390, 370, 360, 350, 350, 340, 330, 330, 320, 310, 310, 300, 290, 290, 280, 280, 270, 270, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 180, 170, 170, 160, 150, 140, 130, 120, 110, 100, 100, 100], 
[400, 380, 360, 340, 330, 320, 310, 310, 300, 290, 290, 280, 270, 270, 260, 250, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 190, 180, 180, 180, 170, 170, 160, 160, 150, 140, 140, 130, 120, 110, 110, 100, 100, 100], 
[400, 390, 380, 370, 350, 350, 340, 330, 320, 320, 310, 300, 290, 290, 280, 280, 270, 260, 260, 250, 240, 240, 230, 230, 220, 220, 210, 210, 200, 190, 190, 180, 180, 170, 160, 160, 150, 140, 130, 120, 120, 110, 100, 100, 100], 
[400, 380, 360, 340, 330, 320, 310, 310, 300, 290, 290, 280, 280, 270, 260, 260, 250, 240, 240, 230, 230, 220, 220, 210, 210, 200, 200, 190, 190, 180, 180, 170, 170, 160, 160, 150, 150, 140, 130, 120, 110, 110, 100, 100, 100],
[400, 390, 380, 379, 360, 350, 340, 330, 330, 320, 310, 310, 300, 290, 290, 280, 280, 270, 260, 260, 250, 240, 240, 230, 230, 220, 210, 210, 200, 200, 190, 180, 180, 170, 160, 160, 150, 140, 130, 130, 120, 110, 100, 100, 100]
];

// exact percentiles for each SAT Score, sourced from official College Board 2015 data
// source: https://blog.prepscholar.com/sat-percentiles-high-precision-2016
var percentiles = 
[
    99.9826, 99.9411, 99.8413, 99.7354, 99.5923, 99.4276, 99.1397, 98.9104, 98.6515, 98.3528, 97.8469, 97.4642, 97.0358, 96.5559, 96.0276, 95.7529, 95.1588, 94.5099, 93.7955, 93.412, 92.6195, 91.7854, 91.3402, 89.9012, 89.3846, 88.8429, 87.7155, 86.5287, 85.9086, 84.6085, 83.9373, 82.5362, 81.0451, 80.2791, 78.6945, 77.877, 76.1735, 75.3036, 73.4994, 72.5711, 70.6719, 68.7169, 67.7098, 65.6533, 64.5884, 62.4244, 61.3263, 59.078, 57.9348, 55.6413, 53.2926, 52.1009, 49.7397, 48.5449, 46.1566, 44.9528, 42.5425, 41.3276, 38.9328, 36.5401, 35.3573, 33.0214, 31.8637, 29.5865, 28.4646, 27.3632, 25.1993, 24.1399, 22.0875, 21.0863, 19.1715, 18.2462, 16.4691, 15.6303, 14.0277, 13.2678, 11.8273, 11.1387, 9.8699, 9.2785, 8.1716, 7.1558, 6.6918, 5.8385, 5.4509, 4.7419, 4.4099, 3.812, 3.2731, 3.0288, 2.5786, 2.3712, 1.9942, 1.8196, 1.6576, 1.5043, 1.3616, 1.2274, 1.1014, 0.9862, 0.8816, 0.7862, 0.6972, 0.615, 0.5381, 0.4663, 0.4022, 0.4022, 0.343, 0.2897, 0.243, 0.2014, 0.1642, 0.1312, 0.1047, 0.0831, 0.0651, 0.0484, 0.0365, 0.0278, 0.0112
];