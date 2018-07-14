# bamazon

## bamazonCustomer

This app allows you to buy from the bamazon database. I have a function `displayProduct` which lists all products, their name, id, quantity, and price.. I have a function `askUser` which uses the module `inquirer` to ask in the termial a series of questions. What is the id of the product you'd like to buy.
How many units would you like to buy.

Once the questions have been asked the function hits the bamazon database for the quantity of the item in stock and if the quantity the customer choose is greater than the quantity in stock, the purchase doesn't go through. If there is enough, then the purchase is successful and that amount is removed from the database.

I also have a function called `want2Continue` which asks the customer if they would like to make another purchase. If yes it runs the `askUser` function again. If not, it closes it's connection to the database.


## bamazonManager

In this app allows a manager to get a list of the products, see what products are low in stock, restock products and add products. I have a function in this app called `askUser` which asks the manager what they would like to do and run the appropriate function.

`inventory` gets the information on all the products from the database and displays it.

`lowInventory ` goes to the database and retreives all products with stock under 5.

`addInventory ` asks the manager the id of the item they wish to restock and the amount of units to be added.

`addProduct` asks the manager the name of the item they would like to add, the price, the department, the quantity. That info is then added to the database, and given an id.

I also have a function called `want2Continue` which asks the manager if they would like to continue using the app. If yes it runs the `askUser` function again. If not, it closes it's connection to the database.