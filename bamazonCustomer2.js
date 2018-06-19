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

  startApp();
});

function startApp() {
    connection.query("SELECT * FROM products", function(err, rows) {
        //console.log(rows);
        var choiceArr = [];
        for (var i =0; i < rows.length; i++) {
        choiceArr.push(rows[i].product_name);
        };
        //  console.log(choiceArr);

        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: choiceArr,
                message:"What item you would like to buy?"
            },
            {
                name: "input",
                type: "input",
                message: "enter quantity"
            }   
        ])
        .then(function(answer) {
            //console.log(answer);

            var chosenItem;
            for(var i = 0; i < rows.length; i++) {
                if (answer.choice === rows[i].product_name) {
                    chosenItem = rows[i];
                } 
                            // console.log(chosenItem);
            }
            console.log(chosenItem);
            if (answer.input < chosenItem.stock_quantity) {
                console.log("quanity is enough");
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: chosenItem.stock_quantity - parseInt(answer.input)
                        },
                        {
                            id: chosenItem.id
                        },
                       
                ],
                function(error) {
                    if (error) throw err;
                    console.log("Order placed successfully, Total cost is $" + parseInt(answer.input) * chosenItem.price);
                    // console.log("Order placed successfully");
                    // start();
                }
                // console.log(product.price);
            );
        }
            else if (answer.input > chosenItem.stock_quantity){
                console.log ("sorry, not enough inventory");
                // start();
            }

        })
    })
}


