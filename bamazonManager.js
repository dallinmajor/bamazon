var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3310,
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw (err);
    askUser();
});

function askUser() {
    inquirer.prompt([{
        message: "What would you like to do?",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Restock", "Add New Product"],
        name: "action"
    }]).then(answers => {
        var result = answers.action

        switch (result) {
            case "View Products for Sale":
                inventory();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Restock":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            default:
                console.log("didn't work");
        }
    });
}

function inventory() {
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
        want2Continue();
    })

    
};

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5;";

    console.log(`Items with quantities lower than 5
---------------------------`)

    connection.query(query, function (err, res) {

        res.forEach(function (item) {
            console.log(`Name: ${item.product_name}
Quantity: ${item.stock_quantity}
id: ${item.item_id}
-------------------------------`);
        })
  
        want2Continue();
    })
    
}

function addInventory() {
    inquirer.prompt([{
        message: "Product Id?",
        type: "input",
        name: "id",
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
        message: "How much do you want to add?",
        type: "input",
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
        var id = answers.id;
        var quantity = answers.quantity;

        var query = `UPDATE products SET stock_quantity = stock_quantity + ${quantity} 	WHERE item_id = ${id};`;

        connection.query(query, function (err, res) {
            if (err) throw (err);

            console.log(`You added ${quantity} units to Id ${id}`);
            want2Continue();
        })
    })
}

function addProduct() {
    inquirer.prompt([{
        name: "name",
        message: "What is the name of the Item you'd like to add?",
        type: "input"
    }, {
        message: "Which Department?",
        type: "list",
        choices: ["home", "electronics", "auto", "clothing", "tools", "military", "other"],
        name: "department"
    }, {
        message: "Price?",
        type: "input",
        name: "price",
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
        message: "Quantity to be added",
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
        var newProduct = {
            product_name: answers.name,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.quantity
        }

        connection.query("INSERT INTO products SET ?", newProduct, function (err, res) {

            if (err) throw (err);
            console.log(`${answers.name} has been successfully added!`)
            want2Continue();
        })
    })
};

function want2Continue() {
    inquirer.prompt([{
        name: "ask",
        type: "list",
        message: "Continue?",
        choices: ["Yes","No"]
    }]).then(answers => {
        var result = answers.ask;

        switch(result) {
            case "Yes":
                askUser();
            break;
            case "No":
                connection.end();
        }
    })
}