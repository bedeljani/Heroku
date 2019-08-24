const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const dorm = require("./routes/api/dorm")
const app = express();
var path = require('path');
// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(path.join(__dirname, 'public')));


// DB Config
const dbCon = require("./config/keys")

// Connect to MongoDB
mongoose
  .connect(
    dbCon.url,
    { useCreateIndex: true,
      useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/dorm", dorm );


// Send message for default URL
app.get('/', (req, res) => res.send('Success Bgst !'));


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
