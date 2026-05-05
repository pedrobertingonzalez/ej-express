// Una empresa tiene productos en stock. Tu sistema tiene que poder:

// Lo que tenés que entregar:
// Estructura de carpetas y archivos (vos decidís cuál tiene sentido)
// Archivo productos.json con al menos 3 productos de ejemplo
// Cuatro funciones: leerProductos(), crearProducto(), venderProducto(id, cantidad), obtenerStockBajo()
// Un index.js que las llame y muestre resultados en consola

const fs = require("fs").promises;
const path = require ("path");

const rutaStock = path.join(__dirname, "..", "data", "stock.json");

// Leer los productos desde un archivo JSON - leerProductos()

async function leerProductos(){
    const productos = await fs.readFile(rutaStock, "utf-8");
    return JSON.parse(productos)
}

// leerProductos().then(console.log);

// Crear un producto nuevo (con nombre, precio y cantidad inicial) - crearProducto()
async function guardarProductos(productos) {
    const productoEnTexto = JSON.stringify(productos, null, 2);
    await fs.writeFile(rutaStock, productoEnTexto);
}


async function crearProductos(nuevoProducto){
    const productos = await leerProductos();

    if(!nuevoProducto.nombre){
        throw new Error("Falta el nombre del producto");
    }

    if(nuevoProducto.precio <= 0 || typeof nuevoProducto.precio !== "number") {
        throw new Error("el precio es incorrecto");
    }

    if(nuevoProducto.cantidad <= 0){
        throw new Error("La cantidad es incorrecta");
    }

    const maxId = productos.reduce((max, p) => {
        return p.id > max ? p.id : max;
    }, 0);

    nuevoProducto.id = maxId + 1;
    productos.push(nuevoProducto);
    await guardarProductos(productos);
    return nuevoProducto;
}

// crearProducto({
//     "nombre": "pascuas",
//     "precio": 50,
//     "cantidad": 8
// }).then(console.log);
// Vender unidades de un producto (reducir stock) — con validación: no se puede vender más de lo que hay - venderProducto(id, cantidad)

async function venderProducto(id, cantidad){
    const productos = await leerProductos();

        const buscarPorId = productos.find((p)=>{
        return p.id === id;
    });

        if(!buscarPorId){
        throw new Error ("No se ha encontrado el producto");
    }


    if(buscarPorId.cantidad < cantidad){
        throw new Error ("no hay stock disponible");
    }

    buscarPorId.cantidad -= cantidad;

    await guardarProductos(productos);
    return buscarPorId;
}

// Ver qué productos tienen stock bajo (menos de 5 unidades) - obtenerStockBajo()

async function obtenerStockBajo(){
    const productos = await leerProductos();

    const stock = productos.filter((p)=>{
        return p.cantidad <= 5;
    })
    return stock;
}

module.exports= {
    leerProductos,
    crearProductos,
    venderProducto,
    obtenerStockBajo
}
