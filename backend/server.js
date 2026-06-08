// Archivo: backend/server.js
const express = require('express');
const cors = require('cors');
const utidol = require('./logicaMedica.js'); // Tu cerebro médico

const app = express();
app.use(express.json());
app.use(cors());

// Ruta de la API para calcular la metadona
app.post('/api/metadona', (req, res) => {
    const dosisMorfina = req.body.dosisMorfina;
    const dosisAlta = req.body.dosisAlta;

    // Llamamos a tu algoritmo
    const resultado = utidol.calcularMetadona(dosisMorfina, dosisAlta);
    
    // Devolvemos el resultado a la pantalla
    res.json(resultado);
});

app.listen(3000, () => {
    console.log('Servidor UTIDOL encendido en el puerto 3000 🚀');
});
