const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 8;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var connection = mongoose.connect(`mongodb+srv://paulodallastra:88125707@cluster0-jyx8b.mongodb.net/<CS246-Income>`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    phone: String,
    password: String
});

const incomeSchema = {
    title: String,
    amount: Number,
    date: String,
    userId: String
};

const User = new mongoose.model('User', userSchema);
const Income = new mongoose.model('Income', incomeSchema);

app.post('/login', (req, res) => { 
    const {username, password} = req.body;
    User.findOne({username: username}, (err, user) => {
        if(err) {
            res.json({message: 'Error to find the user'});
        } else {
            bcrypt.compare(password, user.password, function(err, result) {
               if(err) {
                   res.json({message: 'Error occurred'})
               } 
               if(result == true){
                   res.json({message: 'Login Sucessfully!', user})
               } else {
                res.json({message: 'Username/Password is incorrect'})
               }
            });
        }
    })
});

app.post('/register', (req, res) => {
    const {firstName, lastName, username, phone, password } = req.body;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const newUser = new User({
            firstName,
            lastName,
            username,
            phone,
            password: hash
        });
        newUser.save((err) => {
            if(err){
                res.json({message: "Error while creating new user"});
            } else {
                res.json({message: "New user created sucessfully"});
            }
        })
    });
});

app.get('/income/:id', (req, res) => {
    const userId = body.params.id
    Income.find({userId: userId}, (err, income) => {
        if(err){
            res.json({message: err})
        } else {
            res.json(income)
        }
    })
});

app.post('/income', (req, res) => {
    const {title, amount, date, userId} = req.body;
    console.log(req.body)

    const newIncome = new Income({
        userId: userId,
        title: title,
        amount: amount,
        date: date
    });
    newIncome.save((err) => {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'item created sucessfully'});
        }
    })
});

app.delete('/income/:id', (req, res) => {
    const item = req.params.id
    Income.deleteOne({_id: item}, (err) => {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'item deleted sucessfully'});
        }
    })
});

app.patch('/income/:id', (req, res) => {
    const item = req.params.id
    const {title, amount, date} = req.body;

    Income.updateOne({_id: item}, {
        title,
        amount,
        date
    }, (err) => {
        if (err) {
            res.json({message: err});
        } else {
            res.json({message: 'item updated sucessfully'})
        }
    })
});

app.listen(3000);