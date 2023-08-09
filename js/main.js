const url = 'https://restapicrud.mixup19.repl.co/products'
const carousel = document.querySelector('.carousel')

var elementos;

function movimientos(){
    const FILA = document.querySelector('.contenedor-carousel');
const PELICULAS = document.querySelectorAll('.pelicula');
const FLECHAIZQUIERDA = document.getElementById('flecha-izquierda');
const FLECHADERECHA = document.getElementById('flecha-derecha');
const NUMEROPAGINAS = Math.ceil(PELICULAS.length / 5);

    // EVENT LISTENER FLECHA DERECHA
FLECHADERECHA.addEventListener('click', ()=>{
    FILA.scrollLeft += FILA.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.nextSibling) {
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
})
FLECHAIZQUIERDA.addEventListener('click', ()=>{
    FILA.scrollLeft -= FILA.offsetWidth;
    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.previousSibling) {
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
})

//paginacion

for(let i =0; i<NUMEROPAGINAS; i++){
    const indicador = document.createElement('button');
    if (i===0) {
        indicador.classList.add('activo');
    }
    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener('click', (e)=>{
        FILA.scrollLeft=i*FILA.offsetWidth;
        document.querySelector('.indicadores .activo').classList.remove('activo');
        e.target.classList.add('activo');
    })
}

// hover
PELICULAS.forEach((pelicula)=>{
    pelicula.addEventListener('mouseenter',(e)=>{
        const elemento = e.currentTarget;
        setTimeout(()=>{
            PELICULAS.forEach(pelicula=> pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
        })
    });
    pelicula.addEventListener('click', (e)=> {
        
    });
});

FILA.addEventListener('mouseleave',()=>{
    PELICULAS.forEach(pelicula=> pelicula.classList.remove('hover'));
});
}

async function getapi() {

    const response = await fetch(url);
   
    var data = await response.json();
    show(data)
}
function show(data){
    const pelicula_principal= document.querySelector('.pelicula-principal');
    const titulo = document.querySelector('.titulo');
    const descripcion = document.querySelector('.descripcion');
    pelicula_principal.style.backgroundImage= 'url('+data[0].image.secure_url+')';
    titulo.textContent= data[0].name;
    descripcion.textContent = data[0].description
    data.forEach(element => {
        
        const image = document.createElement('img');
        const div = document.createElement('div');
        const a = document.createElement('a');
        a.href='#'
        div.classList.add('pelicula');
        image.src= element.image.secure_url;
        a.appendChild(image);
        div.appendChild(a);
        div.addEventListener('click', (e)=>{
            pelicula_principal.style.backgroundImage= 'url('+element.image.secure_url+')';
            titulo.textContent= element.name;
            descripcion.textContent = element.description
        })
        carousel.appendChild(div);
    });
    
    movimientos();
}
getapi()
