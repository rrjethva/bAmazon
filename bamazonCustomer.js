var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Rockets1!",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('connected as id' + connection.threadId);
});

var displayProducts = function () {
  var query = "Select * FROM products";
  connection.query(query, function (err, res) {
    var displayTable = new Table({
      head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
      colWidths: [10, 25, 25, 10, 15]
    });
    for (var i = 0; i < res.length; i++) {
      displayTable.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );
    }
    console.log(displayTable.toString());
    purchasePrompt();
  });
}

function purchasePrompt() {
  inquirer.prompt([
    {
      name: "ID",
      type: "input",
      message: "Please enter the Item ID you'd like to purchase.",
      filter: Number
    },
    {
      name: "Quantity",
      type: "input",
      message: "How many items do you wish to purchase?",
      filter: Number
    },
  ]).then(function (answers) {
    var quantityNeeded = answers.Quantity;
    var IDrequested = answers.ID;
    console.log(quantityNeeded);
    console.log(IDrequested);
    purchaseOrder(IDrequested, quantityNeeded);
  });
};

function purchaseOrder(ID, amtNeeded) {
  connection.query('SELECT * FROM products WHERE item_id = ' + ID, function (err, res) {
    if (err) { console.log(err) };
    console.log('hey');
    if (amtNeeded <= res[0].stock_quantity) {
      var totalCost = res[0].price * amtNeeded;
      console.log(totalCost);
      console.log("Wonderful! Your order is in stock!");
      console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost);

      connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
    } else {
      console.log("Insufficient quantity" + res[0].product_name + "to complete your order.");
    };
    displayProducts();
  });
};

displayProducts(); 