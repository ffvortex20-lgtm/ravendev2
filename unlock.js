const data = JSON.parse(atob(
  new URLSearchParams(location.search).get("d")
));

let passo = 0;

document.getElementById("titulo").innerText = data.titulo;

function executar() {
  if (passo >= data.acoes.length) {
    location.href = data.destino;
    return;
  }

  const acao = data.acoes[passo];
  document.getElementById("info").innerText =
    `Ação ${passo + 1} de ${data.acoes.length}`;

  const btn = document.getElementById("acaoBtn");
  btn.innerText = `Ir para ${acao.plataforma}`;
  btn.onclick = () => {
    window.open(acao.url, "_blank");
    passo++;
    setTimeout(executar, 2000); // antibot tempo
  };
}

executar();
