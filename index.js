const express = require('express');
const app = express();
const cors = require('cors');

// Allow CORS so that your frontend can communicate with your backend
app.use(cors());
app.set('view engine', 'ejs');

// Set up database connection using Knex
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'ddd-db.cjousaysgd5c.us-east-2.rds.amazonaws.com', // Your AWS RDS endpoint
    user: 'admin',
    password: 'password',
    database: 'donut',
    port: 3306,
  },
});

// Define a route to get donuts from the database
app.get('/', (req, res) => {
  knex.select('donut', 'url')
    .from('donuts') // Query the 'donut' table to get the name and image URL
    .then(result => {
      res.render('index', { donuts: result }); // Render index.ejs and pass the data
    })
    .catch(error => {
      console.error("Error fetching data from database:", error);
      res.status(500).json({ error: "Error fetching data from database" });
    });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
