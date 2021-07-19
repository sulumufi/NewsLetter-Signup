const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+ "/signup.html");
})

app.post("/", function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email


    var data={
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)

    const url = "https://us6.api.mailchimp.com/3.0/lists/98b6c7f233 "
    const options = {
        method : "POST",
        auth: "sulumufi:0feeecf3388929de621cd894f2180aa7-us6"

    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+ "/success.html");
        }
        else{
            res.sendFile(__dirname+ "/fail.html");
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

    console.log(firstName , lastName , email);
})


app.post("/fail", function(req,res){
    res.redirect("/");
})
    


app.listen(process.env.PORT || 3000, function(){
    console.log("server is set on 3000");
})

// api-key   0feeecf3388929de621cd894f2180aa7-us6

// list-id    98b6c7f233