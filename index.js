require('dotenv').config();
const express = require ('express');
const app = express ();

// express no entiende JSON por eso necesitamos un middleware que lo parsee
app.use(express.json()); 

const logger = require('./middlewares/logger');
app.use(logger);

const productosRouter = require('./routes/productos.router');
app.use('/productos', productosRouter);



// SIEMPRE AL FINAL
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});