const mongoose = require('mongoose');

async function run() {
    await mongoose.connect('mongodb+srv://kartikkartiksharmasharma12:Kartik01082006@cluster0.aabw3.mongodb.net/paytm');

}

run();

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
})

const BankInfoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})



const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', BankInfoSchema);

module.exports = {
    User,
    Account
}

