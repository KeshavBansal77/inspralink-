const { urlencoded } = require("body-parser");
let express = require("express");
let mysql2 = require("mysql2");
var fileuploader=require("express-fileupload");


let app = express();

app.use(fileuploader());

app.use(express.static("public"));
app.use(urlencoded("true"));

let config = {
    host: "127.0.0.1",
    user: "root",
    password: "admin@123",
    database: "project",
    dateStrings:true

}
// let config = {
//     host: "mysql-398298cf-kesbansal802-4457.e.aivencloud.com",
//     user: "avnadmin",
//     password: "AVNS_sDSlzbMO_3HxHiAoeyE",
//     database: "defaultdb",
//     dateStrings:true

// }
// let config = "mysql://avnadmin:AVNS_sDSlzbMO_3HxHiAoeyE@mysql-398298cf-kesbansal802-4457.e.aivencloud.com:24405/defaultdb"


var mysql = mysql2.createConnection(config);
mysql.connect(function(err) {
    if (err == null)
        console.log("Connected To Database Successfulllyyyy");
    else
        console.log(err.message + "  ########");

})

app.listen(2024, function () {
    console.log("server start hogya");
})


app.get("/", function (req, resp) {

    let path = __dirname + "/public/index.html";
    resp.send(path);

})

app.get("/client-profile", function (req, resp) {

    let path = __dirname + "/public/clients-profile.html";
    resp.sendFile(path);

})

app.get("/client-dash-process", function (req, resp) {

    let path = __dirname + "/public/client-dash.html";
    resp.sendFile(path);

})




app.get("/signup-process", function (req, resp) {

    let email = req.query.txtemail;
    let pwd = req.query.pwd;
    let utype = req.query.type;

    mysql.query("select * from users where email=?", [email], function (err, result) {
        if (err == null) {
            if (result.length == 0) {
                mysql.query("insert into users values(?,?,?,?)", [email, pwd, utype, 1], function (err, result) {
                    if (err == null) {
                        resp.send("successfully signed up");
                    }
                    else
                        console.log(err.message);
                })
            }
            else {
                console.log("no");
                resp.send("user  already exist ; kindly login")
            }
        }
        else
            console.log(err.message);
    })
})

app.get("/login-process", function (req, resp) {

    let email = req.query.loginemail;
    let pwd = req.query.loginpwd;

    mysql.query("select * from users where email=? and pwd=?", [email,pwd], function (err, result) {
        if (err != null){
            resp.send(err.message)
            return;
        }
        if(result.length==0){
            resp.send("Invalid user or id")
            return;
        }
        if (result[0].status==1){
            // console.log(result); 
            resp.send(result[0].utype)
            return;
        }
        else{
            resp.send("U R BLOckrd !!")
        }
            
    })
})




app.get("/profile-process",function(req,resp){
    let path = __dirname+ "/public/inf-profile.html"
    resp.sendFile(path);
})

app.get("/infl-process",function(req,resp){
    let path = __dirname+ "/public/infl-desh.html"
    resp.sendFile(path);
})
app.get("/admin-process",function(req,resp){
    let path = __dirname+ "/public/admin-dash.html"
    resp.sendFile(path);
})






///---------------------------------infl-profile.html----------------------------------------------------

app.post("/save-process",function(req,resp){

    // console.log(req.body);

    let email= req.body.inputEmail;
    let name= req.body.inputname
    let gender= req.body.gender;
    let dob= req.body.inputdob;
    let address= req.body.inputAddress;
    let city= req.body.inputCity;
    let contact= req.body.contactno;
    let field= req.body.field.toString();
    let insta=req.body.instaid
    let fb=req.body.fbid
    let youtube=req.body.ytid
    let others= req.body.otherinfo


    let picpath="";
    if(req.files){
        picpath=req.files.ppic.name;
        let path=__dirname+"/public/uploads/"+picpath;
            req.files.ppic.mv(path);
    }
    else{
        picpath="no image ";
    }


    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[email,name,gender,dob,address,city,contact,field,insta,fb,youtube,others,picpath],function(err,result){
        if(err!=null){
            resp.send(err.message);
        }
        else{
            if(result.affectedRows==0){
                resp.send("there is a err")
            }
            else 
                // resp.send("successfully saved");
                resp.redirect('/response.html');
        }
    })
})


