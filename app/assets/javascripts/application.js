// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require turbolinks
//= require_tree .


var inputs = [];//this array contains the score for each participant first index for the participant, second index for the criteria, third index(0 for the weight and the other for the alternative)
var overall = [];//this array contains the overall score
var total = [];//this array contains the total score for each alternative

var winningAlternative;
var num_criteria = 2;
var max_score = 5;
var num_participants = 3;
var max_alternatives = 2;
var oveallUnanimity;
var criteriaUnanimityArray = [];


function compare(totalResult) {

    //var stringToprint = '';
    if (totalResult[0] > totalResult[1])
        return 0;
    else if (totalResult[0] == totalResult[1])
        return -1;
    else
        return 1;
}


function updateInput() {
    inputs = [
        [
            [parseInt(document.getElementById('w_p1_c1').value), parseInt(document.getElementById('p1_a1_c1').value), parseInt(document.getElementById('p1_a2_c1').value)],
            [parseInt(document.getElementById('w_p1_c2').value), parseInt(document.getElementById('p1_a1_c2').value), parseInt(document.getElementById('p1_a2_c2').value)]
        ],
        [
            [parseInt(document.getElementById('w_p2_c1').value), parseInt(document.getElementById('p2_a1_c1').value), parseInt(document.getElementById('p2_a2_c1').value)],
            [parseInt(document.getElementById('w_p2_c2').value), parseInt(document.getElementById('p2_a1_c2').value), parseInt(document.getElementById('p2_a2_c2').value)]
        ],
        [
            [parseInt(document.getElementById('w_p3_c1').value), parseInt(document.getElementById('p3_a1_c1').value), parseInt(document.getElementById('p3_a2_c1').value)],
            [parseInt(document.getElementById('w_p3_c2').value), parseInt(document.getElementById('p3_a1_c2').value), parseInt(document.getElementById('p3_a2_c2').value)]
        ]
    ];

    overall = updateOverall(inputs);
    total = updateTotal(overall);
    print(overall,total);
    winningAlternative=compare(total);
    var general = '<h6>1. General:</h6>Alternative(s) in the winning set:<br/>'
    if (winningAlternative == 0)
        general += 'Rank 1 is ' + document.getElementById("a1").innerHTML + '<br/>Rank 2 is '+ document.getElementById("a2").innerHTML;
    else if (winningAlternative == -1)
        general += 'Rank 1 are '+ document.getElementById("a1").innerHTML+' ,'+ document.getElementById("a2").innerHTML;
    else
        general += 'Rank 1 is '+ document.getElementById("a2").innerHTML + '<br/>Rank 2 is ' + document.getElementById("a1").innerHTML;

    var scoreUnanimity = '<br/><h6>2. Score Unanimity:</h6>' + unanimity(inputs);

    var discrepancies = '<br/><h6>3. Discrepancies:</h6>' + OpinionDifference(inputs);

    var sensitivityAndRobustness = '<br/><h6>4. Sensitivity and Robustness:</h6>' + robustness(inputs);

    document.getElementById("rank").innerHTML= general + '<br/>' + scoreUnanimity + '<br/>' + discrepancies + '<br/>' + sensitivityAndRobustness;
    draw();
}
//get three dimensional array as input and return two dimensional array as output
function updateOverall(inputArray) {
    a = [
        [
            inputArray[0][0][0]*inputArray[0][0][1]+inputArray[1][0][0]*inputArray[1][0][1]+inputArray[2][0][0]*inputArray[2][0][1],
            inputArray[0][0][0]*inputArray[0][0][2]+inputArray[1][0][0]*inputArray[1][0][2]+inputArray[2][0][0]*inputArray[2][0][2]
        ],
        [
            inputArray[0][1][0]*inputArray[0][1][1]+inputArray[1][1][0]*inputArray[1][1][1]+inputArray[2][1][0]*inputArray[2][1][1],
            inputArray[0][1][0]*inputArray[0][1][2]+inputArray[1][1][0]*inputArray[1][1][2]+inputArray[2][1][0]*inputArray[2][1][2]
        ],
    ];

    return a;
}
//get two dimensional array as input and return one dimensional array as output
function updateTotal(overallArray) {
    t = [overallArray[0][0]+overallArray[1][0],overallArray[0][1]+overallArray[1][1]];

    return t;
}

