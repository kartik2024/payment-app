const express = require('express');
const authMiddleware = require('../middleware');
const { Account } = require('../db');
const router = express.Router();
const mongoose = require('mongoose');

router.use(authMiddleware);

router.get('/balance', async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.status(200).json({
        balance: account.balance
    })
})


router.post('/transfer', async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    console.log(req.body);

    const { amount, to } = req.body;


    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if(!account || account.balance < amount ){
        session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);

    if(!toAccount){
        session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        });
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfer successfull"
    })

    await session.endSession();
})


module.exports = router;

