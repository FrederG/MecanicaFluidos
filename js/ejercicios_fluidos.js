console.log("💧 Script de ejercicios Fluidos conectado correctamente con FastAPI en Railway");

// ------------------------------
// CONFIGURACIÓN
// ------------------------------
const API_URL = "https://ravishing-charisma-production-e81c.up.railway.app";
let nombreUsuario = "invitado";

try {
  const userData = JSON.parse(localStorage.getItem("usuario"));
  nombreUsuario = userData?.nombre || "invitado";
} catch (e) {
  console.warn("Usuario no válido en localStorage");
}

let ejercicioActual = 0;
const ejercicios = document.querySelectorAll(".ejercicio");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const contador = document.getElementById("contador");

// ------------------------------
// Navegación entre ejercicios
// ------------------------------
function mostrarEjercicio(index) {
  ejercicios.forEach((ej, i) => {
    ej.style.display = i === index ? "block" : "none";
  });
  contador.textContent = `Ejercicio ${index + 1} de ${ejercicios.length}`;
  btnAnterior.disabled = index === 0;
  btnSiguiente.disabled = index === ejercicios.length - 1;
}

btnAnterior.addEventListener("click", () => {
  if (ejercicioActual > 0) {
    ejercicioActual--;
    mostrarEjercicio(ejercicioActual);
  }
});

btnSiguiente.addEventListener("click", () => {
  if (ejercicioActual < ejercicios.length - 1) {
    ejercicioActual++;
    mostrarEjercicio(ejercicioActual);
  }
});

mostrarEjercicio(ejercicioActual);

// ------------------------------
// Verificar y enviar respuestas
// ------------------------------
async function verificarRespuesta(preguntaId, event) {
  event?.preventDefault();

  const input = document.getElementById(`respuesta${preguntaId}`);
  const resultado = document.getElementById(`resultado${preguntaId}`);

  const respuesta = input.value.trim();
  if (!respuesta) {
    resultado.textContent = "⚠️ Escribe una respuesta antes de enviar.";
    resultado.style.color = "orange";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/guardar_resultado/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario: nombreUsuario,
        ejercicio: preguntaId,
        respuesta: respuesta
      })
    });

    const data = await response.json();

    resultado.textContent = data.mensaje || "Sin respuesta del servidor.";

    if (data.estado === "correcto") {
      resultado.style.color = "#4CAF50";
    } else if (data.estado === "cercano") {
      resultado.style.color = "#FFC107";
    } else {
      resultado.style.color = "#F44336";
    }

    if (data.puntaje_total !== undefined) {
      const total = document.getElementById("puntajeTotal");
      if (total) total.textContent = `Puntaje total: ${data.puntaje_total}`;
    }
  } catch (error) {
    console.error("❌ Error al conectar con FastAPI:", error);
    resultado.textContent = "Error al conectar con el servidor.";
    resultado.style.color = "red";
  }
}