function print(array1, array2) {
    document.getElementById('a1_c1').innerHTML =array1[0][0];
    document.getElementById('a2_c1').innerHTML =array1[0][1];
    document.getElementById('a1_c2').innerHTML =array1[1][0];
    document.getElementById('a2_c2').innerHTML =array1[1][1];

    document.getElementById('t_a1').innerHTML =array2[0];
    document.getElementById('t_a2').innerHTML =array2[1];
}

function unanimity(inputArray){
    var finalUnanimity = 0;
    var stringToprint = '';
    for (var i = 0; i < num_criteria; i++)
    {
        var criteriaVariance = Math.abs(inputArray[0][i][0] - inputArray[1][i][0]) + Math.abs(inputArray[1][i][0] - inputArray[2][i][0]) + Math.abs(inputArray[2][i][0] - inputArray[0][i][0]) +
            Math.abs(inputArray[0][i][1] - inputArray[1][i][1]) + Math.abs(inputArray[1][i][1] - inputArray[2][i][1]) + Math.abs(inputArray[2][i][1] - inputArray[0][i][1]) +
            Math.abs(inputArray[0][i][2] - inputArray[1][i][2]) + Math.abs(inputArray[1][i][2] - inputArray[2][i][2]) + Math.abs(inputArray[2][i][2] - inputArray[0][i][2]) ;

        var maxVariance = max_score * num_participants * (max_alternatives + 1);
        var criteriaUnanimity = ((maxVariance - criteriaVariance) * 100) / maxVariance;


        var cn=i+1;
        var c_id='c'+cn;
        criteriaUnanimityArray[i]=Math.floor(criteriaUnanimity);
        stringToprint+="Unanimity for criteria" + document.getElementById(c_id).innerHTML + " is " + Math.floor(criteriaUnanimity) + " %<br />";

        finalUnanimity += criteriaUnanimity;
    }

    finalUnanimity /= num_criteria;
    oveallUnanimity = Math.floor(finalUnanimity);

    stringToprint+="Overall unanimity is " + Math.floor(finalUnanimity) + " %";
    return stringToprint;
}

function OpinionDifference(inputArray)
{
    var stringToprint = '';

    for (var i = 0; i < num_criteria; i++)
    {
        var cn=i+1;
        var c_id='c'+cn;
        // take the output for difference in opinions on weights from here. Fared
        if(Math.abs(inputArray[0][i][0] - inputArray[1][i][0]) >= 3)
        {
            stringToprint+="<br/>Participants 1 and 2 differ greatly on their weights for criteria " + document.getElementById(c_id).innerHTML;
        }

        if(Math.abs(inputArray[1][i][0] - inputArray[2][i][0]) >= 3)
        {
            stringToprint+="<br/>Participants 2 and 3 differ greatly on their weights for criteria " + document.getElementById(c_id).innerHTML;
        }

        if(Math.abs(inputArray[2][i][0] - inputArray[0][i][0]) >= 3)
        {
            stringToprint+="<br/>Participants 1 and 3 differ greatly on their weights for criteria " + document.getElementById(c_id).innerHTML;
        }

        for (var j = 1; j < max_alternatives + 1; j++)
        {
            if(Math.abs(inputArray[0][i][j] - inputArray[1][i][j]) >= 3)
            {
                var a_id='a'+j;
                var p1_id = 'p' +  0;
                var p2_id = 'p' +  1;
                // fared take the output from here please. read the line fully. you will understand what i am trying to do
                stringToprint+="<br/>Participants " + document.getElementById(p1_id).innerHTML  + " and " + document.getElementById(p2_id).innerHTML + " differ over criteria " +
                    document.getElementById(c_id).innerHTML + " on alternative " +
                    document.getElementById(a_id).innerHTML;
            }

            if(Math.abs(inputArray[1][i][j] - inputArray[2][i][j]) >= 3)
            {
                var a_id='a'+j;
                var p1_id = 'p' +  1;
                var p2_id = 'p' +  2;
                // fared take the output from here please. read the line fully. you will understand what i am trying to do
                stringToprint+="<br/>Participants " + document.getElementById(p1_id).innerHTML  + " and " + document.getElementById(p2_id).innerHTML + " differ over criteria " +
                    document.getElementById(c_id).innerHTML + " on alternative " +
                    document.getElementById(a_id).innerHTML;
            }

            if(Math.abs(inputArray[0][i][j] - inputArray[2][i][j]) >= 3)
            {
                var a_id='a'+j;
                var p1_id = 'p' +  0;
                var p2_id = 'p' +  2;
                // fared take the output from here please. read the line fully. you will understand what i am trying to do
                stringToprint+="<br/>Participants " + document.getElementById(p1_id).innerHTML  + " and " + document.getElementById(p2_id).innerHTML + " differ over criteria " +
                    document.getElementById(c_id).innerHTML + " on alternative " +
                    document.getElementById(a_id).innerHTML;
            }
        }
    }
    return stringToprint;
}

