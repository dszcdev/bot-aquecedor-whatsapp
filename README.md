# Bot Aquecedor de WhatsApp

Projeto em Node.js para aquecimento automático de chips de WhatsApp, simulando conversas humanas entre múltiplos números usando a biblioteca `whatsapp-web.js`.  
O objetivo é gerar histórico de uso natural (envio e recebimento de mensagens) antes de utilizar o número em campanhas mais pesadas.

---

## Visão geral

- Conversas automáticas entre números de aquecimento (chips) definidos em arquivo de configuração.
- Mensagens variadas em português e inglês, com emojis e temas diferentes para reduzir padrões.
- Intervalos de envio configurados em sequência crescente (30s, 45s, 1min, 1,5min, 2min, 3min), simulando ritmo humano.
- Cada instância do bot representa um chip, e todos conversam apenas entre si, sem envolver outros contatos da agenda.

---

## Tecnologias usadas

- **Node.js**
- **whatsapp-web.js**
- **qrcode-terminal**

---

## Estrutura de arquivos

- `aquecer.js`  
  Arquivo principal do bot aquecedor.  
  - Lê as configurações do `conversas.json`.  
  - Conecta ao WhatsApp com `LocalAuth` usando um `clientId` (chip1, chip2, etc.).  
  - Inicia um loop infinito enviando mensagens para outros chips de aquecimento.

- `conversas.json`  
  Arquivo de configuração das conversas.  
  - Define os chips que participam do aquecimento (`contatos`).  
  - Define as listas de mensagens de **perguntas** e **respostas**.  
  - Pode ser expandido com novos chips e novas frases a qualquer momento.

- `package.json`  
  Dependências e scripts do projeto em Node.js.

> Pastas de sessão (`.wwebjs_auth`, `.wwebjs_cache`) **não devem** ser versionadas.  
> Elas são criadas localmente pelo `whatsapp-web.js` após o login e ficam apenas na sua máquina.

---

## Arquivo de configuração (`conversas.json`)

Exemplo de configuração básica para dois chips:

```json
{
  "contatos": [
    { "id": "chip1", "numero": "5511954709483@c.us" },
    { "id": "chip2", "numero": "5511960621180@c.us" }
  ],
  "mensagens": {
    "perguntas": [
      "E ai, tudo certo por ai? 😊",
      "Boa tarde, como ta o dia por ai?",
      "Ta de boa ai hoje ou ta na correria? 😅",
      "Trabalhando muito ou ta tranquilo por enquanto?",
      "Ja viu as noticias hoje? 🤔",
      "Hey, how is your day going so far?",
      "Whats up? Tudo em paz por ai?",
      "Bom diaaa, ja tomou cafe? ☕",
      "Mano, viu aquele meme que mandei mais cedo? kkkkk",
      "Bro, are you ready for this week? 💪"
    ],
    "respostas": [
      "Tudo tranquilo e voce? 🙌",
      "Correria mas ta indo kkk 😅",
      "To de boa por enquanto, so acompanhando aqui.",
      "Rapaz, ta puxado hoje mas faz parte 😂",
      "Vi sim, ta complicado ne...",
      "Im fine, and you? 😄",
      "Tamo junto, qualquer coisa chama ai.",
      "Rachei de rir daquele meme kkkkk 🤣",
      "To cansado mas sobrevivendo kkk",
      "Yeah, looks like a busy week ahead 😅"
    ]
  }
}
contatos: lista de chips que vão participar do aquecimento.

id: identificador usado na linha de comando (chip1, chip2, chip3...).

numero: número completo do WhatsApp no formato DDI + DDD + número@c.us.

mensagens.perguntas e mensagens.respostas:

Listas de frases que serão escolhidas aleatoriamente a cada envio.

É recomendado ir adicionando novas frases com o tempo para aumentar a variedade.

Como instalar
Clonar o repositório:

bash
git clone https://github.com/dszcdev/bot-aquecedor-whatsapp.git
cd bot-aquecedor-whatsapp
Instalar as dependências:

bash
npm install
Como configurar os chips
Edite o arquivo conversas.json e ajuste a seção contatos com os números dos seus chips de aquecimento:

json
"contatos": [
  { "id": "chip1", "numero": "55DDDNUMERO1@c.us" },
  { "id": "chip2", "numero": "55DDDNUMERO2@c.us" }
]
Adicione mais chips se necessário:

json
{ "id": "chip3", "numero": "55DDDNUMERO3@c.us" }
Todos os chips listados irão conversar apenas entre si.

Como executar o aquecedor
Cada instância do bot representa um chip.
Abra um terminal para cada chip e execute:

bash
node aquecer.js chip1
Depois, em outro terminal:

bash
node aquecer.js chip2
Para o primeiro login de cada clientId:

Um QR Code será exibido no terminal.

Escaneie com o aplicativo WhatsApp do chip correspondente.

Após autenticado, o bot começa a enviar mensagens automaticamente para os outros chips configurados.

Lógica de envio
A cada iteração:

Escolhe um dos outros chips da lista como destinatário.

Decide aleatoriamente se envia uma pergunta ou resposta.

Escolhe uma frase aleatória da lista correspondente.

Aguarda um delay em sequência: 30s, 45s, 1min, 1,5min, 2min, 3min e repete o ciclo.

Isso cria um fluxo de conversa mais natural, com variação de tema, idioma e tempo de resposta.

Boas práticas e avisos
Use este projeto apenas em ambiente de testes ou para fins educacionais.

Evite volumes altos de mensagens em números novos para reduzir risco de bloqueio pelo WhatsApp.

Sempre mantenha espaço livre nos aparelhos (memória cheia pode derrubar a sessão do WhatsApp Web).

Nunca suba para o GitHub:

Pastas de sessão (.wwebjs_auth, .wwebjs_cache).

Prints ou arquivos com QR Code.

---

## Visual do projeto

<p align="center">
  <!-- Quando tiver um GIF ou imagem animada, troque o link abaixo -->
  <img src="https://raw.githubusercontent.com/dszcdev/bot-whatsapp-envio/main/.github/assets/animacao-exemplo.gif" alt="Animação do bot aquecedor em ação" width="480" />
</p>

<p align="center">
  <em>Em breve: animação/GIF mostrando os chips conversando entre si em tempo real.</em>
</p>

