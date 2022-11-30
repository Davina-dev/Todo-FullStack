const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config.js");
const db = require('./db.js');
const { errorHandler, TodosApiError } = require("./errors.js");
const { all } = require("express/lib/application");


const app = express();

//utiliza estos middlewares:
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


//enpoint de prueba
app.get("/", async(req,res)=>{
    res.status(200).json({ok:true})
});


//estandarizo la gestión de errores para todo el servidor. Lo coloco como el último middleware, después de todos los enpoints
// cazo cualquier url que haya y no que salga error de expres. Solo quiero que salgan mis errores
app.all("/*", (req,res,next)=>{
    next( new TodosApiError(404, `Not Found`));
})

app.use(errorHandler);

const start = async()=>{
    await db.connect();
    app.listen(config.SERVER_PORT, () =>{
        const mode= config.NODE_ENV.toUpperCase();
        console.log(`Todo API Server (mode ${mode}) listening on port :${config.SERVER_PORT}`);
    })
}

start();
