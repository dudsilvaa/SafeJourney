function listarCasas() {
    let casaContainer = document.querySelector('.casa');
    const moradiasRef = firebase.database().ref('moradias'); // Referência ao nó 'moradias'

    // Usa onValue para escutar as mudanças
    moradiasRef.on('value', (snapshot) => {
        console.log("Dados recebidos do Firebase:", snapshot.val()); // Verificar se os dados estão sendo recebidos

        // Limpar o conteúdo antes de listar as casas
        casaContainer.innerHTML = ""; 

        // Verifica se não há casas no banco de dados
        if (!snapshot.exists()) {
            casaContainer.innerHTML = `<p class="naoha">Não há casas disponíveis no momento.</p>`;
            return; 
        }

        // Itera sobre os dados retornados e exibe no HTML
        snapshot.forEach((childSnapshot) => {
            const moradia = childSnapshot.val();
            console.log("Casa encontrada:", moradia); // Log para cada casa encontrada

            // Cria um novo contêiner para cada casa
            let divCasa = document.createElement('div');
            divCasa.classList.add('casa-item');

            // Adiciona o conteúdo da casa
            divCasa.innerHTML = `
                <div class= "   ">
                    <img src="${moradia.img}" alt="Casa">
                </div>
                <h3>${moradia.rua}</h3>
                <p><strong data-i18n="locall" class="negrito">Local:</strong> ${moradia.rua}, ${moradia.cidade}</p>
                <p><strong data-i18n="desc" class="negrito">Descrição:</strong> ${moradia.desc.length > 13 ? moradia.desc.substring(0, 13) + "..." : moradia.desc}</p>
                <a href="#"><button data-i18n="saiba" class="btn_vermais">Ver mais</button></a>
            `;

            // Caso o usuário não adicione nenhuma imagem
            if (moradia.img == null || moradia.img == "") {
                divCasa.innerHTML = `
                <img src="./img/home-icon.png" alt="Casa">
                <h3>${moradia.rua}</h3>
                <p><strong data-i18n="locall" class="negrito">Local:</strong> ${moradia.rua}, ${moradia.cidade}</p>
                <p><strong data-i18n="desc" class="negrito">Descrição:</strong> ${moradia.desc.length > 13 ? moradia.desc.substring(0, 13) + "..." : moradia.desc}</p>
                <a href="#"><button data-i18n="saiba" class="btn_vermais">Saiba mais</button></a>
            `;

                divCasa.style.height == "190px";
            }                         
            
            // Adiciona a divCasa como filho do container principal
            casaContainer.appendChild(divCasa);
        });
    });
}

listarCasas();