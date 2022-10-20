// const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

const contenedorProductos = document.getElementById('contenedor-productos')

fetch('/catalogoPorductos.json')
    .then((res) => res.json())
    .then((data) => {

        data.forEach((producto) => {
            const div = document.createElement('div')
            div.innerHTML =
                `
                <img src=${producto.img} alt=''>
                <h3>${producto.nombre}</h3>
                <p>${producto.desc}</p>
                <p class = "precioProducto"> Precio: $ ${producto.precio}</p>
                <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
                `
            contenedorProductos.appendChild(div)
            const boton = document.getElementById(`agregar${producto.id}`)
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto.id)
            })
        })

        // async function fetchearProductos() {
        // const response = await fetch("./catalogoProductos.json");

        // const productos = await response.json();

        // mostrarProductos(productos);
        // }

        // fetchearProductos();

        // stockProductos.forEach((producto) => {
        //     const div = document.createElement('div')
        //     div.classList.add('producto')
        //     div.innerHTML = `
        //     <img src=${producto.img} alt=''>
        //     <h3>${producto.nombre}</h3>
        //     <p>${producto.desc}</p>
        //     <p class = "precioProducto"> Precio: $ ${producto.precio}</p>
        //     <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        //     `
        //     contenedorProductos.appendChild(div)
        //     const boton = document.getElementById(`agregar${producto.id}`)
        //     boton.addEventListener('click', () => {
        //         agregarAlCarrito(producto.id)
        //     })
        // })

        const agregarAlCarrito = (prodId) => {
            const existe = carrito.some(prod => prod.id === prodId)

            if (existe) {
                const prod = carrito.map(prod => {
                    if (prod.id === prodId) {
                        prod.cantidad++
                    }
                })
            } else {
                const item = stockProductos.find((prod) => prod.id === prodId)
                carrito.push(item)
                console.log(carrito)
            }
            actualizarCarrito()
        }
        const eliminarDelCarrito = (prodId) => {
            const item = carrito.find((prod) => prod.id === prodId)
            const indice = carrito.indexOf(item)
            carrito.splice(indice, 1)
            actualizarCarrito()
            console.log(carrito)

        }

        const actualizarCarrito = () => {
            contenedorCarrito.innerHTML = ""

            carrito.forEach((prod) => {
                const div = document.createElement('div')
                div.className = ('productoEnCarrito')
                div.innerHTML = `
        <img src= ${prod.img} alt=''>
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(s${prod.id})" class="boton-eliminar"><i class= "fas fa-trash-alt"></i></button>
        `
                contenedorCarrito.appendChild(div)
                localStorage.setItem('carrito', JSON.stringify(carrito))
            })
            contadorCarrito.innerText = carrito.length

            precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
        }


