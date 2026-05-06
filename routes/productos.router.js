const express = require ('express');
const router = express.Router();

const {
    leerProductos,
    crearProductos,
    venderProducto,
    obtenerStockBajo
} = require ('../services/stock.services');

router.get('/', async (req, res, next)=>{
    try {
        const productos = await leerProductos();
        res.status(200).json({productos});
    } catch(error){
        next(error);
    }
});

router.get('/stock', async (req, res, next)=>{
    try{
        const stockBajo = await obtenerStockBajo();
        res.status(200).json({stockBajo});
    }catch (error){
        next(error);
    }
})

router.post('/', async (req, res, next) =>{
    try{
        const nuevoProducto = await crearProductos(req.body);
        res.status(201).json({nuevoProducto});
    } catch (error){
        next(error);
    }
});

router.patch('/:id', async (req, res, next)=>{
    try{
        const id = parseInt(req.params.id);
        const {cantidad} = req.body;
        const productoActualizado = await venderProducto(id, cantidad);
        res.status(200).json({productoActualizado});
    } catch (error){
        next(error);
    }
})

module.exports = router;