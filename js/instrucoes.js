// Setas
var setas = document.getElementsByClassName("down");

// Accordion (Fechar e abrir)
var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    
    // Obter a seta correspondente ao accordion clicado
    var seta = this.getElementsByClassName("down")[0]; 
    
    if (panel.style.display === "block") {
      panel.style.display = "none";
      
      // Mudar a seta para a cor original (seta amarela)
      if (seta.src.includes("seta2.png")) {
        seta.src = "./img/seta.png";
      }
    } else {
      panel.style.display = "block";
      
      // Mudar a seta para a cor branca (seta2)
      if (seta.src.includes("seta.png")) {
        seta.src = "./img/seta2.png";
      }
    }
  });
}


// Subaccordion (Fechar e abrir)
var subacc = document.getElementsByClassName("subaccordion");

for (var i = 0; i < subacc.length; i++) {
  subacc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}