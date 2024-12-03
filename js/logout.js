/// LOGOUT
var sair = document.getElementsByClassName('sair');

// Ouvir evento de click
sair.addEventListener("click", function() {
    logout();
});

// Função de deslogar
function logout() {
    firebase.auth().signOut().then(() => {
        // Confirmar se o usuário deseja sair da conta
        if(confirm("Deseja sair da sua conta?")) {
            // Vai para  atela de cadastro
            window.location.href = "./sign.html";
        } 
        else {
            return;
        }
    }).catch(() => {
        alert("Erro!")
    })
}

/// APÓS O USUÁRIO DESLOGAR, NÃO O DEIXAR VOLTAR
/*
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "./sign.html";
    }
}); */