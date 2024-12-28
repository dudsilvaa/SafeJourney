// Splash Screen
let loading = document.getElementById("loading");

setTimeout(function() {
    loading.style.opacity = 0;
    setTimeout(function() {
        loading.style.display = "none"
    }, 750);

    // Redirecionar para a tela de login/cadastro
    window.location.href = "./sign.html";
}, 850);