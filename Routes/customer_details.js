const router = require("express").Router();
const Post = require("../Model/Customer");
/*========================GET ROUTE HERE======================*/

router.get("/all-customer", async (req, res) => {
    try {
        let customer = await Post.find({}).sort({ date: "-1" })
        res.status(201).json({ customer })
    } catch (err) {
        console.error(err)
        res.send(500).json("Server Error");
    }
})
/*========================POST ROUTE HERE======================*/

router.post("/add-customer", async (req, res) => {
    let { customer_name, phone_number,email } = req.body;
    console.log(customer_name, phone_number)
    try {
        let newCustomer = await new Post({
            customer_name,
            phone_number,
            email,

        })
        await newCustomer.save();
        return res.status(201).json({ newCustomer, msg: "successfully post created" })
    } catch (err) {
        console.error(err)
        res.status(500).json("SERVER ERROR");
    }
})
/*========================PUT ROUTE HERE======================*/
router.put("/edit-customer/:id", async (req, res) => {
    try {
        let updateCustomer = await Post.findByIdAndUpdate(
            req.params.id, {
            customer_name: req.body.customer_name,
            phone_number: req.body.phone_number,
            email:req.body.email,
        }, { new: true }
        )
        await (await updateCustomer).save();
        return res.status(201).json(updateCustomer)

    } catch (err) {
        console.log(err);
        res.status(500).json("SERVER ERROR");
    }
})

/*========================DELETE ROUTE HERE======================*/
router.delete("/delete-customer/:id",async(req,res)=>{
    try {
        await Post.findByIdAndDelete({_id:req.params.id})
        return res.status(201).json({msg:"successfully customer deleted"})
    } catch (err) {
        console.error(err)
    }
})

module.exports = router