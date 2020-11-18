const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
     process.env.MONGODB_URI || 'mongodb://localhost/budget-tracker',
     {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
       useFindAndModify: false
     }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!")
});

app.use(logger("dev"));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
