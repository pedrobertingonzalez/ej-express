const express = require ('express');
const app = express ();

// express no entiende JSON por eso necesitamos un middleware que lo parsee
app.use(express.json()); 

const {
    leerProductos,
    crearProductos,
    venderProducto,
    obtenerStockBajo
} = require ('./services/stock.services');

app.get('/productos', async (req, res)=>{
    try {
        const productos = await leerProductos();
        res.status(200).json({productos});
    } catch(error){
        res.status(500).json({error: error.message});
    }
});

app.get('/productos/stock', async (req, res)=>{
    try{
        const stockBajo = await obtenerStockBajo();
        res.status(200).json({stockBajo});
    }catch (error){
        res.status(500).json({error: error.message});
    }
})

app.post('/productos', async (req, res) =>{
    try{
        const nuevoProducto = await crearProductos(req.body);
        res.status(201).json({nuevoProducto});
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

app.patch('/productos/:id', async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        const {cantidad} = req.body;
        const productoActualizado = await venderProducto(id, cantidad);
        res.status(200).json({productoActualizado});
    } catch (error){
        res.status(400).json({error: error.message});
    }
})



// SIEMPRE AL FINAL
app.listen(3000, () =>{
    console.log('Servidor corriendo en puerto 3000');
});