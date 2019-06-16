// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on potential friends.
// ================================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });


    // The matchVal function takes two objects of type friendList[x], and calculates
    // the difference.  Then it adds that to the total difference.  Once all the 
    // scores have been compared/calculated, the total difference is returned.
    var matchVal = function(thing1, thing2) {
        var theValue = 0;
        var tempVal = 0;
        for (var idx = 0; idx < thing1.scores.length; idx++) {
            tempVal = parseInt(thing1.scores[idx]) - parseInt(thing2.scores[idx]);
            if (tempVal < 0) { tempVal = tempVal * -1; }
            theValue = theValue + tempVal;
        }
        return theValue;
    }

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // 
    // ---------------------------------------------------------------------------
    app.post("/api/friends", function(req, res) {
        //

        var indexOfMatch = 0;
        var valueOfMatch = 99; // highest possible mismatch is currently 40
        // Ok, find a the most compatible match, now that we have everything...
        for (var i = 0; i < friendData.length; i++) {
            // For each potential match in the list, find the match value.
            var tempValueOfMatch = matchVal(req.body, friendData[i]);
            console.log(friendData[i].name + " has a value of match of: " + tempValueOfMatch);
            // If the match value calculated is BETTER than the current best match, then
            // switch to the new match.
            if (tempValueOfMatch < valueOfMatch) {
                //console.log("less than condition found");
                console.log(tempValueOfMatch + " is less than " + valueOfMatch);
                indexOfMatch = i;
                valueOfMatch = tempValueOfMatch;
            }
        }
        // Put the add to the friend list AFTER we calculate a match,
        // so we aren't comparing against ourselves...
        friendData.push(req.body);
        // Return the match
        return (res.json(friendData[indexOfMatch]));
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friendData.length = 0;

        res.json({ ok: true });
    });
};