const express = require("express");
const router = express();
const bodyPharser = require("body-parser");

router.use(bodyPharser.json());

const mongoose = require("mongoose");

require("./Payment")
const Payment = mongoose.model("Payment")

mongoose.connect("mongodb+srv://sliit:sliit@aftest.xubi7.mongodb.net/payment?retryWrites=true&w=majority", () =>{
    console.log("Database is connected");
});


router.post('/addpayment', (req,res)=>{
    const order_id = req.body.order_id;
    const user_id = req.userId;
    const user_email = req.body.user_email;
    const user_name = req.body.user_name;
    const payment_type = req.body.payment_type;
    const payment_date = req.body.payment_date;
    const total = req.body.total;
  
    var newPayment = new Payment({
        order_id,
        user_id,
        user_email,
        user_name,
        payment_type,
        payment_date,
        total
       
    });
  
    newPayment
      .save()
      .then(() => {
        res.json("Payment added successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  
});

router.get("/paidlist", (req, res) => {
    Payment.find()
      .then((Payment) => {
        res.json(Payment);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/get/:id", (req, res) => {
    let paymentid = req.params.id; 
    Payment.findById(paymentid)
      .then((Payment) => {
        res.json(Payment);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/userpayments",(req, res) => {
    let user_id = req.userId;
    Payment.find({ user_id })
      .then((Payment) => {
        res.json(Payment);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.put("/updatepayment/:id", (req, res) => {
    let id = req.params.id;
    const { 
        user_id,
        user_email,
        user_name,
        payment_type,
        payment_date,
        total
     } = req.body;
  
    const paymentyUpdate = {
        user_id,
        user_email,
        user_name,
        payment_type,
        payment_date,
        total
      
    };
  
    Payment.findByIdAndUpdate(id, paymentyUpdate)
      .then(() => {
        res.status(200).send({ status: "Payment is updated succrssfully!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot Update!" });
        console.log(err.message);
      });
  });


  router.delete("/deletepayment/:id",(req, res) => {
    let id = req.params.id;
  
    Delivery.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({ status: "Payment Deleted!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot Delete!" });
        console.log(err.message);
      });
  } );


router.listen(4555, ()=>{
    console.log("Payment service is running");
})