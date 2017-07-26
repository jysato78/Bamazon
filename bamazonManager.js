var mysql = require("mysql");
var inquirer = require("inquirer");
var id = "";
var qty = 0;
var chosenItem;
var newQty;
var stockDB = 0;
var prodName;
var prodDept;
var prodPrice;
var prodQty;
var inputQty = 0;
var inputID;

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
	
	
});


	inquirer.prompt([
	{
		
  		type: "list",
  		message: "What would you like to do?",
  		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
  		name: "mgrTasks"
  	}
  	
	]).then(function(answer) {

		if(answer.mgrTasks === "View Products for Sale") {
			viewProducts();
		}
		else if(answer.mgrTasks === "View Low Inventory") {
			viewLow();
		}
		else if(answer.mgrTasks === "Add to Inventory") {
			addInventory();
		}
		else  {
			addProducts();
		}
	});	

function viewProducts() {
	//console.log("inside viewProducts");
	connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    console.log(results);
    });
    connection.end();
}

function viewLow() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 100", function(err, results) {
    if (err) throw err;
    console.log(results);
    
    });
    connection.end();
}

function addInventory() {
	
	connection.query("SELECT * FROM products WHERE stock_quantity < 100", function(err, results) {
    if (err) throw err;
    console.log(results);
    
   // console.log("DB quantity: ", results.stock_quantity);
    inquirer.prompt([
	{
		name: "id",
        type: "input",
        message: "What is the ID of the item whose quantity you'd like to update?"
    },
	{
		name: "inputQty",
		type:"input",
		message: "How many units would you like to add to the stock?"
		
	}
	]).then(function(answer) {
		var prodArr = [];
    	for(var i = 0; i < results.length; i++) {
    		prodArr.push(results[i].item_id, results[i].stock_quantity);
    		//console.log("prodArr: ",prodArr);	
    	
    		//console.log("results id: ",results[i].item_id)
    		//console.log("input id: ",answer.id)
			if(results[i].item_id === parseInt(answer.id)) {
				//console.log("results id: ",results[i].item_id)
				//console.log("qty in stock is: ",results[i].stock_quantity);
				stockDB = results[i].stock_quantity;
				inputQty = answer.inputQty;
				inputID = results[i].item_id
			}
		}
		updateQty();
	});
  });
}

function updateQty() {
	var totalQty = parseInt(stockDB) + parseInt(inputQty);
		 connection.query("UPDATE products SET ? WHERE ?",
    		
            [
              {
                stock_quantity: totalQty
              },
              {
                item_id: inputID
              }
            ],
            function(error) {
              if (error) throw error;
              
            }
        );

	 connection.end();
}

function addProducts() {
	inquirer.prompt([
	{
		name: "prodName",
        type: "input",
        message: "What product would you like to add?"
    },
	{
		name: "prodDept",
		type:"input",
		message: "What department should this product reside in?"
		
	},
	{
		name: "prodPrice",
        type: "input",
        message: "What is the price of this product?"
    },
	{
		name: "prodQty",
		type:"input",
		message: "What is the stock quantity?"
		
	}
	]).then(function(answer) {
		//console.log("inside then");
		prodName = answer.prodName;
		prodDept = answer.prodDept;
		prodPrice = answer.prodPrice;
		prodQty = answer.prodQty;
		insertProduct();
	});
}

function insertProduct() {
	var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?"; 
	var values = [
	 [prodName,prodDept,prodPrice,prodQty]
	] 
	connection.query(sql, [values], function (err, result) {
    	if (err) throw err;
    console.log("1 record inserted");
  });
	connection.end();
} 
 
