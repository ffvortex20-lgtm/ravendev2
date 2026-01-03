function addAcao() {
  const div = document.createElement("div");
  div.className = "acao";

  div.innerHTML = `
    <select class="plat">
      <option value="">Plataforma</option>
      <option>YouTube</option>
      <option>TikTok</option>
      <option>Kwai</option>
      <option>Instagram</option>
      <option>WhatsApp Grupo</option>
      <option>WhatsApp Canal</option>
    </select>

    <select class="tipo">
      <option value="abrir">Abrir</option>
    </select>

    <input class="url" type="url" placeholder="https://link.com">
  `;

  document.getElementById("acoes").appendChild(div);
}
