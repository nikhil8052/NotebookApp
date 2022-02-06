var express = require("express")
let bodyParser = require('body-parser')
let fs = require("fs")
let mysql = require("mysql")
let app = express()

// TO ESTABLISH THE CONNECTION 
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notebook_app'
})

// CHECK WHEATHER THE DB IS CONNECT OR NOT 
con.connect((err) => {
    if (err)
        throw err
})

//BODY PARSER 
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// TO SignUp For a New User
app.post('/newuser', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.password;

    // FOR CHECKING IF USER ALREADY EXIST OR NOT 
    q = 'select email from login';
    con.query(q, (err, result) => {
        if (err)
            throw err;
        let i = 0;
        while (i < result.length) {
            if (email == result[i].email) {
                res.send("alreadyExist");
                return;
            }
            i++;
        }

        let note ="[]";
        // IF NOT EXISTS SO LET HIM/HER TO EXIST 
        q = `insert into login (name,email,pass,notes) values('${name}','${email}','${pass}','${note}')`;
        con.query(q, (err, result) => {
            if (err)
                throw err
            else
                console.log("added to login   ")
        })

        // DEFAULT PROFILE PICTURE OF THE USER 
        fs.readFile("../../public/images/defaultusericon.png", (err, data) => {
            if (err) {
                throw err;
            }
            else {
                fs.writeFile(`../../public/images/${email}.${name}.png`, data, (err) => {
                    if (err)
                        throw err;
                })
            }
        })


    })
})

// TO RETURN THE NAME OF EVERY IMAGE 
app.get("/allimages",(req,res)=>{
    
    fs.readdir("../../public/images",(err,files)=>{
        if(err) throw err;
        res.send(files);
    })
})

// To LOGIN The Existing User 
app.post("/login", (req, res) => {
    
    let email = req.body.userEmail;
    let password = req.body.userPassword;

    con.connect((err) => {
        if (err)
            throw err
        const q = `select * from login where email='${email}' `;
        con.query(q, (err, result) => {
            if (err)
                throw err
            let response;
            console.log(result)
            if (result.length == 1) {
                response = {
                    email: result[0].email,
                    password: result[0].pass
                }
            }
            else {
                response = {
                    email: "##",
                    password: "##"
                }
            }

            res.send(JSON.stringify(response));
            console.log(" Response has been sent ...")
        })
    })

})

// TO GET ALL THE NOTES OF A PARTICULAR USER USING EMAIL ID 
app.post("/notes", (req, res) => {
    let email = req.body.email;
    let q = `select * from login where email='${email}'`;
    con.query(q, (err, result) => {
        if (err)
            throw err;
        let response = {
            email: email,
            notes: result[0].notes,
            name: result[0].name
        }
        res.send(JSON.stringify(response));
    })
})

// To Add Notes Of Particular User
app.post('/addnotes', (req, res) => {

    let notes = req.body.allnotes;
    let email = req.body.email;
    notes = JSON.stringify(notes);
    let q = `update login set notes=${notes} where email='${email}' `;
    con.query(q, (err, result) => {
        if (err)
            throw err;
        res.send(" Has been updated the data in the database of your login and done with all the ")
    })

})




// Server Running On This Port
let server = app.listen(8000, () => {
    console.log(" Server is listen on port 8000  ... . . . . . . ");
})