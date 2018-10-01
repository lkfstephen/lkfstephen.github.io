function runGame() {
    
    var startTime = new Date();
    var initTime = parseInt($("#initTime").val());
    var remainTimeLabel = $("#remainTime");
    var questionLabel = $("#question");
    var resultTable = $("<table><tr><td>Correct</td><td class=\"correctCount\"></td></tr><tr><td>Pass</td><td class=\"passCount\"></td></tr></table>");
    var correctCount = 0;
    var passCount = 0;
    var question = "yo";

    remainTimeLabel.text(initTime + " sec");
    questionLabel.text("ABC");
    $("#preparePage").hide();
    $("#gamePage").show();
    
    var correctButtonHandler = function () {
        correctCount = correctCount + 1;
        var td1 = $("<td></td>").text(question);
        var td2 = $("<td></td>").html("&#x2705;");
        var tr = $("<tr></tr>");
        tr.append(td1);
        tr.append(td2);
        resultTable.append(tr);
    };
    var passButtonHandler = function () {
        passCount = passCount + 1;
        var td1 = $("<td></td>").text(question);
        var td2 = $("<td></td>").html("&#x274E;");
        var tr = $("<tr class=\"questionTr\"></tr>");
        tr.append(td1);
        tr.append(td2);
        resultTable.append(tr);
    };

    $("#correctButton").bind("click", correctButtonHandler);
    $("#passButton").bind("click", passButtonHandler);
    
    // timer
    var timerFunction = function () {
        var curTime = new Date();
        var diff = curTime - startTime;
        var remainTime = initTime - diff / 1000;
        if (remainTime < 0) {
            // game over.
            console.log(resultTable.html());
            resultTable.find(".correctCount").text(correctCount);
            resultTable.find(".passCount").text(passCount);
            $("#records").prepend(resultTable);
            $("#correctButton").off();
            $("#passButton").off();
            $("#gamePage").hide();
            $("#startPage").show();
        } else {
            var rounded = Math.round( remainTime * 10 ) / 10;
            $("#remainTime").html(rounded.toFixed(1) + " sec");
            setTimeout(timerFunction, 50);
        }
    };

    timerFunction();
}


function startPrepareTime() {
    var remain = 5;
    var f = function () {
        $("#preparePage").html("" + remain);
        if (remain == 0) {
            runGame();
        } else {
            setTimeout(f, 1000);
        }
        remain = remain - 1;
    }
    f();
}

$("#start").click( function() {
    $("#startPage").hide();
    $("#preparePage").show();
    startPrepareTime();
});

// https://docs.google.com/spreadsheets/d/14rbQ0plJrVEKt5FGzO3v2CKibrF3q0SVConTJZvOV8E/gviz/tq?tqx=out:csv

$.get("https://docs.google.com/spreadsheets/d/14rbQ0plJrVEKt5FGzO3v2CKibrF3q0SVConTJZvOV8E/gviz/tq?tqx=out:csv", function (data) {
    var lines = data.split("\n");
    for (var i = 0, len = lines.length; i < len; ++i) {
        var arr = JSON.parse("[" + lines[i] + "]");
        console.log(arr);
    }
    if (data) {
        $("#startPage").show();
    } else {
        $("#startPage").html("error");
        $("#startPage").show();
    }
});
