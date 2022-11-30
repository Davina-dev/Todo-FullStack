const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");


const app = express();

//utiliza estos middlewares:
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


//enpoint de prueba
app.get("/", async(req,res)=>{
    res.status(200).json({ok:true})
});

app.listen(config.SERVER_PORT, () =>{
    const mode= config.NODE_ENV.toUpperCase();
    console.log(`Todo API Server (mode ${mode}) listening on port :${config.SERVER_PORT}`);
})

// minuto 55