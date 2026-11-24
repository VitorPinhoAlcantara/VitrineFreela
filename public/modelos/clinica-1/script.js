const $ = (s) => document.querySelector(s);
const dialogo = $('#zap');
const abrir = (msg, titulo = 'Aqui abriria o WhatsApp da clínica') => {
  $('#zap-t').textContent = titulo;
  $('#zap-msg').textContent = msg;
  dialogo.showModal();
};
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-zap]');
  if (b) abrir(b.dataset.zap, b.dataset.titulo);
  else if (e.target === dialogo) dialogo.close();
});

const menu = $('#menu'), menuBtn = $('.menu-btn');
const mostrarMenu = (v) => {
  menu.hidden = !v;
  menuBtn.setAttribute('aria-expanded', v);
  menuBtn.setAttribute('aria-label', v ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-aberto', v);
};
menuBtn.addEventListener('click', () => mostrarMenu(menu.hidden));
menu.addEventListener('click', (e) => e.target.closest('a') && mostrarMenu(false));
const rolar = () => document.body.classList.toggle('rolou', scrollY > 40);
addEventListener('scroll', rolar, { passive: true });
rolar();

const REGRAS = {
  nome: [(v) => v.trim().length >= 3, 'Informe seu nome.'],
  fone: [(v) => v.replace(/\D/g, '').length >= 10, 'Informe o WhatsApp com DDD.'],
  email: [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), 'Informe um e-mail válido.'],
};
const prepararForm = (form) => {
  const campos = Object.keys(REGRAS).filter((c) => form[c]);
  const validar = (c) => {
    const ok = REGRAS[c][0](form[c].value);
    $(`#${c}-erro`).textContent = ok ? '' : REGRAS[c][1];
    form[c].setAttribute('aria-invalid', !ok);
    return ok;
  };
  campos.forEach((c) => form[c].addEventListener('input', () => form[c].hasAttribute('aria-invalid') && validar(c)));
  form.fone.addEventListener('input', () => {
    const d = form.fone.value.replace(/\D/g, '').slice(0, 11);
    const corte = d.length > 10 ? 7 : 6;
    form.fone.value = d.length <= 2 ? d : d.length <= 6 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}`;
  });
  return () => campos.filter((c) => !validar(c));
};

const pedido = $('#pedido');
const invalidos = prepararForm(pedido);
pedido.addEventListener('submit', (e) => {
  e.preventDefault();
  const ruins = invalidos();
  if (ruins.length) return pedido[ruins[0]].focus();
  const obs = pedido.obs.value.trim();
  abrir(`Olá, Tezaflor! Sou ${pedido.nome.value.trim()}.\nProcuro: ${pedido.interesse.value}\nUnidade: ${pedido.unidade.value}${obs ? `\nMelhor horário: ${obs}` : ''}\nMeu WhatsApp: ${pedido.fone.value}`);
});
