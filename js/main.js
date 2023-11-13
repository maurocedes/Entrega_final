
const productos = () => {
    console.log('buscar productos')
    // fetch from the products.json file inside the data folder: relative path: js\data\products.json
    return fetch('js/data/products.json')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            addCardsToDOM(data);
            return data;
        });
};
productos()
const form = document.querySelector('#form');
const formContainer = document.querySelector('.form-container-inputs');
const mainElement = document.querySelector('main');

formContainer.innerHTML = `
    <div>
        <label for="name">Nombre:</label>
        <input id="name" placeholder="Ingresa tu nombre por favor" type="text">
    </div>
    <div>
        <label for="email">Email:</label>
        <input id="email" placeholder="Ingrese su email" type="email">
    </div>
    <button id="save-button">Enviar</button>
`;

form.appendChild(formContainer);

const saveData = () => {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;

    if (name && email) {
        const data = {
            name,
            email,
        };
        localStorage.setItem('userData', JSON.stringify(data));
        console.log(data);
    }
};

const saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', saveData);

let cards = document.createElement('div');
let carrito = [];
let totalPrecio = 0; // Variable para almacenar el precio total


function addCardsToDOM(data) {
    console.log(data);
    data.forEach((articuloVenta) => {
        console.log(articuloVenta);
        cards.innerHTML += ` 
        <article class="card" id="${articuloVenta.id}">
            <img src="${articuloVenta.thumbnail}" alt="">
            <div class="card-body">
                <p>${articuloVenta.product}</p>
                <p>U$S ${articuloVenta.price}</p>
            </div>
            <button onclick="agregarAlCarrito('${articuloVenta.id}')">Agregar al carrito</button>
        </article>
        `;
    });
}

mainElement.appendChild(cards);

function borrarDelCarrito(index) {
    let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];

    // Resta el precio del elemento eliminado al precio total
    totalPrecio -= parseFloat(carritoLocalStorage[index].price);

    // Elimina el elemento en el índice proporcionado
    carritoLocalStorage.splice(index, 1);

    // Actualiza el carrito en el localStorage y vuelve a mostrar el carrito
    localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage));
    mostrarCarrito();
    actualizarPrecioTotal();
}

function agregarAlCarrito(id) {
    console.log('agregarAlCarrito triggered');
    productos().then(productos => {
        const productoAgregado = productos.find((articuloVenta) => articuloVenta.id === id);
        // const productoAgregado = productos.filter(function (producto) { return producto.id === id })
        let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];

        if (productoAgregado) {
            carritoLocalStorage.push(productoAgregado);

            // Suma el precio del producto al precio total
            totalPrecio += parseFloat(productoAgregado.price);

            localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage));
            mostrarCarrito();
            actualizarPrecioTotal();
        }

    })

}


function mostrarCarrito() {
    const carritoHTML = document.querySelector('.carrito');

    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML.innerHTML = ''; // Limpiar el contenido existente antes de mostrar los nuevos elementos

    carritoLocalStorage.forEach((item, index) => {
        carritoHTML.innerHTML += `
            <article class="card-carrito" id="${item.id}">
                <img src="${item.thumbnail}" alt="">
                <div class="card-body-carrito">
                    <p>${item.product}</p>
                    <p>U$S ${item.price}</p>
                </div>
                <a class="borrar-button" data-index="${index}" onclick="borrarDelCarrito(${index})">
                    <span><i class="bi bi-trash"></i></span>
                </a>
            </article>`;
    });

    actualizarPrecioTotal();
}

function actualizarPrecioTotal() {
    const precioTotalElement = document.querySelector('#precio-total');
    if (precioTotalElement) {
        precioTotalElement.textContent = `Total: U$S ${totalPrecio.toFixed(2)}`;
    }
}


// Mostrar el carrito al cargar la página
mostrarCarrito();