function robustness(inputArray)
{
    var stringToPrint='The result is sensitive to: <br/>';
    var sensitivityCount=0;
    for (var i = 0; i<num_participants;i++)
    {
        for (var j = 0; j<num_criteria;j++)
        {
            for (var k = 0; k<max_alternatives+1;k++)
            {
                var cn=j+1;
                var c_id='c'+cn;
                var a_id='a'+j;
                var pn = i;
                var p_id = 'p' +  pn;

                var newInputsIncrease = new Array();
                newInputsIncrease[0]=new Array();
                newInputsIncrease[0][0]=new Array();
                newInputsIncrease[0][1]=new Array();
                newInputsIncrease[1]=new Array();
                newInputsIncrease[1][0]=new Array();
                newInputsIncrease[1][1]=new Array();
                newInputsIncrease[2]=new Array();
                newInputsIncrease[2][0]=new Array();
                newInputsIncrease[2][1]=new Array();
                arrayClone(newInputsIncrease,inputArray);
                newInputsIncrease[i][j][k]++;

                var newInputsDecrease = new Array();
                newInputsDecrease[0]=new Array();
                newInputsDecrease[0][0]=new Array();
                newInputsDecrease[0][1]=new Array();
                newInputsDecrease[1]=new Array();
                newInputsDecrease[1][0]=new Array();
                newInputsDecrease[1][1]=new Array();
                newInputsDecrease[2]=new Array();
                newInputsDecrease[2][0]=new Array();
                newInputsDecrease[2][1]=new Array();
                arrayClone(newInputsDecrease,inputArray);
                newInputsDecrease[i][j][k]--;

                var oi = updateOverall(newInputsIncrease);
                var ti = updateTotal(oi);
                var wi = compare(ti);

                if(wi!=winningAlternative) {
                    stringToPrint += document.getElementById(p_id).innerHTML + ', ' + document.getElementById(c_id).innerHTML + ', ' +
                        document.getElementById(a_id).innerHTML + '<br/>';
                    sensitivityCount++;
                }

                var od = updateOverall(newInputsDecrease);
                var td = updateTotal(od);
                var wd = compare(td);
                if(wd!=winningAlternative) {
                    stringToPrint += document.getElementById(p_id).innerHTML + ', ' + document.getElementById(c_id).innerHTML + ', ' +
                        document.getElementById(a_id).innerHTML + '<br/>';
                    sensitivityCount++;
                }
            }

        }
    }

    if (sensitivityCount==0)
        stringToPrint='';

    stringToPrint+='The robustness is '+ Math.floor(sensitivityCount*100/36) +' %<br>';
    return stringToPrint;

}

function arrayClone(destination, source) {
    for (var i = 0; i<num_participants;i++) {
        for (var j = 0; j < num_criteria; j++) {
            for (var k = 0; k < max_alternatives + 1; k++) {
                destination[i][j][k] = source[i][j][k];
            }
        }
    }
}


//drawing the graphic
function draw() {
    var trace1 = {
        x: ['Unanimity for criteria c1','Unanimity for criteria c2', 'Overall unanimity'],
        y: [criteriaUnanimityArray[0],criteriaUnanimityArray[1],oveallUnanimity],
        type: "bar"
    };

    var data = [trace1];
    var layout = {
        showlegend: false,
        title: "Unanimity",
        yaxis: {title: "Unanimity(%)"}
    };
    Plotly.newPlot('myDiv', data, layout);
}
