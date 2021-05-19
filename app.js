let { response } = require("express");
let express = require("express");
let app = express();

let handlebars = require('express-handlebars');

let db = require("./config/db");

app.get("/respose", (req, res) => res.send("respon Node Js berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() =>
    console.log("Berhasil terkoneksi dengan database")
);

app.set('view engine', 'handlebars');

app.engine('handlebars', handlebars({
    layoutsDir: `${__dirname}/views/layouts`
}));

app.use(express.static('public'));

let User = require("./models/User");

app.get("/", (req, res) => {
    res.render('home', { layout: 'index' });
});

app.get("/login", (req, res) => {
    res.render('login', { layout: 'index' });
});

app.get("/register", (req, res) => {
    res.render('register', { layout: 'index' });
});

app.get("/question1", (req, res) => {
    res.render('question1', { layout: 'index' });
});

app.post("/api/login", async(req, res) => {

    let { email, password } = req.body;

    // let message = '';
    // let sess = req.session;

    // if (req.method == "POST") {
    //     let post = req.body;

    //     let sql = "SELECT * FROM `user` WHERE `email`='" + email + "' and password = '" + password + "'";
    //     db.query(sql, function(err, results) {
    //         console.log(results)
    //         if (results.length) {
    //             // req.session.userId = results[0].id;
    //             // req.session.user = results[0];
    //             console.log(results[0].id);
    //             // res.redirect('/question1');
    //             res.send('Berhasil Login');
    //         } else {
    //             res.send('Login Gagal');
    //             // message = 'Wrong Credentials.';
    //             // res.render('index.ejs', { message: message });
    //         }

    //     });
    // } else {
    //     res.render('index.ejs', { message: message });
    // }

    if (req.method == "POST") {
        if (email && password) {
            db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.email = email;
                    res.send('Berhasil Login');
                    // res.redirect('/home');
                } else {
                    res.send('Incorrect Email and/or Password!');
                }
                res.end();
            });
        } else {
            res.send('Please enter Email and Password!');
            res.end();
        }
    }

    // try {
    //     let { email, email, notelp, password } = req.body;

    //     res.json(newUser);
    // } catch (error) {
    //     console.error(error.message);
    //     res.status(500).send("Server Error");
    // }
});

app.post("/api/register", async(req, res) => {
    try {
        let { username, email, notelp, password } = req.body;

        // untuk save data ke database
        let newUser = new User({
            username,
            email,
            notelp,
            password
        })

        await newUser.save();

        res.json(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.get("/api/question1", async(req, res) => {
    try {
        let { value } = req.body;

        let arr = [];
        for (let i = 0; i < value; i++) {
            if (i == 0) {
                arr[i] = 1;
            } else {
                let sebelumnya = arr[i - 1];
                if (sebelumnya < 0) {
                    sebelumnya = sebelumnya * -1;
                }
                arr[i] = sebelumnya + 3;
            }
            if ((i % 2) == 1) {
                arr[i] = arr[i] * -1;
            }
        }
        res.send("Berhasil");
        console.log(arr);
        console.log("----------------Enter----------------");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
app.get("/api/question2", async(req, res) => {
    try {
        let { value } = req.body;

        let count = 0;
        let num = 2;
        while (count < value) {
            let div_count = 0;
            for ($i = 0; $i <= num; $i++) {
                if ((num % $i) == 0) {
                    div_count++;
                }
            }
            if (div_count < 3) {
                console.log(num);
                count = count + 1;
            }
            num = num + 1;
        }

        res.send("Berhasil");
        console.log("----------------Enter----------------");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.listen(8080, () => console.log("port berjalan di 8080"));