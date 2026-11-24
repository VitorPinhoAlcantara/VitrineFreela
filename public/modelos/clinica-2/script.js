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

const trilho = $('.trilho');
document.querySelectorAll('[data-passo]').forEach((b) => b.addEventListener('click', () => trilho.scrollBy({ left: b.dataset.passo * (trilho.firstElementChild.offsetWidth + 24), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })));

const TRAT = [{"id":"consulta","nome":"Consulta e mapeamento facial","preco":280,"min":45,"prof":["camila","lucas","helena"]},{"id":"laser","nome":"Laser para manchas e textura","preco":890,"min":45,"prof":["lucas","camila"]},{"id":"toxina","nome":"Toxina botulínica","preco":1250,"min":40,"prof":["camila","lucas"]},{"id":"bioestimulador","nome":"Bioestimulador de colágeno","preco":1950,"min":60,"prof":["camila","lucas"]},{"id":"ultrassom","nome":"Ultrassom microfocado","preco":2400,"min":75,"prof":["camila","helena"]},{"id":"corporal","nome":"Drenagem e firmeza corporal","preco":320,"min":60,"prof":["helena"]}];
const EQUIPE = [{"id":"camila","nome":"Dra. Camila Vasconcelos","unidades":["jardins","atalaia"]},{"id":"lucas","nome":"Dr. Lucas Nogueira","unidades":["jardins"]},{"id":"helena","nome":"Helena Prado","unidades":["jardins","atalaia"]}];
const UNID = [{"id":"jardins","nome":"Jardins","end":"Rua das Amendoeiras, 310, Jardins, Aracaju"},{"id":"atalaia","nome":"Atalaia","end":"Rua do Farol Velho, 95, Atalaia, Aracaju"}];

const CHAVE = 'modelo-clinica-2-reservas';
const lerReservas = () => {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};
const gravarReservas = (v) => {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(v));
  } catch {}
};
const minutos = (h) => h.slice(0, 2) * 60 + +h.slice(3);
const sobrepoe = (a, durA, b, durB) => minutos(a) < minutos(b) + durB && minutos(b) < minutos(a) + durA;

const proximosDias = (n) => {
  const dias = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (dias.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    const iso = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map((x) => String(x).padStart(2, '0')).join('-');
    const f = (o) => d.toLocaleDateString('pt-BR', o).replace('.', '');
    dias.push({ iso, sem: f({ weekday: 'short' }), dia: f({ day: '2-digit', month: 'short' }).replace(' de ', ' '), longo: d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) });
  }
  return dias;
};
const horarios = (iso, prof, dur) => {
  const sabado = new Date(`${iso}T12:00:00`).getDay() === 6;
  const base = sabado ? ['09:00', '10:15', '11:30', '12:45'] : ['09:00', '10:15', '11:30', '13:30', '14:45', '16:00', '17:15', '18:15'];
  const semente = [...`${iso}-${prof}`].reduce((a, c) => a + c.charCodeAt(0), 0);
  const minhas = lerReservas().filter((r) => r.iso === iso && r.prof === prof);
  return base.map((hora, i) => ({ hora, livre: (semente + i * 7) % 5 !== 0 && !minhas.some((r) => sobrepoe(hora, dur, r.hora, r.min)) }));
};

