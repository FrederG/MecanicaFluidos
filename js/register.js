document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://127.0.0.1:8000/registro", {
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
