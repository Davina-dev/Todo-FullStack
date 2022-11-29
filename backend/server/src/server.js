const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express(); // llamas a la librería expres y crea la applicación

//utiliza estos middlewares:
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//enpoint de prueba
app.get("/", async(req,res)=>{
    res.status(200).json({ok:true})
});

app.listen(8080,()=>{
    console.log('Escuchando...')
})