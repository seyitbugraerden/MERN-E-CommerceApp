const express = require("express")
const app = express();

app.get("/",(req,res)=>{
    res.send("Hello Express JS")
});
app.get("/api",(req,res)=>{
    res.send("Hello I came from API")
});

app.listen(5000,()=>{
    console.log("Sunucu Çalışıyor")
})