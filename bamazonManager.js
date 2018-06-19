var inquirer  = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1968400Sb!',
  database : 'bamazon_db'
});
// var query  = connection.query("SELECT * FROM products", function(err, rows) {
//     console.log(rows);
// })
var userID;

function startApp() {
    // var query  = connection.query("SELECT * FROM products", function(err, rows) {
    //     console.log(rows);
    // })
  inquirer.prompt(
    [{
      type: "list",
      name: "startMenu",
      message: "What would you like to do?",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }])
    .then(function(menuAnswer){
      switch(menuAnswer.startMenu){
        case "View Products for Sale":
        connection.query("SELECT * FROM products", function(err, rows) {
        console.log(rows);
})
        break;

        case "View Low Inventory":
        viewLowInventory();
        break;

    //     case "Add to Inventory":
    //     // console.log();
    //     connection.end();
    //     break;

    //     case "Add New Product":
    //     // console.log();
    //     connection.end();
    //     break;
      }
     

    })
}

function viewLowInventory(){
    connection.query("SELECT * FROM products", function(err, rows) {
        // connection.query("SELECT * FROM products", function(err, rows) {
            for (var i = 0; i < rows.length; i++) {
              console.log(rows[i].stock_quantity);
            }
          });
        }
// }
// function askName(){
//   inquirer.prompt([
//     {
//       type: "input",
//       name: "askName",
//       message: "What is your name?"
//     },
//     {
//       type: "input",
//       name: "askPin",
//       message: "What is your PIN? (4 digit number plz)"
//     }
//   ])
//   .then(function(nameAnswer){
//     connection.query("SELECT * FROM players WHERE player_name = ? AND player_PIN = ?", [nameAnswer.askName, nameAnswer.askPin], function(error, results, fields) {
//       if (error) throw error;
//       if (results.length === 0) {
//         connection.query("INSERT INTO players SET ?", {
//           "player_name" : nameAnswer.askName,
//           "player_PIN" : nameAnswer.askPin
//         }, function(error, results, fields){
//           if (error) throw error;
//           console.log("Welcome, new user " + nameAnswer.askName)
//           userID = results.insertId;
//           playGame(userID);
//         })
//       }
//       else {
//         console.log("Welcome back, " + results[0].player_name)
//         userID = results[0].id;
//         playGame(userID);
//       }
//     })
//   })
// }

// function playGame(blah){
//   var time = 3;
//   var interval = setInterval(function(){
//     if (time === 0) {
//       clearInterval(interval);
//       console.log("Game Start!");
//       var start = Date.now();
//       inquirer.prompt([{
//         type: "input",
//         name: "game",
//         message: "Type the alphabet in order!",
//         validate: function(input){
//           return input === "abcdefghijklmnopqrstuvwxyz"
//         }
//       }])
//       .then(function(gameResult){
//         if(gameResult.game === "abcdefghijklmnopqrstuvwxyz"){
//           var end = Date.now();
//           var totalTime = (end-start)/1000;
//           console.log("Good job! It took you " + totalTime + " seconds.")
//           connection.query("INSERT INTO times SET ?", {
//             "player_id" : blah,
//             "player_time" : totalTime
//           }, function(error, results, fields){
//             if (error) throw error;
//             console.log("Time saved!")
//             startApp();
//           })
//         }
//       })



//     }
//     else {
//       console.log(time);
//       time--;
//     }
//   },1000)
// }

// function getTopTimes(){
//   connection.query("SELECT player_time, player_name FROM times LEFT JOIN players ON times.player_id = players.id ORDER BY times.player_time", function(error, results, fields){
//     console.clear();
//     console.log("************* TOP SCORES *************");
//     for (var i = 0; i < results.length; i++) {
//       console.log(results[i].player_name, results[i].player_time);
//     }
//     console.log("**************************************");
//     startApp();
//   })
// }


connection.connect();

startApp();