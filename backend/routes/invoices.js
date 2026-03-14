const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const authMiddleware = require("../middleware/authMiddleware");


// 🔹 CREATE Invoice
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newInvoice = new Invoice({
      invoiceNumber: req.body.invoiceNumber,
      clientName: req.body.clientName,
      date: req.body.date,
      amount: req.body.amount,
      status: req.body.status,
      userId: req.user.id, // 👈 attach logged-in user
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 READ All Invoices (Only Logged-in User)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id });
    res.status(200).json(invoices);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 UPDATE Invoice (Only If Belongs to User)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        invoiceNumber: req.body.invoiceNumber,
        clientName: req.body.clientName,
        date: req.body.date,
        amount: req.body.amount,
        status: req.body.status,
      },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({
        message: "Invoice not found or unauthorized",
      });
    }

    res.status(200).json(updatedInvoice);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 DELETE Invoice (Only If Belongs to User)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deletedInvoice) {
      return res.status(404).json({
        message: "Invoice not found or unauthorized",
      });
    }

    res.status(200).json({ message: "Invoice deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;