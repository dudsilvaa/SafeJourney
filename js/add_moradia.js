// Se o usuário não digitou nada 


// Usuário digitou todos os dados corretamente
class Casa {
    constructor() {
        this.arrayCasas = JSON.parse(localStorage.getItem('casas')) || [];
    }

    // Salvar dados
    salvar(event) {
        event.preventDefault();

        let casa = this.lerDados();

        // Verifica se há dados válidos antes de salvar
        if (casa.rua && casa.cidade && casa.desc) {
            this.adicionar(casa);
            this.salvarNoLocalStorage();
            console.log(this.arrayCasas);
            console.log("Casa cadastrada com sucesso!");
            window.location.href = "./moradia.html";
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }

    // Adicionar casa
    adicionar(casa) {
        // Armazena apenas dados simples, não instâncias de Casa
        this.arrayCasas.push({
            rua: casa.rua,
            cidade: casa.cidade,
            desc: casa.desc
        });
    }

    // Ler dados da casa
    lerDados() {        
        casa.rua = document.getElementById('ruaCampo').value;
        casa.cidade = document.getElementById('cidadeCampo').value;
        casa.desc = document.getElementById('descCampo').value;

        return casa;
    }

    salvarNoLocalStorage() {
        localStorage.setItem('casas', JSON.stringify(this.arrayCasas));
    }
}

var casa = new Casa();

