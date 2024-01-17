const dropArea = document.querySelector(".drop-area");
const nombre = document.querySelector(".nombre");
const descripcion = document.querySelector(".descripcion")
const dragText = dropArea.querySelector('h2');
const input = dropArea.querySelector("#input-file")
const validExtensions = ['image/jpeg','image/jpg','image/png','image/gif'];
const preview = document.querySelector("#preview");
const modal_container = document.getElementById('modal_container');
const modal_espera=document.getElementById('modal_espera')
const modal =document.getElementById('modal_');
const close = document.getElementById('close');
let files, nameInput='', description='';
let docType;
function showFile(files){
        for (const file of files) {
            proccesFile(file);
        }
    
}

function proccesFile(file){
    docType = file.type;

    if(validExtensions.includes(docType)){
        const fileReader = new FileReader();

        fileReader.addEventListener('load', (e)=>{
            const fileUrl = fileReader.result;
            const image = `<img src="${fileUrl}" alt="${file.name}">`
            dropArea.innerHTML=image;
        });
        fileReader.readAsDataURL(file);
    }else{
        alert("No es un archivo valido");
    }
}
function createForm(){
    if(nameInput === '' || description === '' || files === undefined){
        alert ("Faltan campos por llenar");
    }else{
        modal_espera.classList.add('show');
        let formData = new FormData();
        formData.append('name', nameInput);
        formData.append('description', description);
        formData.append('image', files[0]);
        upload(formData);
    }
}
async function upload(formData){
    const url = 'https://album-2huh.onrender.com/products'
    const options ={
        method: 'POST',
        body: formData
    };
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        if (data.id != '') {
            modal.querySelector('.titulo').textContent="Salió bien :D"
            modal.querySelector('.parrafo').textContent="El recuerdo se guardó con exito";
        } else {
            modal.querySelector('.titulo').textContent="Algo salió mal :(";
            modal.querySelector('.parrafo').textContent="Trata de nuevo, si no mandame mensaje";
        }
        modal_espera.classList.remove('show');
        modal_container.classList.add('show');
  });
}
// obtencion de datos mediante los eventListener

dropArea.addEventListener("click", (e)=>{
    input.click();
});
dropArea.addEventListener("mouseenter", (e)=>{
    dropArea.classList.add('hover')
});
dropArea.addEventListener("mouseleave", (e)=>{
    dropArea.classList.remove('hover')
});

input.addEventListener("change", (e)=> {
    files = e.target.files;
    dropArea.classList.add("active");
    showFile(files)
    dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e)=>{
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para añadir la foto";
});

dropArea.addEventListener("dragleave", (e)=>{
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta la imagen";
});

dropArea.addEventListener("drop", (e)=>{
    e.preventDefault();
    files = e.dataTransfer.files;
    showFile(files)
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta la imagen";

});

descripcion.addEventListener("input", (e) =>{
    description = descripcion.value;
});
nombre.addEventListener("input", (e) =>{
    nameInput = nombre.value;
});
// función para cerrar la ventana modal
close.addEventListener('click',() =>{
    modal_container.classList.remove('show');
    nombre.value='';
    descripcion.value="";
    dropArea.innerHTML='<h2>Arrastra y suelta tus imagenes</h2><h2>o</h2><h2>seleciona tus archivos</h2><input type="file" id="input-file" hidden>';
});

