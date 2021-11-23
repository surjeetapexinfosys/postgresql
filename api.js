const client = require('./connection.js')
const express = require('express');


const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parsed as JSON. Wouldn't recommend
}));

app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})




client.connect();

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.post('/createuser', (req, res)=> {
    const user = req.body;
    console.log(req.body);
    let insertQuery = `insert into users(id, firstname, lastname, location) 
                       values('${user.id}','${user.firstname}', '${user.lastname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
app.post('/createsale', (req, res)=> {
    const user = req.body;
    console.log(req.body);
    let insertQuery = `insert into sales(username, amount, created) 
                       values('${user.username}', '${user.amount}', '${user.created}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
app.post('/createarticle', (req, res)=> {
    const user = req.body;
    console.log(req.body);
    let insertQuery = `insert into article(article_name, article_desc, date_added) 
                       values('${user.article_name}', '${user.article_desc}', '${user.date_added}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
app.get('/hourlyrecords/:id', (req, res)=>{
    client.query(`Select SUM(amount) AS hourly from sales GROUP BY to_date(date)`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})