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
    var chosenItem;
    
    connection.query("SELECT * FROM products", function(err, rows) {
        console.log(rows);

        //** NOTE: Here you are pulling data from database but it is never used.  You want to use the data stored in "rows" to populate the choices in your inquirer.  Your inquirer needs to be inside of this code block.*/
    
    })
    

    //**NOTE: Put this code inside the above code so you can use "rows" to populate your choices. */
    inquirer
    .prompt([
        {
            name: "item",
            type: "input",

            //**NOTE:  "choices" should be an array.  The code below is what is creating the array from rows.  */

            // choices: function() {
            //     var choiceArray = [];
            //     for (var i = 0; i < rows.length; i++) {
            //       choiceArray.push(rows[i].id);
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
        
    ])      
    .then(function(answer) {
        //** NOTE: answer = is an object from what the user selects from the inquirer above.  This currently doesn't work because choices above is not set up yet. */

        // get the information of the chosen item
        var chosenItem;

        //** NOTE: This queries the database for all the items again which is stored in "results".   */
        connection.query("SELECT * FROM products", function(err, results) {
            console.log(results);

            //** NOTE: this is looping through results looking for a match to answer.choice (you don't have a answer.choice right now because choice is not set up in your inquirer above.) */
            for (var i = 0; i < results.length; i++) {
                if (results[i].id === answer.choice) {
                    //** NOTE:  Once it finds a match, it stores all the information of that item to "chosenItem" */
                    chosenItem = results[i];
                }
            }
        })
        
        //** NOTE: code below is checking the matched item "chosenItem" that we stored from above to "answer.order" (you don't have an "answer.order" yours would be "answer.category") */
        
        // determine if bid was high enough
        if (chosenItem.stock_quantity < parseInt(answer.order)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(

                //** NOTE: this is where it will update the database.  (You will need to update this because you "answer.order") */
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