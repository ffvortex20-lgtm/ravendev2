let acoes = [];

function addAcao() {
  const id = Date.now();
  acoes.push({ id });

  document.getElementById("acoes").innerHTML += `
  <div class="acao" id="${id}">
    <select class="plat">
      <option value="">Plataforma</option>
      <option>youtube</option>
      <option>tiktok</option>
      <option>kwai</option>
      <option>instagram</option>
      <option>whatsapp_grupo</option>
      <option>whatsapp_canal</option>
    </select>

    <select class="tipo">
      <option value="">Tipo de Ação</option>
      <option>primeiro</option>
      <option>seguir</option>
      <option>inscrever</option>
      <option>entrar</option>
    </select>

    <input class="url" placeholder="URL da Ação">
    <button onclick="remover(${id})">🗑</button>
  </div>`;
}

function remover(id) {
  document.getElementById(id).remove();
  acoes = acoes.filter(a => a.id !== id);
}

function gerar() {
  const titulo = document.getElementById("titulo").value;
  const destino = document.getElementById("destino").value;

  if (!titulo || !destino || acoes.length === 0) {
    alert("Preencha tudo");
    return;
  }

  const dados = [];
  document.querySelectorAll(".acao").forEach(a => {
    dados.push({
      plataforma: a.querySelector(".plat").value,
      tipo: a.querySelector(".tipo").value,
      url: a.querySelector(".url").value
    });
  });

  const payload = btoa(JSON.stringify({
    titulo,
    destino,
    acoes: dados
  }));

  const base = location.origin + location.pathname.replace("index.html","");
  const link = `${base}unlock.html?d=${payload}`;

  document.getElementById("resultado").innerHTML =
    `<a href="${link}" target="_blank">${link}</a>`;
}
