// Import necessary modules for my project
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// create an extance of express
const app = express();

// Use the CORS middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to extract info from the html (from frontend) attribute
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middleware to extract info from the frontend that are sent through json (postman)
app.use(express.json());

//   Route to check if the Homepage server is running
app.get("/", (req, res) => res.send("The Server is Up and running!"));

//   / Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost", // MySQL server host
  user: "myDBuser", // MySQL username
  password: "myDBuser", // MySQL password
  database: "apple_products", // Database to use
  //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", // Path to the MySQL socket file
});

//   Connec to the MySQL database
connection.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  } else console.log("Connected to the mysql server!");
});


//  Route #1 : / install => to create "Table" in database
app.get("/install", (req, res) => {
  // SQL query to create "productName" table
  const Products = `CREATE TABLE if not exists Products(
  Product_id int auto_increment,
  Product_url VARCHAR(255) not null,
  Product_name VARCHAR(255) not null,
  PRIMARY KEY (Product_id)
)`;

  // SQL query to create "productDescription " table
  const productDescription = `CREATE TABLE if not exists Descriptions(
  Product_id int not null,
  Description_id int auto_increment,
  Product_brief_description TEXT NOT NULL,
  Product_description TEXT NOT NULL,
  Product_img VARCHAR(255) not null,
  Product_link VARCHAR(255) not null,
  
  PRIMARY KEY (Description_id),
  FOREIGN KEY(Product_id) REFERENCES Products(Product_id) 
)`;

  // SQL query to create " Price" table
  const productPrice = `CREATE TABLE if not exists Price(
  Product_id int(11) not null, 
  Price_id int auto_increment,
  Starting_price VARCHAR(255) not null,
  Price_range VARCHAR(255) not null,
  PRIMARY KEY (Price_id),
  FOREIGN KEY(Product_id) REFERENCES Products(Product_id)
)`;

  // SQL query to create "productUser" table
  const productUser = `CREATE TABLE if not exists Users(
  User_id int auto_increment,
  User_name VARCHAR(255) not null,
  User_password VARCHAR(255) not null,
  PRIMARY KEY (User_id )
)`;

  // SQL query to create "productOrder" table
  const productOrder = `CREATE TABLE if not exists Orders(
  Order_id int auto_increment,
  Product_id int not null,
  User_id int not null,
  PRIMARY KEY (Order_id),
  FOREIGN KEY(Product_id) REFERENCES Products(Product_id),
  FOREIGN KEY(User_id) REFERENCES Users(User_id)

)`;

  // Excuting the query to "Products" table
  connection.query(Products, (err, result, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  // Excuting the query to "productDescription" table
  connection.query(productDescription, (err, result, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  //  Excuting the query to "productPrice" table
  connection.query(productPrice, (err, result, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  // Excuting the query to "productUser" table
  connection.query(productUser, (err, result, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  // Excuting the query to "productOrder" table
  connection.query(productOrder, (err, result, fields) => {
    if (err) console.log(`Error Found: ${err}`);
  });

  res.end("Tables Created!");
  console.log("Tables Created!");
});

// Middleware to extract info from the html (from frontend) attribute
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middleware to extract info from the frontend that are sent through json (postman)
app.use(express.json());

// Route #2 :/insert-product-info => To insert product data to the table
app.post("/insert-product-info", (req, res) => {
  const {
    // Product table inputs
    Product_name,
    Product_url,

    // Descriptions table inputs
    Product_brief_description,
    Product_description,
    Product_img,
    Product_link,

    // Prices table inputs
    Starting_price,
    Price_range,

    // User table inputs
    User_name,
    User_password,
  } = req.body; // distructuring
  console.table(req.body);
  // console.log(req.body);

  const insertProducts = `INSERT INTO Products (Product_name, Product_url) VALUES(?, ?)`;
  const insertDescriptions = `INSERT INTO Descriptions (Product_id, Product_brief_description, Product_description, Product_img,Product_link) VALUES(?, ?, ?, ?, ?)`;
  const insertPrice = `INSERT INTO Price(Product_id, Starting_price, Price_range) VALUES(?, ?, ?)`;
  const insertUsers = `INSERT INTO Users(User_name, User_Password) VALUES(?, ?)`;
  const insertOrders = `INSERT INTO Orders (Product_id, User_id) VALUES(?, ?)`;

  // Insert into Product table
  connection.query(
    insertProducts,
    [Product_name, Product_url],
    (err, results, fields) => {
      if (err) console.log(`Error Found: ${err}`);
      console.table(results); // to display the result in a table format from postman or the frontend

      const id = results.insertId;
      console.log(
        "id from customers table to be used as a foreign key on the other tables:",
        id
      );

      // Insert into Decriptions table
      connection.query(
        insertDescriptions,
        [
          id,
          Product_brief_description,
          Product_description,
          Product_img,
          Product_link,
        ],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);
        }
      );

      // Insert into Price table
      connection.query(
        insertPrice,
        [id, Starting_price, Price_range],
        (err, results, fields) => {
          if (err) console.log(`Error Found: ${err}`);
        }
      );

      // Insert into User table
      connection.query(
        insertUsers,
        [id, User_name, User_password],
        (err, userResults, fields) => {
          if (err) console.log(`Error Found: ${err}`);
          // Insert into Order table
          const userId = userResults.insertId;

          connection.query(
            insertOrders,
            [id, userId],
            (err, results, fields) => {
              if (err) console.log(`Error Found: ${err}`);
            }
          );
        }
      );
    }
  );
  res.end("Data Inserted successfully!");
  console.log("Data Inserted successfully!");
});

// Route #3: /get-product-detail-info => To get retrieve data from the table
app.get("/get-product-detail-info", (req, res) => {
  const query = `
    SELECT 
      Products.Product_id,
      Products.Product_name,
      Products.Product_url,
      Descriptions.Product_brief_description,
      Descriptions.Product_description,
      Descriptions.Product_img,
      Descriptions.Product_link,
      Price.Starting_price,
      Price.Price_range,
      Users.User_name,
      Users.User_password,
      Orders.Order_id
    FROM Products
    LEFT JOIN Descriptions ON Products.Product_id = Descriptions.Product_id
    LEFT JOIN Price ON Products.Product_id = Price.Product_id
    LEFT JOIN Orders ON Products.Product_id = Orders.Product_id
    LEFT JOIN Users ON Users.User_id = Users.User_id;
  `;

  connection.query(query, (err, results, fields) => {
    if (err) {
      console.log(`Error Found: ${err}`);
    } else {
      console.log("Data Retrieved:", results);
      res.json(results);
    }
  });
});


// Route #4 : Get iphones data only products, description, price from database
app.get("/iphones", (req, res) => {
  connection.query(
    "SELECT * FROM Products JOIN Descriptions JOIN Price ON Products.Product_id = Descriptions.Product_id AND Products.Product_id = Price.Product_id",

    (err, results, fields) => {
      // console.log(results); // data in json format
      let iphones = { products: [] };
      iphones.products = results;
      let stringIphones = JSON.stringify(iphones); // to convert in to JSON
      //console.log(stringIphones);
      if (!err) {
        res.end(stringIphones);
      } else console.log(err);
    }
  );
});

// Port Number
const PORT = 2025;

// Server listen on port 2025
app.listen(PORT, () => {
  console.log(`Server is up and running on port: http://localhost:${PORT}`);
});
