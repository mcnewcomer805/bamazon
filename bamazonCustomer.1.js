var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1968400Sb!",
  database: "bamazon_db"

});
 
// connection.connect();
 
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadID);
  connection.end();
});

function startApp() {
  
connection.query("SELECT * FROM products", function(err, rows) {
        console.log(rows);
    })

    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        // choices: function() {
        //     var choiceArray = [];
        //     for (var i = 0; i < results.length; i++) {
        //       choiceArray.push(results[i].id);
        //     }
        //     return choiceArray;
        //   },
        message: "What is the ID of the item you would like to buy?"
      },
      {
        name: "category",
        type: "input",
        message: "How many items with that ID would you like to buy?",


        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
            // choices: function() {
        //     var choiceArray = [];
        //     for (var i = 0; i < results.length; i++) {
        //       choiceArray.push(results[i].id);
        //     }
        //     return choiceArray;
        //   },
    
        }
        
  ])      .then(function(answer) {
    // get the information of the chosen item
  
    var query = connection.query("SELECT * FROM products", function(err, results) {

        console.log(results);
        for (var i = 0; i < results.length; i++) {
          if (results[i].item.id === parseInt(itemId)) {
            chosenItem = results[i];
          }
        }
      })


    // determine if bid was high enough
    if (chosenItem.stock_quantity < parseInt(answer.order)) {
      // bid was high enough, so update db, let the user know, and start over
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: answer.order
          },
          {
            id: chosenItem.id
          }
        ],
        function(error) {
          if (error) throw err;
          console.log("Order placed successfully!");
          start();
        }
      );
    }
    else {
      // bid wasn't high enough, so apologize and start over
      console.log("Our stock is too low. Try again...");
      start();
    }
  });



}
 
startApp()