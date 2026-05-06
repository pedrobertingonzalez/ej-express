const express = require ('express');
const router = express.Router();

const {
    leerProductos,
    crearProductos,
    venderProducto,
    obtenerStockBajo
} = require ('../services/stock.services');

router.get('/', async (req, res)=>{
    try {
        const productos = await leerProductos();
        res.status(200).json({productos});
    } catch(error){
        res.status(500).json({error: error.message});
    }
});

router.get('/stock', async (req, res)=>{
    try{
        const stockBajo = await obtenerStockBajo();
        res.status(200).json({stockBajo});
    }catch (error){
        res.status(500).json({error: error.message});
    }
})

router.post('/', async (req, res) =>{
    try{
        const nuevoProducto = await crearProductos(req.body);
        res.status(201).json({nuevoProducto});
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.patch('/:id', async (req, res)=>{
    try{
        const id = parseInt(req.params.id);
        const {cantidad} = req.body;
        const productoActualizado = await venderProducto(id, cantidad);
        res.status(200).json({productoActualizado});
    } catch (error){
        res.status(400).json({error: error.message});
    }
})

module.exports = router;