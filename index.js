require('dotenv').config();
const express = require('express'),
  app = express(),
  path=require('path'),
  mongoDb = require('./config/db.js');

  

//database
mongoDb();


// app.use(cors());

// Init Middleware
app.use(express.json({ extended: false })); //bodyparser (accept datatype of json)

app.use(express.urlencoded({ extended: true })); //bodyparser (accept data from form)

//define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));




app.use(function(err, req, res, next) {
  //error handler
  console.log(err);
  if (err.kind === 'ObjectId') {
    return res
      .status(404)
      .json({ errors: [{ msg: 'Id Not found in the database!!' }] });
  }
  return res.status(500).json({ errors: [{ msg: 'Server Error !!' }] });
});


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
