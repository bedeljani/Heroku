const express = require("express");
      mongoose = require("mongoose");
      bodyParser = require("body-parser");
      passport = require("passport");
      users = require("./routes/api/users");
      dorm = require("./routes/api/dorm")
      facilities = require('./routes/api/facilities')
      app = express();
      path = require('path');
      multer = require('multer')
      fs = require('fs-extra')




// Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  })
);
app.use('/api/public/', express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise

// DB Config
const dbCon = require("./config/keys")


mongoose
  .connect(
    dbCon.url,
    { useCreateIndex: true,
      useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));



// Passport middleware
//app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api", users);
app.use("/api", facilities);
app.use("/api", dorm );

// Send message for default URL
app.get('/', (req, res) => res.send('Success Bgst !'));



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
