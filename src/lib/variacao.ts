export const whatsapp = 'https://wa.me/5579991360886?text=' + encodeURIComponent('Olá! Vim pelo site e quero um orçamento para: ');
export const whatsappLabel = '(79) 99136-0886';
export const emailEndereco = 'vitoralcantara1722@gmail.com';
export const email = `mailto:${emailEndereco}?subject=${encodeURIComponent('Orçamento')}`;
export const contato = whatsapp;
// Sem href, o botão aparece desativado. Colocar o href quando o modelo for publicado.
export const modelos = [
  { tipo: 'Site', nome: 'Oficina', texto: 'Serviços com preço, horário e botão de WhatsApp.', href: '/modelos/oficina-1/' },
  { tipo: 'Site', nome: 'Clínica', texto: 'Tratamentos, convênios e contato direto pelo WhatsApp.' },
  { tipo: 'Sistema', nome: 'Clínica', texto: 'Agenda online com confirmação e lembrete automático.' },
];

// Cases do portfólio público (alcantara.dev.br/api/v1/projects). Só projetos solo; Grafeno e FisioTrack ficam fora por serem de equipe.
export const cases = [
  {
    nome: 'StreetUrban',
    tipo: 'Loja de streetwear',
    texto: 'Catálogo com pedido pelo WhatsApp e um painel onde a loja cadastra produtos, preços e fotos sem depender de ninguém.',
    entregue: 'Site, painel administrativo e API',
    stack: 'React, NestJS, Prisma, Postgres, Docker',
    resultado: 'A loja cadastra produtos sozinha e recebe o pedido pronto no WhatsApp.',
    logo: '/img/cases/streeturban.webp', fundo: '#111111',
    link: { href: 'https://streeturban.com.br', label: 'Ver site' },
  },
  {
    nome: 'DevProfile',
    tipo: 'Portfólio com API própria',
    texto: 'Site bilíngue, painel e currículo em PDF gerados a partir dos mesmos dados, com deploy automático: muda num lugar, atualiza em todos.',
    entregue: 'Site, painel, API e gerador de PDF',
    stack: 'Next.js, NestJS, Prisma, Postgres, Docker',
    resultado: 'Um cadastro alimenta site, painel e currículo em PDF, em dois idiomas.',
    logo: '/img/cases/devprofile.svg', fundo: '#0e1420',
    link: { href: 'https://alcantara.dev.br', label: 'Ver site' },
  },
  {
    nome: 'MeuBolso',
    tipo: 'Controle financeiro',
    texto: 'Aplicação de finanças pessoais com login, separada em API e painel web.',
    entregue: 'API e painel web',
    stack: 'Java, Spring Boot, Vue, Postgres, MinIO',
    link: { href: 'https://github.com/VitorPinhoAlcantara/MeuBolso', label: 'Ver código' },
  },
  {
    nome: 'Impressão pelo WhatsApp',
    tipo: 'Automação',
    texto: 'Toda foto ou PDF enviado num grupo de WhatsApp é impresso sozinho. Feito para quem não tem intimidade com a impressora.',
    entregue: 'Automação rodando 24 horas',
    stack: 'Node.js, Linux',
    link: { href: 'https://github.com/VitorPinhoAlcantara/HomeAutomations', label: 'Ver código' },
  },
];

export const pessoais = [
  { nome: 'MeuBolso', texto: 'controle financeiro com API em Spring Boot e painel em Vue', href: 'https://github.com/VitorPinhoAlcantara/MeuBolso' },
  { nome: 'Impressão pelo WhatsApp', texto: 'foto ou PDF enviado num grupo é impresso sozinho', href: 'https://github.com/VitorPinhoAlcantara/HomeAutomations' },
];

export const planos = [
  { nome: 'Site', texto: 'Página para o seu negócio aparecer no Google e receber contato.', de: 'R$ 600', preco: 'R$ 400', mes: '+ R$ 60/mês', itens: ['Até 5 seções', 'Botão de WhatsApp', 'Pronto para celular'] },
  { nome: 'Catálogo', texto: 'Produtos com fotos e preço. O pedido chega pronto no WhatsApp.', de: 'R$ 1.200', preco: 'R$ 1.000', mes: '+ R$ 100/mês', itens: ['Painel para editar produtos', 'Carrinho e pedido', 'Domínio no seu nome'] },
  { nome: 'Sistema', texto: 'Agenda, cadastro ou painel que tira trabalho manual do dia a dia.', de: 'R$ 2.500', preco: 'R$ 2.000', mes: '+ R$ 150/mês', itens: ['Login e níveis de acesso', 'Lembretes automáticos', 'Banco de dados próprio'] },
  { nome: 'Automação', texto: 'Atendimento no WhatsApp que responde, agenda e encaminha sozinho.', preco: 'Depende do problema', mes: 'Orçamento em reunião', itens: ['Chatbot no WhatsApp Business', 'Respostas e catálogo automáticos', 'Integração com planilhas e sistemas'], reuniao: true },
];

export const sobMedida = { nome: 'Sob medida', texto: 'App, integração ou plataforma maior, fora dos pacotes. Escopo e preço definidos juntos, com entrega em etapas.', itens: ['Levantamento do problema', 'Entrega em etapas', 'Código e dados seus'] };

export const passos = [
  { t: 'Conversa', d: 'Você conta o problema e recebe escopo, prazo e preço por escrito, com um modelo quando houver um do seu tipo.' },
  { t: 'Contrato', d: 'Escopo fechado, 50% para começar e o restante na entrega. Nada de cobrança surpresa no meio.' },
  { t: 'Entrega', d: 'Publicado no seu domínio, com acesso a tudo. A mensalidade mantém no ar, seguro e atualizado.' },
];

export const garantias = [
  { t: 'Você vê antes de pagar', d: 'Modelo ou protótipo antes do contrato, sempre que o projeto permitir.' },
  { t: 'Tudo fica no seu nome', d: 'Domínio no Registro.br, código e dados são seus, mesmo se você sair.' },
  { t: 'Escopo por escrito', d: 'O contrato diz o que é ajuste e o que é projeto novo antes de começar.' },
];

export const faq = [
  { q: 'Fazem projetos grandes ou só sites simples?', a: 'Os dois. Os pacotes são pontos de partida; sistemas, apps e integrações são orçados pelo escopo, em etapas.' },
  { q: 'Com quem eu falo durante o projeto?', a: 'Direto com quem desenvolve, do orçamento à manutenção. Sem intermediário repassando recado.' },
  { q: 'O que a mensalidade cobre?', a: 'Hospedagem, segurança, correções e pequenos ajustes de texto, foto e preço.' },
  { q: 'O domínio e o código ficam comigo?', a: 'Sim. O domínio é registrado no seu nome e você tem acesso ao código e aos dados.' },
  { q: 'O robô substitui meu atendente?', a: 'Não. Ele responde o que se repete, como horário, preço e andamento do pedido, e passa a conversa para uma pessoa quando precisa.' },
  { q: 'Posso cancelar a mensalidade?', a: 'Pode, respeitando o período mínimo previsto no contrato, com aviso de pelo menos um mês e uma reunião para combinar a entrega do código e dos dados. Depois disso, a hospedagem passa a ser responsabilidade da sua empresa, e o domínio continua no seu nome.' },
  { q: 'Atende fora de Aracaju?', a: 'Sim. Todo o processo funciona por videochamada e WhatsApp.' },
];
