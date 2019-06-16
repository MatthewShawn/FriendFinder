// ===============================================================================
// DATA
// Below data will hold all of the friends.
// Initially we just set it equal to some "dummy" friends.
// No offense.
// ===============================================================================
var path = require("path"); // added during debugging, to try and 'find' the files.

var friendList = [{
    name: "Salvador",
    photo: "./salvador.jpg",
    scores: [
        5,
        1,
        4,
        4,
        5,
        1,
        2,
        5,
        4,
        1
    ]
}, {
    name: "Gaige",
    photo: "./gaige.jpg",
    scores: [
        5,
        5,
        4,
        4,
        3,
        3,
        2,
        2,
        1,
        1
    ]
}, {
    name: "Maya",
    photo: "./siren2.jpg",
    scores: [
        4,
        4,
        2,
        2,
        1,
        1,
        3,
        3,
        5,
        5
    ]
}, {
    name: "Jack",
    photo: "./evilincarnate.jpg",
    scores: [
        5,
        1,
        5,
        1,
        5,
        1,
        5,
        5,
        1,
        1
    ]
}, {
    name: "Lilith",
    photo: "./firehawk.jpg",
    scores: [
        5,
        4,
        3,
        2,
        1,
        2,
        3,
        4,
        5,
        5
    ]
}, {
    name: "Claptrap",
    photo: "./dapper.jpg",
    scores: [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
    ]
}, {
    name: "Mordecai",
    photo: "./birdlover2.jpg",
    scores: [
        5,
        3,
        1,
        3,
        5,
        1,
        3,
        5,
        3,
        1
    ]
}];




// Note how we export the array. This makes it accessible to other files using require.
module.exports = friendList;