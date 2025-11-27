document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaResultados");

  fetch("https://ravishing-charisma-production-e81c.up.railway.app/resultados/")
    .then((res) => res.json())
    .then((data) => {
      tabla.innerHTML = "";

      if (data.length === 0) {
        tabla.innerHTML = `<tr><td colspan="6">No hay resultados aún</td></tr>`;
        return;
      }

      data.forEach((item) => {
        const fila = `
          <tr>
            <td>${item.usuario || "Invitado"}</td>
            <td>${item.ejercicio}</td>
            <td>${item.respuesta}</td>
            <td>${item.estado}</td>
            <td>${item.puntaje}</td>
            <td>${item.fecha}</td>
          </tr>`;
        tabla.innerHTML += fila;
      });
    })
    .catch(() => {
      tabla.innerHTML = `<tr><td colspan="6">⚠️ Error al cargar datos.</td></tr>`;
    });
});
