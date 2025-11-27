document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://ravishing-charisma-production-e81c.up.railway.app/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ correo, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    window.location.href = "index.html";
  } else {
    alert(data.detail);
  }
});
