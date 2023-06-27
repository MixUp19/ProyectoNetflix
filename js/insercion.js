const dropArea = document.querySelector(".drop-area");
const nombre = document.querySelector(".nombre");
const descripcion = document.querySelector(".descripcion")
const dragText = dropArea.querySelector('h2');
const input = dropArea.querySelector("#input-file")
const validExtensions = ['image/jpeg','image/jpg','image/png','image/gif'];
const preview = document.querySelector("#preview");
let files, nameInput='', description='';
let docType;
function showFile(files){
    if (files.length === undefined) {
        proccesFile(files);
    } else {
        for (const file of files) {
            proccesFile(file);
        }
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
        let formData = new FormData();
        formData.append('name', nameInput);
        formData.append('description', description);
        formData.append('image', files[0]);
        upload(formData);
    }
}
async function upload(formData){
    const url = 'https://restapicrud.mixup19.repl.co/products'
    const options ={
        method: 'POST',
        body: formData
    };
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        if(data != undefined){
            alert("subido con extito");
        }
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

