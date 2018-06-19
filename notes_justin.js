 // access table to grab quantity data of user requested for item.
               connection.query(
                "SELECT * FROM products WHERE product_name=?",[choice.userChoice],function(err,res){
                   if(err){console.log(err)}
             
                 // run a object for-loop to grab stock_quantity value, check it for user
                for(var l in res){var actualQuantity=res[l].stock_quantity}
                console.log("The quantity is " + stuff);