var mysql = require("mysql");
var inquirer = require("inquirer");
var id = "";
var qty = 0;

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "oaqY50ltg",
	database: "bamazonDB"
})

connection.connect(function(err) {
	if(err) throw err;
	console.log("Connected as id " + connection.threadID);
	
	chooseItem();
});

function chooseItem() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(results);
	inquirer.prompt([
	{
		name: "id",
        type: "input",
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What is the ID of the item you'd like to buy?"
    },
	{
		name: "inputQty",
		type:"input",
		message: "How many units of the item would you like to buy?"
		
	}
	]).then(function(answer) {
		
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
        	//console.log("results.length: ", results.length);
        	if (results[i].item_id === parseInt(answer.id)) {
          		//console.log("results.item_id: ",results[i].item_id);
            	chosenItem = results[i];
            	//console.log("chosenItem: ",chosenItem);
          	}
        }

        // determine if qty in stock
        if (chosenItem.stock_quantity > answer.inputQty) {
        	
          var newQty = chosenItem.stock_quantity - answer.inputQty;
          
         	connection.query("UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQty
              },
              {
                item_id: parseInt(answer.id)
              }
            ],
            function(error) {
              if (error) throw err;
              
            }
          );
         	var totalAmt = chosenItem.price * answer.inputQty;
         	console.log("Your total amount is: $" + totalAmt);
        }
        else {
            console.log("We're sorry, but your item is out of stock.");
        }
      
     	connection.end();
      });

/*function deleteProduct() {
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      item_id: inputID,
    },
    function(err, res) {
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );*/
});
}