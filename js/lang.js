// Definir idioma padrão ou usar o último selecionado
let idiomaAtual = localStorage.getItem('idioma') || 'pt';
aplicarTraducoes(); // Aplica traduções na inicialização

// Função para mudar idioma
function mudarIdioma(idioma) {
    idiomaAtual = idioma;
    localStorage.setItem('idioma', idioma); // Armazena o idioma selecionado
    aplicarTraducoes(); // Aplica as traduções
}

// Função para aplicar traduções com base no idioma atual
function aplicarTraducoes() {
    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const chave = elemento.getAttribute('data-i18n');
        elemento.innerText = traducoes[idiomaAtual][chave] || chave; // Define o texto
    });
}

