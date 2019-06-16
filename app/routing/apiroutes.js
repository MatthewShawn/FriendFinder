// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on potential friends.
// ===============================================================================

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

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

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
    app.post("/api/friends", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        //if (friendData.length < 5) {
        // res.json(true);
        // } else {
        //   waitListData.push(req.body);
        //  res.json(false);
        //}
        var indexOfMatch = 0;
        var valueOfMatch = 99; // highest possible mismatch is currently 40
        // Ok, find a the most compatible match, now that we have everything...
        for (var i = 0; i < friendData.length; i++) {
            var tempValueOfMatch = matchVal(req.body, friendData[i]);
            console.log(friendData[i].name + "has a value of match of: " + tempValueOfMatch);
            if (tempValueOfMatch < valueOfMatch) {
                //console.log("less than condition found");
                console.log(tempValueOfMatch + " is less than " + valueOfMatch);
                indexOfMatch = i;
                valueOfMatch = tempValueOfMatch;
            }
        }
        friendData.push(req.body);
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