console.log('Iniciando aquecedor de chips...');

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// clientId vem da linha de comando: node aquecer.js chip1
const clientId = process.argv[2];

if (!clientId) {
  console.error('Uso: node aquecer.js <clientId>  (ex: node aquecer.js chip1)');
  process.exit(1);
}

// Carregar config
const configPath = path.join(__dirname, 'conversas.json');
if (!fs.existsSync(configPath)) {
  console.error('ERRO: arquivo conversas.json nao encontrado.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function escolherAleatorio(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Descobrir qual contato corresponde a este clientId
const meuContato = config.contatos.find((c) => c.id === clientId);
if (!meuContato) {
  console.error('ERRO: clientId', clientId, 'nao encontrado em conversas.json');
  process.exit(1);
}

// Lista de alvos: APENAS os outros chips de aquecimento
const alvos = config.contatos.filter((c) => c.id !== clientId);

if (alvos.length === 0) {
  console.error('ERRO: nao ha outros contatos para conversar com', clientId);
  process.exit(1);
}

// Sequencia fixa de delays em segundos: 30, 45, 60, 90, 120, 180...
const sequenciaDelaysSeg = [30, 45, 60, 90, 120, 180];
let indiceDelay = 0;

async function proximoDelay() {
  const seg = sequenciaDelaysSeg[indiceDelay];
  indiceDelay = (indiceDelay + 1) % sequenciaDelaysSeg.length;
  const ms = seg * 1000;
  console.log(
    `[${clientId}] aguardando ${(ms / 60000).toFixed(
      2
    )} min ate a proxima mensagem...\n`
  );
  await sleep(ms);
}

const client = new Client({
  authStrategy: new LocalAuth({ clientId }),
  puppeteer: {
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('\n========================================');
  console.log('Escaneie o QR para o clientId:', clientId);
  console.log('========================================\n');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('\n=== Autenticado (', clientId, ') ===\n');
});

client.on('auth_failure', (msg) => {
  console.error('\n*** FALHA NA AUTENTICACAO (', clientId, ') ***');
  console.error('Detalhes:', msg, '\n');
});

client.on('ready', async () => {
  console.log('\n=== Aquecedor pronto para', clientId, '===\n');
  console.log('Vai conversar apenas com os outros chips definidos em conversas.json.\n');

  while (true) {
    try {
      // Escolhe um dos outros chips como destinatario
      const alvo = escolherAleatorio(alvos);

      // Escolhe se manda pergunta ou resposta (mais chance de pergunta)
      const tipo = Math.random() < 0.6 ? 'perguntas' : 'respostas';
      const frases = config.mensagens[tipo] || [];
      if (!frases.length) {
        console.log('Nenhuma frase definida para tipo:', tipo);
        await sleep(60 * 1000);
        continue;
      }

      const texto = escolherAleatorio(frases);

      console.log(
        `[${clientId}] -> [${alvo.id}] (${alvo.numero}): ${texto}`
      );

      await client.sendMessage(alvo.numero, texto);

      // Usa a sequencia de delays: 30s, 45s, 60s, 90s, 120s, 180s...
      await proximoDelay();
    } catch (erro) {
      console.error(`[${clientId}] ERRO no loop:`, erro.message);
      // Espera 1 min antes de tentar de novo
      await sleep(60 * 1000);
    }
  }
});

client.on('disconnected', (reason) => {
  console.error('\n*** CLIENTE DESCONECTADO (', clientId, ') ***');
  console.error('Motivo:', reason);
  process.exit(1);
});

client.initialize().catch((err) => {
  console.error('Erro ao inicializar cliente:', err);
});
