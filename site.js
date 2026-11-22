const painel = document.querySelector('#cookies');
const preferencias = document.querySelector('#preferencias');
const chave = 'studio-ho-cookie-preference';
const validade = 180 * 24 * 60 * 60 * 1000;

function mostrar(focar = false) {
  painel.hidden = false;
  document.body.classList.add('cookies-abertos');
  if (focar) painel.querySelector('h2').focus();
}

let escolha;
try {
  escolha = JSON.parse(localStorage.getItem(chave));
  if (escolha && escolha.expira <= Date.now()) localStorage.removeItem(chave);
} catch {
  // O site continua funcionando quando o navegador bloqueia o armazenamento.
}

preferencias.hidden = false;
if (!escolha || !(escolha.expira > Date.now()) ||
    !['aceito', 'recusado'].includes(escolha.opcao)) mostrar();

preferencias.addEventListener('click', () => mostrar(true));
painel.querySelectorAll('[data-cookie]').forEach((botao) => {
  botao.addEventListener('click', () => {
    try {
      localStorage.setItem(chave, JSON.stringify({
        opcao: botao.dataset.cookie,
        expira: Date.now() + validade
      }));
    } catch {
      // A escolha vale para a página aberta quando não é possível salvá-la.
    }
    painel.hidden = true;
    document.body.classList.remove('cookies-abertos');
    preferencias.focus({ preventScroll: true });
  });
});
