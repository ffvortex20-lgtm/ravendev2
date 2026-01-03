function copiar(texto) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto);
  } else {
    const t = document.createElement("textarea");
    t.value = texto;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
}

function encodeUTF8(obj) {
  return btoa(encodeURIComponent(JSON.stringify(obj)));
}

function gerar() {
  const titulo = document.getElementById("titulo")?.value || "";
  const destino = document.getElementById("destino")?.value || "";

  if (!titulo.trim() || !destino.trim()) {
    alert("Preencha o título e o link final");
    return;
  }

  const acoes = [];

  // 🔥 AQUI ESTÁ A CORREÇÃO
  document.querySelectorAll("input, select").forEach((el, i) => {
    if (el.type === "url" || el.placeholder?.includes("http")) {
      const url = el.value.trim();
      if (!url) return;

      // tenta achar selects próximos (layout antigo ou novo)
      const parent = el.closest("div") || document;
      const plat =
        parent.querySelector("select")?.value || "Ação";
      const tipo =
        parent.querySelectorAll("select")[1]?.value || "abrir";

      acoes.push({ plat, tipo, url });
    }
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

  copiar(link);

  document.getElementById("resultado").innerHTML = `
    <strong>Link gerado e copiado:</strong><br>
    <a href="${link}" target="_blank">${link}</a>
  `;
}
