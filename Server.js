const express = require("express");
const { connect } = require("mongoose");
const { PORT, MONGODB_URL } = require("./Config");
const bodyParser = require("body-parser");
const cors = require("cors");



/*=======================initialize app================*/
const app = express();

/*=======================middleware block====================*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*======================load Routes=====================*/
app.use("/api/customer_details", require("./Routes/customer_details"));
app.use("/api/product", require("./Routes/Product_details"));
app.use("/api/auth", require("./Routes/auth"));
/*========================Database Connection========================*/
let startApp = async () => {
    try {
        await connect(MONGODB_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        }, (err) => {
            if (err) throw err;
            console.log("Database Connected");
        })
        // LLISTEN PORT
        app.listen(PORT, (err) => {
            if (err) throw err;
            console.log("SERVER LISTENING ON PORT" + PORT);
        })

    } catch (err) {
        console.log(err);
    }
}
startApp();

