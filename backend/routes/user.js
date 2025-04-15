const express = require('express')
const userRouter = express.Router();
const zod = require('zod');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const JWT_SECRET  = require('../config');
const authMiddleware  = require('../middleware');

userRouter.use(bodyParser.json());


const userSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
});

const signInUser = zod.object({
    username: zod
            .string()
            .min(5, {message: "Username must be atleast 5 characters long"})
            .max(50, {message: "Username cannot exceed 50 characters"})
            .trim()
            .toLowerCase()
            .min(1, {message: "Username is required"}),
    password: zod
            .string()
            .min(6, {message: "Password must be atleast 6 characters long"})
            .min(1, {message: "Password is required"})
})

const updateUser = zod.object({
    password: zod
            .string()
            .min(6, {message: "Password must be atleast 6 characters long"})
            .min(1, {message: "Password is required"})
            .optional(),
    firstName: zod.string()
                .max(50, { message: "First name cannot exceed 50 characters" })
                .trim()
                .min(1, {message: "First name is required"})
                .optional(),
    lastName: zod
            .string()
            .max(50, { message: "Last name cannot exceed 50 characters" })
            .trim()
            .min(1, {message: "Last name is required"})
            .optional()
})



userRouter.post('/signup', async (req, res) => {
    const userInfo = req.body;
    const parsedUserInfo = userSchema.safeParse(userInfo);

    if(!parsedUserInfo.success){
        return res.status(411).json({
            msg: "Incorrect Inputs"
        });
    }

    const username = req.body.username;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const existingUser = await User.findOne({username: username})

    if(existingUser){
        res.status(400).json({
            message: "Username already exists"
        })
    }

    const createdUser = await User.create({
        username,
        password,
        firstname,
        lastname
    })

    const userId = createdUser._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId: userId
    }, JWT_SECRET)


    res.json({
        message: "User created successfully!",
        token: token
    })


})


userRouter.post('/signin', async (req, res) => {
    const body = req.body;
    const parsedBody = signInUser.safeParse(body);

    if(!parsedBody.success){
        return res.status(411).json({
            message: "Invalid Inputs"
        });
    }

    const username = body.username;
    const password = body.password

    const user = await User.findOne({ username, password });
    if(!user){
        return res.status(400).json({
            message: "User doesn't exist"
        });
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.json({
        message: "Sign In Successfull",
        token: token
    });


})


userRouter.put('/update', authMiddleware, async(req, res) => {
    const body = req.body;
    const parsedBody = updateUser.safeParse(body);

    if(!parsedBody.success){
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

userRouter.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
            "$regex": filter
        }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = userRouter;