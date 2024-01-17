const url = 'https://album-2huh.onrender.comproducts';
const carousel = document.querySelector('.carousel');
const modal = document.getElementById('modal_container');
const modal_confirmacion = document.getElementById('modal_confirmacion');
const foto = document.getElementById('foto-seleccionada');
const close = document.getElementById('close');
const close_aviso= document.getElementById('close_aviso');
const titulo_confirmacion= document.getElementById('texto_confirmacion');
const modal_espera=document.getElementById('modal_espera');
const boton_borrar = document.getElementById('borrar');
var elementos;

function movimientos() {
    const FILA = document.querySelector('.contenedor-carousel');
    const PELICULAS = document.querySelectorAll('.pelicula');
    const FLECHAIZQUIERDA = document.getElementById('flecha-izquierda');
    const FLECHADERECHA = document.getElementById('flecha-derecha');
    const NUMEROPAGINAS = Math.ceil(PELICULAS.length / 5);

    // EVENT LISTENER FLECHA DERECHA
    FLECHADERECHA.addEventListener('click', () => {
        FILA.scrollLeft += FILA.offsetWidth;

        const indicadorActivo = document.querySelector('.indicadores .activo');
        if (indicadorActivo.nextSibling) {
            indicadorActivo.nextSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    })
    FLECHAIZQUIERDA.addEventListener('click', () => {
        FILA.scrollLeft -= FILA.offsetWidth;
        const indicadorActivo = document.querySelector('.indicadores .activo');
        if (indicadorActivo.previousSibling) {
            indicadorActivo.previousSibling.classList.add('activo');
            indicadorActivo.classList.remove('activo');
        }
    })

    //paginacion

    for (let i = 0; i < NUMEROPAGINAS; i++) {
        const indicador = document.createElement('button');
        if (i === 0) {
            indicador.classList.add('activo');
        }
        document.querySelector('.indicadores').appendChild(indicador);
        indicador.addEventListener('click', (e) => {
            FILA.scrollLeft = i * FILA.offsetWidth;
            document.querySelector('.indicadores .activo').classList.remove('activo');
            e.target.classList.add('activo');
        })
    }

    // hover
    PELICULAS.forEach((pelicula) => {
        pelicula.addEventListener('mouseenter', (e) => {
            const elemento = e.currentTarget;
            setTimeout(() => {
                PELICULAS.forEach(pelicula => pelicula.classList.remove('hover'));
                elemento.classList.add('hover');
            })
        });
        pelicula.addEventListener('click', (e) => {

        });
    });

    FILA.addEventListener('mouseleave', () => {
        PELICULAS.forEach(pelicula => pelicula.classList.remove('hover'));
    });
}

async function getapi() {

    const response = await fetch(url);

    var data = await response.json();
    show(data)
}

async function borrar(id){
    modal_container.classList.remove('show');
    modal_espera.classList.add('show');
    const options ={
        method: 'DELETE'
    };
    fetch(url+'/'+id,options)
    .then(response => response.json())
    .then(data => {
        if (data.id != '') {
            titulo_confirmacion.textContent="Se borró el recuerdo con exito"
        } else {
            texto_confirmacion.textContent="no se pudo borrar el recuerdo";
        }
        modal_espera.classList.remove('show');
        modal_confirmacion.classList.add('show');
  });
}
function show(data) {

    data.forEach(element => {

        const image = document.createElement('img');
        const div = document.createElement('div');
        const a = document.createElement('a');
        a.href = '#'
        div.classList.add('pelicula');
        image.src = element.image.secure_url;
        a.appendChild(image);
        div.appendChild(a);
        div.addEventListener('click', (e) => {
            foto.src=element.image.secure_url;
            modal.classList.add('show');
            const id = element._id;
            boton_borrar.addEventListener('click', ()=>{
                borrar(id);
            });
        })
        carousel.appendChild(div);
    });
    if(!modal.classList.contains('show'))
        movimientos();
}
getapi()

close.addEventListener('click',() =>{
    modal.classList.remove('show');
});
close_aviso.addEventListener('click',() =>{
    modal_confirmacion.classList.remove('show');
    window.location.reload()
});
