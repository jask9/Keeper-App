require ("dotenv").config();

const express = require ("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established successfully!");
})

const notesRouter = require("./routes/notes");
app.use("/notes", notesRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});