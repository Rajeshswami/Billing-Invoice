const router = require("express").Router();
const Post = require("../Model/Product");
/*========================GET ROUTE HERE======================*/

router.get("/all-product", async (req, res) => {
    try {
        let product = await Post.find({}).sort({ date: "-1" })
        res.status(201).json({ product })
    } catch (err) {
        console.error(err)
        res.send(500).json("Server Error");
    }
})
/*========================POST ROUTE HERE======================*/

router.post("/add-product", async (req, res) => {
    let { invoice_date, product_name, product_price, product_quantity } = req.body;
    console.log(invoice_date, product_name, product_price, product_quantity)
    try {
        let newProduct = await new Post({
            invoice_date,
            product_name,
            product_price,
            product_quantity,
        })
        await newProduct.save();
        return res.status(201).json({ newProduct, msg: "successfully product created" })
    } catch (err) {
        console.error(err)
        res.status(500).json("SERVER ERROR");
    }
})
/*========================PUT ROUTE HERE======================*/
router.put("/edit-product/:id", async (req, res) => {
    try {
        let updateProduct = await Post.findByIdAndUpdate(
            req.params.id, {
            invoice_date: req.body.invoice_date,
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_quantity: req.product_quantity,
        }, { new: true }
        )
        await (await updateProduct).save();
        return res.status(201).json(updateProduct)

    } catch (err) {
        console.log(err);
        res.status(500).json("SERVER ERROR");
    }
})

/*========================DELETE ROUTE HERE======================*/
router.delete("/delete-product/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete({ _id: req.params.id })
        return res.status(201).json({ msg: "successfully product deleted" })
    } catch (err) {
        console.error(err)
    }
})

module.exports = router