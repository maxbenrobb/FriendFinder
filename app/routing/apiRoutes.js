var friendData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        //console.log(req.body);
        //res.json("working");
        //console.log(friendData);
    
        var dataArray = [];
        var currentDude = req.body;

        friendData.forEach(function(data) {
            //console.log(data.name);
            var totalScore = 0;
            //console.log("--------------------");
            totalScore+=Math.abs(currentDude.question1-data.question1);
            totalScore+=Math.abs(currentDude.question2-data.question2);
            totalScore+=Math.abs(currentDude.question3-data.question3);
            totalScore+=Math.abs(currentDude.question4-data.question4);
            totalScore+=Math.abs(currentDude.question5-data.question5);
            totalScore+=Math.abs(currentDude.question6-data.question6);
            totalScore+=Math.abs(currentDude.question7-data.question7);
            totalScore+=Math.abs(currentDude.question8-data.question8);
            totalScore+=Math.abs(currentDude.question9-data.question9);
            totalScore+=Math.abs(currentDude.question10-data.question10);

            dataArray.push(        
            {
                name: data.name,
                totalScore: totalScore
            });
        });
        
        var closestFriend = {name: "placeholder", minScore: 999};
        dataArray.forEach(function(data) {
            console.log(data.name + ': ' + data.totalScore);
            if (data.totalScore < closestFriend.minScore) {
                closestFriend = {name: data.name, minScore: data.totalScore};
            }
        });
        friendData.push(req.body);
        res.json(closestFriend.name);
    });
}