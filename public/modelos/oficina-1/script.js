const $ = (s) => document.querySelector(s);
const dialogo = $('#zap');
const abrir = (msg, titulo = 'Aqui abriria o WhatsApp da oficina') => {
  $('#zap-t').textContent = titulo;
  $('#zap-msg').textContent = msg;
  dialogo.showModal();
};
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-zap]');
  if (b) abrir(b.dataset.zap, b.dataset.titulo);
  else if (e.target === dialogo) dialogo.close();
});

const menu = $('#menu'), menuBtn = $('#menu-btn');
const mostrarMenu = (v) => {
  menu.hidden = !v;
  menuBtn.setAttribute('aria-expanded', v);
  menuBtn.setAttribute('aria-label', v ? 'Fechar menu' : 'Abrir menu');
};
menuBtn.addEventListener('click', () => mostrarMenu(menu.hidden));
menu.addEventListener('click', (e) => e.target.closest('a') && mostrarMenu(false));

$('#filtros')?.addEventListener('click', (e) => {
  const b = e.target.closest('[data-filtro]');
  if (!b) return;
  document.querySelectorAll('[data-filtro]').forEach((x) => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('[data-cat]').forEach((c) => (c.hidden = b.dataset.filtro !== 'todos' && c.dataset.cat !== b.dataset.filtro));
});

const form = $('#orcamento');
if (form) {
  const sel = form.servico;
  const estimativa = () => ($('#estimativa').textContent = sel.selectedOptions[0].dataset.est);
  const escolher = (id) => {
    if ([...sel.options].some((o) => o.value === id)) sel.value = id;
    estimativa();
  };
  sel.addEventListener('change', estimativa);
  escolher(new URLSearchParams(location.search).get('servico'));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-servico]');
    if (!a) return;
    e.preventDefault();
    escolher(a.dataset.servico);
    $('#agendamento').scrollIntoView();
  });
  form.fone.addEventListener('input', () => {
    const d = form.fone.value.replace(/\D/g, '').slice(0, 11);
    const corte = d.length > 10 ? 7 : 6;
    form.fone.value = d.length <= 2 ? d : d.length <= 6 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}`;
  });
  const regras = {
    nome: [(v) => v.trim().length >= 3, 'Informe seu nome.'],
    fone: [(v) => v.replace(/\D/g, '').length >= 10, 'Informe o WhatsApp com DDD.'],
    carro: [(v) => v.trim().length >= 4, 'Informe o modelo e o ano do carro.'],
  };
  const validar = (c) => {
    const ok = regras[c][0](form[c].value);
    $(`#${c}-erro`).textContent = ok ? '' : regras[c][1];
    form[c].setAttribute('aria-invalid', !ok);
    return ok;
  };
  Object.keys(regras).forEach((c) => form[c].addEventListener('input', () => form[c].hasAttribute('aria-invalid') && validar(c)));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalidos = Object.keys(regras).filter((c) => !validar(c));
    if (invalidos.length) return form[invalidos[0]].focus();
    abrir(`Olá, Rodalume! Sou ${form.nome.value.trim()}.\nCarro: ${form.carro.value.trim()}\nServiço: ${sel.selectedOptions[0].text}\nPeríodo: ${form.periodo.value}${form.obs.value.trim() ? '\nO que acontece: ' + form.obs.value.trim() : ''}\nMeu WhatsApp: ${form.fone.value}`);
  });
}
