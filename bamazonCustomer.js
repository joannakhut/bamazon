var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mySQL with id: " + connection.threadId);
});

// NPM Packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//GLOBAL VARIABLES
var product;
var department;
var price;
var stock;

// CRUD Functions

function create(product_name, department_name, price, stock_quantity) {
  connection.query(
    `
      INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?, ?)
      `,
    [product_name, department_name, price, stock_quantity],
    function(err, res) {
      if (err) throw err;
      console.log(`New Product: ${product_name} created!`);
    }
  );
}

function read(item_id) {
  if (item_id) {
    connection.query(
      "SELECT * FROM products where item_id = ?",
      [item_id],
      function(err, res) {
        if (err) throw err;
        console.log(res);
      }
    );
  } else {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  }
}

function update(item_id, product_name, department_name, price, stock_quantity) {
  connection.query(
    `
    UPDATE products SET
    product_name =  ?,
    department_name = ?,
    price = ?,
    stock_quantity = ?
    WHERE item_id = ?
    `,
    [product_name, department_name, price, stock_quantity, item_id],
    function(err, res) {
      console.log(res);
    }
  );
}

function destroy(id) {
  connection.query(
    "DELETE FROM products WHERE item_id = ?",
    [item_id],
    function(err, res) {
      if (err) throw err;
      console.log(res);
    }
  );
}

// Prompts
inquirer
  .prompt([
    {
      name: "choices",
      message: "Welcome to Bamazon! What would you like to do today?",
      type: "list",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ])
  .then(function(user) {
    if (user.choices === "Add New Product") {
      inquirer
        .prompt([
          {
            name: "product_name",
            type: "input",
            message: "Product"
          },
          {
            name: "department_name",
            type: "input",
            message: "Department"
          },
          {
            name: "price",
            type: "input",
            message: "Price:"
          },
          {
            name: "stock_quantity",
            type: "input",
            message: "Qty "
          }
        ])
        .then(function(res) {
          console.log(
            res.product_name,
            res.department_name,
            res.price,
            res.stock_quantity
          )
          product = res.product_name;
          department = res.department_name;
          price = res.price;
          stock = res.stock;
          create(product_name, department_name, price, stock_quantity);

        });
    }
    else if (user.choices === "View Products for Sale") {
        read();
    }
    else if (user.choices === "View Low Inventory") {
        console.log("Low Inventory");
    }
    else if (user.choices === "Add to Inventory") {
        console.log("Add to Inventory");
    }
  });

// create("Smash Bros Ultimate", "Video Games", 55.99, 10);

// read();
