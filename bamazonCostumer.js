var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3310,
    password: 'root',
    database: 'bamazon'
});

function displayProduct() {
    var query = "SELECT * FROM products;";

    connection.query(query, function (err, res) {
        console.log(`
        Items for Sale
        `)

        res.forEach(function (item) {
            console.log(`--------------------------
Product: ${item.product_name}
Department: ${item.department_name}
Price: ${item.price}
Quantity:  ${item.stock_quantity}
Product Id:  ${item.item_id}`)
        })
        askUser();
    })
};

function askUser() {
    inquirer.prompt([{
        type: "input",
        message: "What is the Product Id of the item you woul like to buy?",
        name: "item",
        validate: function (input) {
            var isNum = parseFloat(input);

            if (typeof isNum == 'number') {
                return true;
            } else {
                return false;
                console.log("A number is required");
            };
        }
    }, {
        type: "input",
        message: "How many units of the product would you like to buy?",
        name: "quantity",
        validate: function (input) {
            var isNum = parseFloat(input);

            if (typeof isNum == 'number') {
                return true;
            } else {
                return false;
                console.log("A number is required");
            };
        }
    }]).then(answers => {
        var id = answers.item;
        var query = `SELECT stock_quantity FROM products WHERE item_id = ${id}`;
        var quantity = parseFloat(answers.quantity);

        connection.query(query, function (err, res) {

            var result = parseFloat(res[0].stock_quantity)

            if (result < quantity) {
                console.log("insufficent quantity!")
            } else {
                updateInventory(quantity, id);
            }
        })
    })
}

function want2Continue() {
    inquirer.prompt([{
        name: "ask",
        type: "list",
        message: "Would you like to make another purchase?",
        choices: ["Yes", "No"]
    }]).then(answers => {
        var result = answers.ask;

        switch (result) {
            case "Yes":
                askUser();
                break;
            case "No":
                connection.end();
        }
    })
};

function updateInventory(quan, id) {
    var secondQuery = `UPDATE products SET stock_quantity = stock_quantity - ${quan} WHERE item_id = ${id};`;

    connection.query(secondQuery, function (err, res) {
        if (err) throw (err);
        console.log("Successful purchase!")
        want2Continue();
    })
}

displayProduct();


