const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
const port = 8000;
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PATCH","DELETE"],
}));

// Display All Users
app.get("/users",(req,res)=>{
return res.json(users);
})

app.listen(port,(err)=>{
console.log(`App is Running in Port ${port}`);
});


// Delete User By Id 
app.delete("/users/:id",(req,res) => {
const id = Number(req.params.id);
const filteredUsers = users.filter((user) => user.id !==id);
fs.writeFile("./sample.json",JSON.stringify(filteredUsers),(err,data) => {
   // return res.json(filteredUsers);
   return res.json(`Id No : ${id} Deleted Successfully`);
});
});

// Add User Data
app.post("/users", (req,res) => {
const {name, age, city} = req.body;
if(!name || !age || !city){
    res.status(400).send({"message" :"All Fields are Required"});
}

const id =Date.now();
users.push({id,name,age,city});

fs.writeFile("./sample.json",JSON.stringify(users),(err,data) => {
    // return res.json(filteredUsers);
   // return res.json(`Id No : ${id} Deleted Successfully`);
 });
    return res.json({"message":"User Detail Added Successfully"});
});


// Update User By Id

app.patch("/users/:id", (req,res) => {
    const id = Number(req.params.id);
    const {name, age, city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({"message" :"All Fields are Required"});
    }
    
    let index = users.findIndex((user) => user.id ==id);

    users.splice(index,1,{ ...req.body});
    
    fs.writeFile("./sample.json",JSON.stringify(users),(err,data) => {
        // return res.json(filteredUsers);
       // return res.json(`Id No : ${id} Deleted Successfully`);
     });
        return res.json({"message":"User Id  "+ id + "  Detail Updated Successfully"});
    }); 