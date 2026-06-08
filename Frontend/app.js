// Archivo: Frontend/app.js
async function calcular() {
    // 1. Capturamos los datos de la pantalla
    const dosis = document.getElementById('dosisMorfina').value;
    const esAlta = document.getElementById('checkDosisAlta').checked;

    if (!dosis) {
        alert("Por favor, ingrese la dosis de morfina.");
        return;
    }

    // 2. Preparamos el paquete de datos
    const paqueteDatos = {
        dosisMorfina: parseFloat(dosis),
        dosisAlta: esAlta
    };

    try {
        // 3. Enviamos los datos al backend (puerto 3000)
        const respuesta = await fetch('http://localhost:3000/api/metadona', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paqueteDatos)
        });

        // 4. Recibimos el cálculo
        const datosMedicos = await respuesta.json();

        // 5. Mostramos el resultado en la pantalla
        const cajaResultado = document.getElementById('resultado');
        cajaResultado.style.display = 'block';
        cajaResultado.innerHTML = `
            <strong>Dosis Basal:</strong> ${datosMedicos.dosisBasal}<br>
            <strong>Rescate:</strong> ${datosMedicos.rescate}<br>
            <span style="color: red;">${datosMedicos.alertaCardio}</span>
        `;
    } catch (error) {
        alert("Error al conectar con el servidor UTIDOL.");
        console.error(error);
    }
}
