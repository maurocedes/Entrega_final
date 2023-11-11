const productos = [{
    id: 1,
    product: 'TV LED 50"',
    thumbnail: './images/tv-led-50.webp',
    price: '629',
},
{
    id: 2,
    product: 'Equipo de Audio 5,1 Subwoofer, Bluetooth, USB, FM/AM',
    thumbnail: './images/equipo-de-audio.webp',
    price: '149',
},
{
    id: 3,
    product: 'Cámara de Foto FZ300 + lente 18-55mm',
    thumbnail: './images/camara-de-fotos.webp',
    price: '582',
},
{
    id: 4,
    product: 'PlayStation 5 825Gb Standard color blanco y negro',
    thumbnail: './images/playstation-5.webp',
    price: '839',
},
];

const form = document.querySelector('#form');
const formContainer = document.querySelector('.form-container-inputs');


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
        }
        localStorage.setItem('userData', JSON.stringify(data));
        console.log(data)
    }
}

const saveButton = document.querySelector('#save-button');
    saveButton.addEventListener('click', saveData)



const mainElement = document.querySelector('main');

let cards = document.createElement('div');

for (const articuloVenta of productos) {
    cards.innerHTML += ` <article class="card" id="${articuloVenta.id}">
                        <img src="${articuloVenta.thumbnail}" alt="">
                        <div class="card-body">
                            <p>${articuloVenta.product}</p>
                            <p>U$S ${articuloVenta.price}</p>
                        </div>
                    </article>`;
}

mainElement.appendChild(cards);