app.post("/update-process",function(req,resp){

    // console.log(req.body);

    let email= req.body.inputEmail;
    let iname= req.body.inputname
    let gender= req.body.gender;
    let dob= req.body.inputdob;
    let address= req.body.inputAddress;
    let city= req.body.inputCity;
    let contact= req.body.contactno;
    let field= req.body.field.toString();
    let insta=req.body.instaid
    let fb=req.body.fbid
    let youtube=req.body.ytid
    let others= req.body.otherinfo

    // let str;
    // if(Array.isArray(field))
    //     {
    //      str="";
    // for(i=0;i<field.length;i++)
    //     {
    //         str+=field[i]+",";
    //     }
    // console.log(str);
    //     }
    //     else
    //     str=field;


    let picpath="";
    if(req.files){
        picpath=req.files.ppic.name;
        let path=__dirname+"/public/uploads/"+picpath;
            req.files.ppic.mv(path);
    }
    else{
        picpath=req.body.hdn;
        // console.log(picpath);
    }


    mysql.query("update iprofile set iname=? ,gender=?,dob=?,address=?,city=?,contact=?,field=?,insta=?,fb=?,youtube=?,others=?,picpath=? where email=?",[iname,gender,dob,address,city,contact,field,insta,fb,youtube,others,picpath,email],function(err,result){
        if(err!=null){
            resp.send(err.message);
        }
        else{
            if(result.affectedRows==0){
                resp.send("there is a err")
            }
            else 
                // resp.send("Updated saved");
                resp.redirect('/response.html');
        }
    })
})

app.get("/search-process",function(req,resp){

    let email= req.query.txtemail;
    // console.log(email);
    mysql.query("select * from iprofile where email=?",[email.trim()],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return ;
            }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

app.get("/check-user-existance",function(req,resp)
{
    let email= req.query.txtEmail;
    // console.log(email);
   
    mysql.query("select * from iprofile where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        if(resultJsonAry.length==0) 
            resp.send("Yes!! Available :-)");
        else
            resp.send("Sorrryy Alreadyy Taken... :-(");
    })

})

//------------------------------------------------------------------------------------------------------
// ==============================admin-dashboard=======================================
app.get("/influencer-process",function(req,resp){
    let path = __dirname+ "/public/admin-all-influ.html"
    resp.sendFile(path);
})
app.get("/user-manager-process",function(req,resp){
    let path = __dirname+ "/public/admin-users.html"
    resp.sendFile(path);
})
app.get("/fetch-all",function(req,resp)
{
    
    mysql.query("select * from users",function(err,resultJsonAry){
        if(err!=null)
            {
                console.log(err.message);
                resp.send(err.message);
                return;

            }
            resp.send(resultJsonAry);
    })

})

app.get("/fetch-all-influencers",function(req,resp)
{
    
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                console.log(err.message);
                resp.send(err.message);
                return;

            }
            resp.send(resultJsonAry);
    })

})

app.get("/del-one",function(req,resp)
{
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})

app.get("/block-one",function(req,resp)
{
    mysql.query("update users set status=? where email=?",[0,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("blocked the user with email id  " + req.query.email );
       
    })

})

app.get("/resume-one",function(req,resp)
{
    mysql.query("update users set status=? where email=?",[1,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("unblocked the user with email id  " + req.query.email );
       
    })

})

// -----------------------------------------------------------------------------------------------------------
// -------------------------------------influencer - dashboard------------------------------------------
app.get("/post-booking-process",function(req,resp)
{
    // console.log(req.query);
    let emailid= req.query.postEmail;
    let doe= req.query.eventdate;
    let tos= req.query.eventtime;
    let events= req.query.eventtitle;
    let venue= req.query.eventvenue;
    let city= req.query.eventplace;
   
    mysql.query("insert into events(emailid,events,doe,tos,city,venue) values(?,?,?,?,?,?)", [emailid,events,doe,tos,city,venue], function (err, result) {
        if (err == null) {
            resp.send("successfully saved the booked event date");
        }
        else
            console.log(err.message);
    })

})


