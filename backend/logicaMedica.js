// Configuración base del usuario (Autocompletado de UI y encabezados legales)
const configUTIDOL = {
    medicoTratante: "Dr. Gabriel Eduardo Andres Perez",
    especialidad: "Anestesiología y Manejo Intervencionista del Dolor",
    locacion: "Provincia de Buenos Aires (Zona Sur)",
    coberturasFrecuentes: ["OSDE"]
};

/**
 * Genera el prompt estructurado para la API de Gemini (Asistente Clínico)
 */
function generarPromptEpicrisisIA(datosPaciente, historialDolor, tratamientosPrevios) {
    return `
    Actúa como asistente médico experto. Genera una Epicrisis formal y un Resumen Clínico 
    para el paciente ${datosPaciente.nombre}, DNI ${datosPaciente.dni}.
    Cobertura: ${datosPaciente.cobertura}.
    Médico Tratante: ${configUTIDOL.medicoTratante} (${configUTIDOL.especialidad}).
    
    Historial Clínico (BPI y EVA): ${JSON.stringify(historialDolor)}
    Tratamientos Farmacológicos e Intervencionistas: ${JSON.stringify(tratamientosPrevios)}
    
    Estructura requerida:
    1. Motivo de consulta inicial.
    2. Antecedentes y banderas rojas evaluadas.
    3. Evolución del mapa de dolor.
    4. Esquema farmacológico actual (incluyendo justificación de coadyuvantes).
    5. Plan de tratamiento a futuro.
    Mantén un tono académico, objetivo y con terminología médica precisa.
    `;
}

/**
 * Calcula los puntajes del Brief Pain Inventory (BPI)
 */
function calcularScoreBPI(respuestasBPI) {
    // respuestasBPI contiene arrays del 0 al 10
    const severidad = (respuestasBPI.peorDolor + respuestasBPI.menorDolor + respuestasBPI.dolorPromedio + respuestasBPI.dolorActual) / 4;
    
    const interferencia = (
        respuestasBPI.actividadGeneral + respuestasBPI.estadoAnimo + 
        respuestasBPI.caminar + respuestasBPI.trabajoNormal + 
        respuestasBPI.relaciones + respuestasBPI.sueño + respuestasBPI.disfruteVida
    ) / 7;

    let categoriaSeveridad = severidad >= 7 ? "Severo" : (severidad >= 4 ? "Moderado" : "Leve");

    return {
        scoreSeveridad: severidad.toFixed(1),
        scoreInterferencia: interferencia.toFixed(1),
        categoria: categoriaSeveridad,
        alertaReevaluacion: severidad >= 7 ? "Reevaluar esquema analgésico de inmediato." : "Control habitual."
    };
}

/**
 * Motor de Banderas Rojas para Dolor Lumbar y Cefaleas Refractarias
 */
function evaluarBanderasRojas(tipoDolor, signosAlarma) {
    let alertas = [];
    let solicitarImagen = false;
    let urgencia = false;

    if (tipoDolor === "LUMBAR") {
        if (signosAlarma.incontinencia || signosAlarma.anestesiaSillaMontar) {
            alertas.push("🚨 SÍNDROME DE COLA DE CABALLO: Derivación a urgencias neuroquirúrgicas.");
            urgencia = true;
        }
        if (signosAlarma.perdidaPeso || signosAlarma.antecedenteCancer) {
            alertas.push("⚠️ RIESGO ONCOLÓGICO: Solicitar RMN con contraste.");
            solicitarImagen = true;
        }
    }

    if (tipoDolor === "CEFALEA") {
        if (signosAlarma.inicioSubito || signosAlarma.peorCefaleaDeSuVida) {
            alertas.push("🚨 CEFALEA EN TRUENO: Descartar hemorragia subaracnoidea. Derivación inmediata.");
            urgencia = true;
        }
        if (signosAlarma.signosFocalesNeurologicos || signosAlarma.edemaPapila) {
            alertas.push("⚠️ DÉFICIT FOCAL / HTE: Solicitar Neuroimagen urgente.");
            solicitarImagen = true;
        }
    }

    return { alertasGeneradas: alertas, requiereImagen: solicitarImagen, esUrgencia: urgencia };
}

/**
 * Recomendaciones de Protección Gástrica (AINEs)
 */
function requiereProteccionGastrica(edad, usoCorticoides, usoAnticoagulantes, antecedenteUlcera) {
    if (edad > 65 || usoCorticoides || usoAnticoagulantes || antecedenteUlcera) {
        return "🛡️ INDICACIÓN: Asociar IBP (ej. Omeprazol/Pantoprazol) por alto riesgo de sangrado gastrointestinal asociado a AINEs.";
    }
    return "Riesgo gastrointestinal bajo. Protección gástrica no obligatoria, a criterio clínico.";
}

