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

var num_criteria = 2;
var max_score = 5;
var num_participants = 3;
var max_alternatives = 2;


function compare() {

    var stringToprint = '';
    if (total[0] > total[1])
        stringToprint += 'Rank 1 is ' + document.getElementById("a1").innerHTML;
    else if (total[0] == total[1])
        stringToprint += 'Rank 1 are '+ document.getElementById("a1").innerHTML+' ,'+ document.getElementById("a2").innerHTML;
    else
        stringToprint += 'Rank 1 is '+ document.getElementById("a2").innerHTML;
    return stringToprint;
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
    //unanimity(inputs);
    //OpinionDifference(inputs);

    document.getElementById("rank").innerHTML=compare() + unanimity(inputs)+OpinionDifference(inputs);
    //compare();
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
    t = [overall[0][0]+overall[1][0],overall[0][1]+overall[1][1]];

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

        // fared.. take the output from here!!
        var cn=i+1;
        var c_id='c'+cn;
        stringToprint+="<br /> Unanimity for criteria" + document.getElementById(c_id).innerHTML + " is " + Math.floor(criteriaUnanimity) + " %";

        finalUnanimity += criteriaUnanimity;
    }

    finalUnanimity /= num_criteria;

    stringToprint+="<br /> Overall unanimity is " + Math.floor(finalUnanimity) + " %";
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