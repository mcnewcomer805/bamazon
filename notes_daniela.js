
                        ]).then(function (choicePets) {
                            var query = connection.query("SELECT * FROM products", function (err, results) {
                                if (err) throw err;

                                // console.log(err + " is the error")

                            // console.log(choicePets.secondQuestion)

                            var itemId = choicePets.secondQuestion;

                            // console.log(itemId)

                            var itemQty = choicePets.secondQuestionPart2;

                            // console.log(itemQty)



                        
                                var chosenItem;
                                for (var i = 0; i < results.length; i++) {
                                    // console.log(results[i].item_id)
                                    // console.log(itemId)
                                    if (results[i].item_id === parseInt(itemId)) {
                                        chosenItem = results[i];
                                  
                                        
                                    }
                                }
                                    console.log(chosenItem)


                            })