/**
 * Seguridad Renal en Opioides
 */
function ajusteRenalOpioides(farmaco, filtradoGlomerular) {
    const droga = farmaco.toLowerCase();
    if (filtradoGlomerular < 30) { // Enfermedad Renal Crónica avanzada
        if (droga === "morfina" || droga === "codeina") {
            return "🛑 CONTRAINDICADO: Acumulación de metabolitos activos tóxicos. Rotar a Fentanilo, Metadona o Buprenorfina.";
        }
        if (droga === "tramadol" || droga === "oxicodona") {
            return "🟡 PRECAUCIÓN: Aumentar intervalo de dosis o reducir dosis al 50%.";
        }
    }
    return "✅ Fármaco seguro para el aclaramiento renal actual.";
}

/**
 * Rotación a Metadona (Simplificado de nuestro módulo previo)
 */
function calcularMetadona(omePrevio, dosisAlta) {
    let porcentajeReduccion = dosisAlta ? 0.10 : 0.50; // 90% o 50% de reducción
    let dosisTotal = omePrevio * porcentajeReduccion;
    return {
        dosisBasal: `${(dosisTotal / 3).toFixed(1)} mg cada 8 hs`,
        rescate: `${(dosisTotal / 6).toFixed(1)} mg`,
        alertaCardio: "⚠️ Solicitar ECG basal para medir QTc antes de iniciar."
    };
}

/**
 * Bioseguridad y Deprescripción de Coadyuvantes
 */
function evaluarCoadyuvante(droga, paciente) {
    let alertas = [];
    
    // Matriz de Contraindicaciones
    if ((droga === "amitriptilina" || droga === "venlafaxina") && paciente.arritmia) alertas.push("🛑 Evitar por riesgo cardiovascular.");
    if (droga === "duloxetina" && paciente.erc) alertas.push("🛑 Evitar en falla renal.");
    if (paciente.tomaTramadol && (droga === "duloxetina" || droga === "amitriptilina")) alertas.push("⚠️ Riesgo de Síndrome Serotoninérgico.");

    // Reloj de deprescripción a los 6 meses
    let hoy = new Date();
    let fechaRetiro = new Date(hoy.setMonth(hoy.getMonth() + 6));

    return { 
        alertasBioseguridad: alertas, 
        fechaDeprescripcion: fechaRetiro.toISOString().split('T')[0],
        mensajeRetiro: "Planificar desescalada a los 6 meses para evitar polifarmacia crónica."
    };
}

/**
 * Escala Columbia y Banderas Rojas Conductuales
 */
function evaluarRiesgoSuicida(conducta, columbia) {
    if (conducta.llantoEspontaneo || conducta.desesperanzaVerbal) {
        return "🚨 ALTO RIESGO CONDUCTUAL: Forzar C-SSRS en consultorio. No dejar al paciente solo.";
    }
    if (columbia.q4 || columbia.q5 || columbia.q6) { // Intención, Plan o Conducta
        return "🚨 EMERGENCIA PSIQUIÁTRICA: Derivación inmediata y bloqueo de recetas letales.";
    }
    if (columbia.q3) return "🟡 RIESGO MODERADO: Interconsulta a Salud Mental (24-72hs).";
    
    return "🟢 Riesgo Bajo/Nulo. Continuar manejo del dolor.";
}

/**
 * Justificador Médico-Legal para Procedimientos Intervencionistas
 */
function justificarIntervencionismo(sindrome, tiempoEvolucionMeses, conservadorFallido, evaActual) {
    if (tiempoEvolucionMeses >= 3 && conservadorFallido && evaActual >= 6) {
        return `✅ Criterios Cumplidos para ${sindrome}. 
        Justificación: Paciente con dolor crónico (>3 meses), refractario a tratamiento médico conservador optimizado, con impacto funcional severo (EVA ${evaActual}). 
        Se autoriza avanzar con módulo intervencionista (Ej. Bloqueos facetarios, Inyecciones epidurales o Radiofrecuencia) para validación de cobertura.`;
    } else {
        return "❌ Criterios insuficientes. Se requiere agotar instancia de tratamiento farmacológico/kinesiológico antes de escalar a intervencionismo o el dolor actual no justifica el riesgo quirúrgico.";
    }
}

// Exportar todas las funciones para que el resto de la app pueda usarlas
module.exports = {
    generarPromptEpicrisisIA,
    calcularScoreBPI,
    evaluarBanderasRojas,
    requiereProteccionGastrica,
    ajusteRenalOpioides,
    calcularMetadona,
    evaluarCoadyuvante,
    evaluarRiesgoSuicida,
    justificarIntervencionismo
};
