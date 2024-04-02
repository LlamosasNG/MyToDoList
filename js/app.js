// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];

// Event Listeners
eventListener();

function eventListener() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo'
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        // console.log(tweets);
        crearHTML();
    });
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;


    // Validación
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; // Evita que se ejecuten más líneas de código
    }

    const tweetObj = {
        id: Date.now(),
        texto: tweet // Es posible realizar esto cuando la llave es igual al contenido => tweet: tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Una vez agregado se crea el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();

}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Inserta en contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

function crearHTML() {
    // Se limpia el HTML
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X'

            //Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);

            }
            // Crear el HTML
            const li = document.createElement('li');

            // Añadir texto
            li.innerText = tweet.texto;

            // Añade un atributo único
            li.dataset.tweetId = tweet.id;

            // Agregar el boton de eliminar
            li.appendChild(btnEliminar);

            // Se inserta en HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Limpiar el HTML 
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Agrega los tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

