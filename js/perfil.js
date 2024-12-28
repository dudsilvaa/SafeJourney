firebase.auth().onAuthStateChanged((user) => {
    // Se um usuário estiver logado
    if (user) {
        // Obter o UID do usuário logado
        var uid = user.uid;  

        // Acessar os dados do usuário no Firebase Realtime Database
        var dadosUsuario = firebase.database().ref('users/' + uid);

        // Ouvir mudanças nos dados do usuário no banco de dados
        dadosUsuario.on('value', (snapshot) => {
            // Armazenar esses dados
            var userData = snapshot.val();
        
            // Verificar se há dado "nome" e "email"
            if (userData && userData.nome && userData.email) {
                var nomeCampo = document.getElementById('nome');
                var emailCampo = document.getElementById('email');

                // Se sim, apresenta-los nos campos nome e email do perfil
                nomeCampo.value = userData.nome;
                emailCampo.value = userData.email;
            }

            // Se der algo errado com os dados
            else {
                console.error("Nenhum dado encontrado para o usuário logado.");
            }  
        })
    }
    }
);