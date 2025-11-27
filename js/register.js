document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://ravishing-charisma-production-e81c.up.railway.app/registro", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ nombre, correo, password })
  });

  const data = await res.json();

  if (res.ok) {
    alert("✅ Registro exitoso, ahora inicia sesión");
    window.location.href = "login.html";
  } else {
    alert(data.detail || "Error en el registro");
  }
});
