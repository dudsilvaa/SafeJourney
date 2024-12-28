// IMAGEM
const dropArea = document.querySelector(".drag-area");
const button = dropArea.querySelector(".search");
const imgInput = dropArea.querySelector("input");

let file; 
let fileURL = ""; 

button.onclick = (event)=>{
    event.preventDefault();
   imgInput.click(); 
}
 
imgInput.addEventListener("change", function(event){
    event.preventDefault();
   //getting user select file and [0] this means if user select multiple files then we'll select only the first one
   file = this.files[0];
   dropArea.classList.add("active");
   showFile(); //calling function
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault();
   event.preventDefault(); //preventing from default behaviour
   dropArea.classList.add("active");
});
 
//If user leave dragged File from DropArea
 dropArea.addEventListener("dragleave", (event)=>{
    event.preventDefault();
   dropArea.classList.remove("active");
});
 
//If user drop File on DropArea
 dropArea.addEventListener("drop", (event)=>{
   event.preventDefault(); //preventing from default behaviour
   //getting user select file and [0] this means if user select multiple files then we'll select only the first one
   file = event.dataTransfer.files[0];
   showFile(); //calling function
});
 
function showFile(){
   let fileType = file.type; //getting selected file type
   let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
   if(validExtensions.includes(fileType)) { //if user selected file is an image file
    let fileReader = new FileReader(); //creating new FileReader object
    fileReader.onload = ()=>{
       fileURL = fileReader.result; //passing user file source in fileURL variable
       let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src 
       dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
     }
     fileReader.readAsDataURL(file);
    } else {
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
    }
}

// Inicializar a função de cadastro
document.querySelector("form").addEventListener("submit", addMoradia);


// CADASTRAR NOVA MORADIA
function addMoradia(event) {
    event.preventDefault();

    const nomeInput = document.querySelector('.forms input[id="nomeCampo"]');
    // const emailInput = document.querySelector('#cadastrar input[type="email"]');
    // const numInput = document.querySelector('#cadastrar input[id="password1"]');
    const ruaInput = document.querySelector('.forms input[id="ruaCampo"]');   
    const cidadeInput = document.querySelector('.forms input[id="cidadeCampo"]');   
    const descInput = document.querySelector('.forms textarea[id="descCampo"]');   

    // Capturar os dados da moradia retornado
    var nome = nomeInput.value;
    var rua = ruaInput.value;
    var cidade = cidadeInput.value;
    var desc = descInput.value;
    var img = fileURL;

    // Criando os dados da moradia
    const moradiaData = {
        nome: nome,
        rua: rua,
        cidade: cidade,
        desc: desc,
        img: img
    }

    // Adicionar ao Firebase
    var database_ref = database.ref('moradias');
    const newMoradia = database_ref.push();

    newMoradia.set(moradiaData).then(() => {
      console.log("Moradia cadastrada:", moradiaData); // Exibir as informações do novo usuário
      window.location.href = "./moradia.html";
    })
    .catch(error => {
      console.error("Erro ao cadastrar moradia:", error);
    });

        // Exibir popup de sucesso
    /* ARRUMAR !!
    const popup = document.getElementById('popup_cadastrar');
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
*/ 
}


