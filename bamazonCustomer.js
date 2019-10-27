const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  menuNav();
});

let cart = [];

function menuNav() {
  console.log("Welcome to Bamazon!");
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Buy", "View Cart", "Checkout", "Quit"]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Buy":
          showProducts();
          addToCart();
          break;

        case "View Cart":
          viewCart();
          break;

        case "Checkout":
          checkOut();
          break;

        case "Quit":
          process.exit();
      }
    });
}

function showProducts() {
  let query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function addToCart() {
  let query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choices = [];
            for (var i = 0; i < res.length; i++) {
              choices.push(res[i].product_name);
            }
            return choices;
          },
          message: "What item would you like purchase?"
        },
        {
          type: "input",
          message: "How many would you like?",
          name: "quantityPurchased"
        }
      ])
      .then(function (answer) {
        let selection;
        for (var i = 0; i < res.length; i++) {
          if (res[i].product_name === answer.choice) {
            selection = res[i];
          }
        }

        if (selection.stock_quantity >= answer.quantityPurchased) {
          connection.query(
            "UPDATE products SET stock_quantity = stock_quantity -" + answer.quantityPurchased + " WHERE item_id='" +
            selection.item_id +
            "'",
            function (error) {
              if (error) console.log(error);

              console.log(`${selection.product_name} added to cart!
              `);
              cart.push({
                product: selection.product_name,
                price: selection.price,
                quantity: answer.quantityPurchased
              });
              menuNav();
            }
          );
        } else {
          console.log(`Insufficient Quantity!
          `);
          menuNav();
        }
      });
  });
}

function viewCart() {
  console.table(cart);
  let totalPrice = cart.reduce(function (previous, current) {
    return (previous + (current.price * current.quantity));
  }, 0);
  console.log(`Total: $${totalPrice}
  `);
  menuNav();
}

function checkOut() {
  let totalPrice = cart.reduce(function (prev, cur) {
    return prev + cur.price;
  }, 0);
  console.log(`Total: $${totalPrice}
  `);
  inquirer
    .prompt({
      name: "confirm",
      type: "confirm",
      default: true,
      message: "Would you like to complete your order?"
    })
    .then(function (answer) {
      if (answer.confirm) {
        cart = [];
        console.log(`Thank you! Come again!
        `);
        menuNav();
      } else {
        menuNav();
      }
    });
}