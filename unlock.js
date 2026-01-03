function decodeUTF8(str) {
  try {
    return JSON.parse(
      decodeURIComponent(atob(str))
    );
  } catch (e) {
    alert("Link inválido ou corrompido");
    location.href = "index.html";
  }
}

const param = new URLSearchParams(window.location.search).get("d");
if (!param) {
  alert("Link inválido");
  location.href = "index.html";
}

const data = decodeUTF8(param);

let passo = 0;

const titulo = document.getElementById("titulo");
const info = document.getElementById("info");
const btn = document.getElementById("acaoBtn");

titulo.innerText = data.titulo;

function proximaAcao() {
  if (passo >= data.acoes.length) {
    window.location.href = data.destino;
    return;
  }

  const acao = data.acoes[passo];
  info.innerText = `Ação ${passo + 1} de ${data.acoes.length}`;

  btn.innerText = `Abrir ${acao.plat}`;
  btn.disabled = false;

  btn.onclick = () => {
    window.open(acao.url, "_blank");
    btn.disabled = true;

    setTimeout(() => {
      passo++;
      proximaAcao();
    }, 2500); // antibot
  };
}

proximaAcao();
