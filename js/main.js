const productos = [
    {
        id: 'television',
        product: 'TV LED 50"',
        thumbnail: './images/tv-led-50.webp',
        price: '629',
    },
    {
        id: 'equipo-audio',
        product: 'Equipo de Audio 5,1 Subwoofer, Bluetooth, USB, FM/AM',
        thumbnail: './images/equipo-de-audio.webp',
        price: '149',
    },
    {
        id: 'camara-fotos',
        product: 'Cámara de Foto FZ300 + lente 18-55mm',
        thumbnail: './images/camara-de-fotos.webp',
        price: '582',
    },
    {
        id: 'playstation',
        product: 'PlayStation 5 825Gb Standard color blanco y negro',
        thumbnail: './images/playstation-5.webp',
        price: '839',
    },
];

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

for (const articuloVenta of productos) {
    cards.innerHTML += ` <article class="card" id="${articuloVenta.id}">
                            <img src="${articuloVenta.thumbnail}" alt="">
                            <div class="card-body">
                                <p>${articuloVenta.product}</p>
                                <p>U$S ${articuloVenta.price}</p>
                            </div>
                            <button onclick="agregarAlCarrito('${articuloVenta.id}')">Agregar al carrito</button>
                        </article>`;
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
    const productoAgregado = productos.find((articuloVenta) => articuloVenta.id === id);
    let carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];

    if (productoAgregado) {
        carritoLocalStorage.push(productoAgregado);

        // Suma el precio del producto al precio total
        totalPrecio += parseFloat(productoAgregado.price);

        localStorage.setItem('carrito', JSON.stringify(carritoLocalStorage));
        mostrarCarrito();
        actualizarPrecioTotal();
    }
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
    if(precioTotalElement){
        precioTotalElement.textContent = `Total: U$S ${totalPrecio.toFixed(2)}`;
    }
}


// Mostrar el carrito al cargar la página
mostrarCarrito();
