const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5500;
const API_KEY = 'X2Kyj2pmTI3V9hUK0SzC7dLh0qQRK3-v29YDv8SDXaI';

app.use(cors());
app.use(express.json());

// Buscar locais por categoria
async function fetchPlacesByCategory(latitude, longitude, category) {
  const url = `https://discover.search.hereapi.com/v1/discover?at=${latitude},${longitude}&q=${category}&limit=5&apikey=${X2Kyj2pmTI3V9hUK0SzC7dLh0qQRK3-v29YDv8SDXaI}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items || [];
}

// Rota para buscar locais
app.post('/nearby', async (req, res) => {
  const { latitude, longitude, categories } = req.body;

  try {
    const results = await Promise.all(
      categories.map(category => fetchPlacesByCategory(latitude, longitude, category))
    );

    const allPlaces = results.flat(); // Combinar resultados
    res.json(allPlaces);
  } catch (error) {
    console.error('Erro ao buscar locais:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${5500}`);
});