app.get("/update-password-process",function(req,resp)
{
    let email= req.query.settEmail;
    let oldpwd= req.query.settoldpwd;
    let newpwd= req.query.settnewpwd;
    let reppwd= req.query.settreppwd;

   
mysql.query("select * from users where email=? and pwd=?",[email,oldpwd],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        if(resultJsonAry.length==0) 
            resp.send("Invalid User id or Pwd");
        else{
            if(newpwd==reppwd){
                mysql.query("update users set pwd=? where email=?", [newpwd, email ], function (err, result) {
                    if (err == null) {
                        resp.send("successfully changed the password");
                    }
                    else
                        console.log(err.message);
                }) 
            }
            else{
                resp.send("password doesnot match with new password")
            }
        }
            
    })

})

app.get("/event-manage-process",function(req,resp)
{
    let path = __dirname+ "/public/event-manager.html"
    resp.sendFile(path);
})
//---------------------------influ-finder.html--------------------------------------------------------
app.get("/find-influencer-process",function(req,resp){
    let path = __dirname+ "/public/influ-finder.html"
    resp.sendFile(path);
})
app.get("/fetch-distinct-city",function(req,resp)
{
    let field= "%" + req.query.sfield + "%";
   
    mysql.query("select distinct city from iprofile where field like?",[field],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            } 
            resp.send(resultJsonAry)
    })

})
app.get("/fetch-influencer-details",function(req,resp)
{
    let field= "%" + req.query.sfield + "%";
    let city= req.query.scity;
    console.log(req.query.sfield +" "+req.query.scity)
    mysql.query("select * from iprofile where field like? and city=?",[field,city],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            } 
            resp.send(resultJsonAry)
    })

})
app.get("/fetch-influencer-with-name",function(req,resp)
{

    let name= req.query.selname;

    mysql.query("select * from iprofile where iname=?",[name],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            } 
            resp.send(resultJsonAry)
    })

})
// --------------------------------------------------------------------------------

app.get("/show-infl-events",function(req,resp)
{

    let emailid= req.query.infemail;
    // console.log(emailid);

    mysql.query("select * from events where emailid=?",[emailid.trim()],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            } 
            resp.send(resultJsonAry)
    })

})

app.get("/del-one-event",function(req,resp)
{
    mysql.query("delete from events where rid=?",[req.query.rid],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})

app.post("/client-save-process",function(req,resp){

    // console.log(req.body);

    let email= req.body.cEmail;
    let name= req.body.cname;
    let city= req.body.ccity;
    let state= req.body.cstate;
    let contact= req.body.ccontact;
    let org=req.body.corg;


    mysql.query("insert into cprofile values(?,?,?,?,?,?)",[email,name,city,state,org,contact],function(err,result){
        if(err!=null){
            resp.send(err.message);
        }
        else{
            if(result.affectedRows==0){
                resp.send("there is a err")
            }
            else 
                // resp.send("successfully saved");
                 resp.redirect('/response.html');
        }
    })
})

app.post("/client-update-process",function(req,resp){

    // console.log(req.body);

    let email= req.body.cEmail;
    let name= req.body.cname;
    let city= req.body.ccity;
    let state= req.body.cstate;
    let contact= req.body.ccontact;
    let org=req.body.corg;

    mysql.query("update cprofile set name=? ,city=?,state=?,org=?,mobile=? where email=?",[name,city,state,org,contact,email],function(err,result){
        if(err!=null){
            resp.send(err.message);
        }
        else{
            if(result.affectedRows==0){
                resp.send("there is a err")
            }
            else 
                // resp.send("Updated saved");
                resp.redirect('/response.html');
        }
    })
})


app.get("/client-search-process",function(req,resp){

    let email= req.query.txtemail;
    // console.log(email);
    mysql.query("select * from cprofile where email=?",[email.trim()],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return ;
            }
        resp.send(resultJsonAry);//sending array of json object 0-1
    })
})

