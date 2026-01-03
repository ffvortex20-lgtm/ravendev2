function encodeUTF8(obj) {
  return btoa(
    encodeURIComponent(JSON.stringify(obj))
  );
}

let acoesCount = 0;

function addAcao() {
  acoesCount++;

  const div = document.createElement("div");
  div.className = "acao";
  div.innerHTML = `
    <select class="plat">
      <option value="">Plataforma</option>
      <option value="youtube">YouTube</option>
      <option value="tiktok">TikTok</option>
      <option value="kwai">Kwai</option>
      <option value="instagram">Instagram</option>
      <option value="whatsapp_grupo">WhatsApp Grupo</option>
      <option value="whatsapp_canal">WhatsApp Canal</option>
    </select>

    <select class="tipo">
      <option value="">Tipo de Ação</option>
      <option value="seguir">Seguir</option>
      <option value="inscrever">Inscrever</option>
      <option value="entrar">Entrar</option>
    </select>

    <input class="url" placeholder="URL da ação (https://)">
    <button onclick="this.parentElement.remove()">🗑</button>
  `;

  document.getElementById("acoes").appendChild(div);
}

function copiarTexto(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

function gerar() {
  const titulo = document.getElementById("titulo").value.trim();
  const destino = document.getElementById("destino").value.trim();

  if (!titulo || !destino) {
    alert("Preencha o título e o destino final");
    return;
  }

  const acoes = [];
  document.querySelectorAll(".acao").forEach(a => {
    const plat = a.querySelector(".plat").value;
    const tipo = a.querySelector(".tipo").value;
    const url = a.querySelector(".url").value;

    if (!plat || !tipo || !url.startsWith("http")) return;

    acoes.push({ plat, tipo, url });
  });

  if (acoes.length === 0) {
    alert("Adicione pelo menos uma ação válida");
    return;
  }

  const payload = encodeUTF8({
    titulo,
    destino,
    acoes
  });

  const base =
    location.origin + location.pathname.replace("index.html", "");

  const link = `${base}unlock.html?d=${payload}`;

  copiarTexto(link);

  document.getElementById("resultado").innerHTML = `
    <strong>Link gerado e copiado:</strong><br>
    <a href="${link}" target="_blank">${link}</a>
  `;
}
