navigator.geolocation.getCurrentPosition(posicaoObtidaComSucesso, posicaoNaoPodeSerObtida);

// Iniciando a plataforma HERE com a minha chave de API
var platform = new H.service.Platform({
    'apikey': 'X2Kyj2pmTI3V9hUK0SzC7dLh0qQRK3-v29YDv8SDXaI'
});
  
var defaultLayers = platform.createDefaultLayers();
  
// Criar e mostrar o mapa
var map = new H.Map(
    document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      zoom: 18
    }
);
  
// Criar o UI do mapa
const ui = H.ui.UI.createDefault(map, defaultLayers);
  
// Criar os ícones marcadores
function createMarkerIcon(color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
      <path d="M12 0C6.48 0 2 4.48 2 10c0 5.057 3.333 14.5 10 22 6.667-7.5 10-16.943 10-22 0-5.52-4.48-10-10-10zm0 14c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" 
      fill="${color}" stroke="#FFFFFF"/>
    </svg>`;
}
  
// Definir as cores dos marcadores
const startColor = "#00008B";
const stopoverColor = "#8AC9C9";
const splitColor = "#A2EDE7";
const endColor = "#990000";
  
// Criar os ícones com suas respectivas cores
const startIcon = new H.map.Icon(createMarkerIcon(startColor));
const stopoverIcon = new H.map.Icon(createMarkerIcon(stopoverColor));
const endIcon = new H.map.Icon(createMarkerIcon(endColor));
const splitIcon = new H.map.Icon(createMarkerIcon(splitColor));
  
// Criar a ferramenta da medição de distância
const distanceMeasurementTool = new H.ui.DistanceMeasurement({
    startIcon: startIcon,
    stopoverIcon: stopoverIcon,
    endIcon: endIcon,
    splitIcon: splitIcon,
    lineStyle: {
      strokeColor: "rgba(95, 229, 218, 0.5)",
      lineWidth: 6
    },
    alignment: H.ui.LayoutAlignment.RIGHT_BOTTOM
});
  
// Adicionar a ferramenta de controle de distância ao UI
ui.addControl("distancemeasurement", distanceMeasurementTool);

// Permitir que o usuário interaja com o mapa (mover e dar zoom com o mouse)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// PESQUISAR
// Inicializando o serviço de geocodificação
var geocoder = platform.getSearchService();

// Variável para armazenar o marcador atual
let marcadorAtual = null;

// Definir a função para processar a resposta da geocodificação
var onResult = function(result) {
  if (result.items && result.items.length > 0) {
    var locations = result.items;
    var position, marker;

  // Remover o marcador anterior, se existir
  if (marcadorAtual) {
    map.removeObject(marcadorAtual);
  }

// Adicionar um marcador para cada localização encontrada
  for (var i = 0; i < locations.length; i++) {
    position = {
      lat: locations[i].position.lat,
      lng: locations[i].position.lng
    };

      // Centraliza o mapa na localização do resultado
      map.setCenter(position);

      // Cria e adiciona o novo marcador ao mapa
      marcadorAtual = new H.map.Marker(position);
      map.addObject(marcadorAtual); // Atualiza a variável do marcador atual
      break; // Adiciona apenas o primeiro marcador encontrado
    }
  }

  else {
   alert("Nenhum local encontrado!");
  }
};

// Função para realizar a pesquisa ao submeter o formulário
const form = document.getElementById('form');
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o recarregamento da página

  const input = document.getElementById("endereco").value.trim(); 

  // Se o input de pesquisar estiver vazio, dar um aviso  
  if (input === "") {
    alert("Você precisa digitar algum caractere!");
    return;
  }

  // Buscar somente por lugares no Brasil
  const endereco = input + ", Brazil"; 

  // Parâmetros de geocodificação
  var geocodingParams = {
    q: input // Usando o parâmetro correto para consulta de endereço
  };

  // Fazendo a chamada para o serviço de geocodificação
  geocoder.geocode(geocodingParams, onResult, function(e) {
    console.error(e); // Lida com erros na geocodificação
  });
});

// Pegar a localização do usuário
navigator.geolocation.getCurrentPosition()

function posicaoObtidaComSucesso(geolocalizacao){
  console.log(geolocalizacao);
}

function posicaoNaoPodeSerObtida(erro) {
  console.error(erro);
}

console.log(geolocalizacao);

function posicaoObtidaComSucesso(position) {
  const geolocalizacao = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
  };

  // Centraliza o mapa na localização do usuário
  map.setCenter(geolocalizacao);

    // Criar e adicionar o novo marcador
    marcadorAtual = new H.map.Marker(geolocalizacao);
    map.addObject(marcadorAtual);
    console.log(geolocalizacao);
}

/*
function buscarLocaisProximos(lat, lng) {
  const apikey = 'X2Kyj2pmTI3V9hUK0SzC7dLh0qQRK3-v29YDv8SDXaI';
  const categorias = 'restaurant';
  const url = `https://discover.search.hereapi.com/v1/discover?at=${lat},${lng}&q=${categorias}&limit=5&apikey=${apikey}`;
  const input = document.getElementById("endereco").value + ", Brazil";

  // Exibir os resultados
    console.log("Lugares encontrados:");
    data.items.forEach((item, index) => {
      console.log(`${index + 1}. Nome: ${item.title}`);
      console.log(`   Endereço: ${item.address.label}`);
      console.log(`   Distância: ${item.distance} metros`);
    });
  }

// Chamar a função de busca com a localização do usuário e uma categoria
buscarLocaisProximos(lat, lng, 'restaurants');

// Função para centralizar o mapa em uma localização
function centralizarMapa(localizacao) {
  if (localizacao) {
      map.setCenter(localizacao);
  } else {
      console.error("Localização inválida.");
  }
}

/*
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation);
  } else {
    alert("Geolocalização não é suportada neste navegador.");
  }
}

// Enviar dados da localização para o servidor
async function sendLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const categories = ['restaurant', 'hospital', 'pharmacy', 'ong']; // Categorias desejadas

  try {
    const response = await fetch('http://localhost:5500/nearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude, categories }),
    });

    const places = await response.json(); // Receber locais
    console.log("Locais próximos:", places);
    displayResults(places); // Exibir na página
    addMarkersToMap(places); // Adicionar ao mapa
  } catch (error) {
    console.error('Erro ao buscar serviços:', error);
  }
}

// Exibir resultados na página
function displayResults(places) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<h2>Resultados:</h2>';
  if (places.length > 0) {
    places.forEach((place, index) => {
      resultsDiv.innerHTML += `<p>${index + 1}. ${place.title} - ${place.address.label} - ${place.distance}m</p>`;
    });
  } else {
    resultsDiv.innerHTML += '<p>Nenhum resultado encontrado.</p>';
  }
}

function addMarkersToMap(places) {
  places.forEach(place => {
    const marker = new H.map.Marker({
      lat: place.position.lat,
      lng: place.position.lng,
    });

    // Informações no balão
    marker.setData(`<b>${place.title}</b><br>${place.address.label}`);
    marker.addEventListener('tap', function (evt) {
      const bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        content: evt.target.getData(),
      });
      ui.addBubble(bubble);
    });

    map.addObject(marker); // Adicionar ao mapa
  });
}
*/
