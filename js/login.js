document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({correo, password})
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("usuario", JSON.stringify(data.usuario)); // <-- guardar objeto completo
    window.location.href = "index.html";
  } else {
    alert(data.detail);
  }
});