const form = $('#agenda');
if (form) {
  const invalidos = prepararForm(form);
  const dias = proximosDias(10);
  const q = new URLSearchParams(location.search);
  const marcar = (nome, valor) => {
    const op = [...form.elements[nome]].find((x) => x.value === valor);
    if (op) op.checked = true;
  };
  ['tratamento', 'unidade', 'profissional'].forEach((n) => marcar(n, q.get(n)));
  const pedida = EQUIPE.find((p) => p.id === q.get('profissional'));
  if (pedida && !q.get('tratamento')) marcar('tratamento', TRAT.find((t) => t.prof.includes(pedida.id)).id);
  $('#dias').innerHTML = dias.map((d, i) => `<label class="op"><input type="radio" name="dia" value="${d.iso}"${i ? '' : ' checked'}><span><small>${d.sem}</small><b>${d.dia}</b></span></label>`).join('');

  const atual = () => {
    const v = (n) => form.elements[n].value;
    return { t: TRAT.find((x) => x.id === v('tratamento')), u: UNID.find((x) => x.id === v('unidade')), p: EQUIPE.find((x) => x.id === v('profissional')), d: dias.find((x) => x.iso === v('dia')), hora: form.querySelector('[name=hora]:checked')?.value || '' };
  };
  const resumo = () => {
    const { t, u, p, d, hora } = atual();
    $('#r-trat').textContent = t.nome;
    $('#r-unid').textContent = u.nome;
    $('#r-prof').textContent = p.nome;
    $('#r-data').textContent = d.longo;
    $('#r-hora').textContent = hora || 'a escolher';
    $('#r-min').textContent = `${t.min} min`;
    $('#r-preco').textContent = `R$ ${t.preco.toLocaleString('pt-BR')}`;
  };
  const atualizar = () => {
    const { t, u, hora: antes } = atual();
    const ops = [...form.elements.profissional];
    ops.forEach((op) => {
      const p = EQUIPE.find((x) => x.id === op.value);
      op.disabled = !(t.prof.includes(p.id) && p.unidades.includes(u.id));
      op.closest('.op').hidden = op.disabled;
    });
    if (!ops.some((o) => o.checked && !o.disabled)) ops.find((o) => !o.disabled).checked = true;
    const { p, d } = atual();
    const lista = horarios(d.iso, p.id, t.min);
    $('#horas-t').textContent = lista.some((h) => h.livre) ? `Horários com ${p.nome} em ${d.longo}` : `Sem horário livre com ${p.nome} em ${d.longo}. Tente outro dia.`;
    $('#horas').innerHTML = lista.map((h) => `<label class="op"><input type="radio" name="hora" value="${h.hora}"${h.livre ? '' : ' disabled'}${h.livre && h.hora === antes ? ' checked' : ''}><span><b>${h.hora}</b><small>${h.livre ? 'Livre' : 'Ocupado'}</small></span></label>`).join('');
    resumo();
  };
  form.addEventListener('change', (e) => {
    if (e.target.name === 'hora') {
      $('#hora-erro').textContent = '';
      resumo();
    } else if (e.target.type === 'radio') atualizar();
  });
  atualizar();

  let reserva = null;
  const mostrar = (ok) => {
    form.hidden = ok;
    $('#agenda-cab').hidden = ok;
    $('#ok').hidden = !ok;
    scrollTo({ top: 0, behavior: 'instant' });
    if (ok) $('#ok').focus({ preventScroll: true });
    else atualizar();
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { t, u, p, d, hora } = atual();
    const livre = horarios(d.iso, p.id, t.min).some((h) => h.hora === hora && h.livre);
    $('#hora-erro').textContent = livre ? '' : 'Escolha um horário livre.';
    const ruins = invalidos();
    if (!livre) {
      if (hora) atualizar();
      const primeiro = form.querySelector('[name=hora]:not(:disabled)') || form.querySelector('[name=dia]:checked');
      return primeiro.focus();
    }
    if (ruins.length) return form[ruins[0]].focus();
    reserva = { cod: `TZ-${Math.floor(1000 + Math.random() * 9000)}`, iso: d.iso, hora, min: t.min, prof: p.id, t, u, p, d, nome: form.nome.value.trim(), fone: form.fone.value };
    gravarReservas([...lerReservas(), { cod: reserva.cod, iso: d.iso, hora, min: t.min, prof: p.id }]);
    $('#ok-cod').textContent = `Reserva ${reserva.cod}`;
    $('#ok-txt').textContent = `${reserva.nome}, esperamos você na unidade ${u.nome}.`;
    $('#ok-dl').replaceChildren(...[['Tratamento', t.nome], ['Dia e horário', `${d.longo}, ${hora}`], ['Profissional', p.nome], ['Endereço', u.end]].map(([a, b]) => {
      const div = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = a;
      dd.textContent = b;
      div.append(dt, dd);
      return div;
    }));
    mostrar(true);
  });
  $('#outra').addEventListener('click', () => mostrar(false));
  $('#cancelar').addEventListener('click', () => {
    gravarReservas(lerReservas().filter((r) => r.cod !== reserva.cod));
    mostrar(false);
  });
  $('#ok-zap').addEventListener('click', () => abrir(`Olá, Tezaflor! Minha reserva é a ${reserva.cod}.\nNome: ${reserva.nome}\nTratamento: ${reserva.t.nome}\nProfissional: ${reserva.p.nome}\nUnidade: ${reserva.u.nome}\nDia: ${reserva.d.longo}, às ${reserva.hora}`));
  $('#ics').addEventListener('click', () => {
    const inicio = new Date(`${reserva.iso}T${reserva.hora}:00`);
    const carimbo = (x) => x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const txt = (s) => s.replace(/[\\;,]/g, '\\$&');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Tezaflor//Modelo//PT', 'BEGIN:VEVENT', `UID:${reserva.cod}@tezaflor.example`, `DTSTAMP:${carimbo(new Date())}`, `DTSTART:${carimbo(inicio)}`, `DTEND:${carimbo(new Date(+inicio + reserva.min * 60000))}`, `SUMMARY:${txt(`${reserva.t.nome} na Tezaflor Estética`)}`, `LOCATION:${txt(reserva.u.end)}`, 'END:VEVENT', 'END:VCALENDAR', ''].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    a.download = `${reserva.cod}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
  });
}
