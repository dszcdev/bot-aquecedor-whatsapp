Segue o README do disparador, inteiro já numerado e organizado, pronto para colar no README.md:

text
# Bot Disparador de WhatsApp

Automação em Node.js para envio de mensagens em massa de forma controlada, lendo contatos e mensagens de planilhas e aplicando atrasos aleatórios para parecer o mais humano possível.

---

## 1. Visão geral

O bot disparador foi criado para campanhas de envio em lote, com foco em segurança, personalização e controle de ritmo.  
Ele lê uma planilha com contatos, monta mensagens personalizadas e envia texto e arquivos respeitando limites configuráveis.

- Baseado em **Node.js** com a biblioteca `whatsapp-web.js`.
- Ideal para uso após o aquecimento dos chips com o bot aquecedor.
- Pensado para ser simples de configurar e fácil de ajustar.

---

## 2. Estrutura do projeto

Nesta seção você enxerga a organização dos arquivos principais do disparador.  
Ela ajuda a entender rapidamente onde configurar planilha, arquivos e script de envio.

```text
bot-disparador-whatsapp/
├─ arquivos/              # PDFs, imagens, vídeos para envio
├─ Envios.xlsx            # Planilha com contatos e mensagens
├─ js/
│  └─ enviar.js           # Script principal de disparo
├─ package.json           # Dependências e scripts npm
├─ package-lock.json
└─ .gitignore
````

## 3. Pré-requisitos
Antes de rodar o bot, é importante garantir que o ambiente está preparado.
Com esses itens prontos, a configuração e a execução ficam bem mais tranquilas.

Node.js instalado (versão LTS recomendada).

Conta de WhatsApp ativa no celular.

Arquivo Envios.xlsx configurado com os contatos e mensagens.

Dependências instaladas com:

```bash
npm install
```

## 4. Planilha de envios (Envios.xlsx)
A planilha é o coração do disparador, pois é dela que o bot lê cada envio.
Cada linha representa um contato com suas próprias informações e, opcionalmente, um arquivo para anexar.

Campos recomendados:

Campo	Descrição
nome	Nome do contato utilizado na personalização da mensagem.
telefone	Número completo com DDI e DDD, apenas dígitos (ex: 5511999999999).
mensagem	Texto base que será enviado para o contato.
arquivo	Nome do arquivo dentro da pasta arquivos/ (ex: oferta.pdf).
Dica: se você usar a palavra fulano dentro da mensagem, o código substitui esse trecho automaticamente pelo valor do campo nome.

## 5. Como rodar o disparador
Aqui está o passo a passo para sair da configuração e partir para o envio.
Seguindo essa ordem, fica mais fácil evitar erros e entender onde algo pode ter falhado.

Confirme que Envios.xlsx está na raiz do projeto e com as colunas corretas.

Coloque todos os arquivos que serão enviados na pasta arquivos/.

No terminal, dentro da pasta do projeto, rode:

```bash
node js/enviar.js
No primeiro uso, será exibido um QR Code no terminal.
```

No WhatsApp do celular, vá em Aparelhos conectados e escaneie o QR.

Após a conexão, o bot começa a processar linha por linha da planilha, enviando mensagem e, quando configurado, o arquivo.

## 6. Delays e comportamento do disparo
Os delays são responsáveis por deixar o comportamento mais natural e menos “robótico”.
Eles controlam o tempo entre a mensagem de texto, o envio de arquivo e o próximo contato.

Exemplo de trechos de configuração de delay no código:

js
const delayAposMensagem = gerarDelayAleatorio(3, 7);     // segundos entre texto e arquivo
const delayAposArquivo = gerarDelayAleatorio(5, 10);     // segundos após envio de arquivo
const delayEntreContatos = gerarDelayAleatorio(60, 120); // segundos entre um contato e outro
Boas práticas ao ajustar:

Para números novos ou pouco aquecidos, use delays maiores.

Evite valores muito baixos em campanhas grandes.

Faça pequenos testes antes de usar em listas grandes.

## 7. Logs e acompanhamento
Enquanto o bot roda, ele mostra no terminal tudo o que está acontecendo.
Esses logs são essenciais para entender o fluxo e identificar qualquer problema.

Você verá informações como:

Contato atual (nome e telefone) sendo processado.

Mensagens enviadas com sucesso ou falhas.

Arquivo encontrado ou ausente na pasta arquivos/.

Tempo estimado de espera até o próximo contato.

Mensagens de erro com detalhes, quando acontecerem.

## 8. Integração com o aquecedor
O disparador funciona ainda melhor quando usado em conjunto com o bot aquecedor.
A ideia é não sair disparando em massa com números frios e sem histórico.

Fluxo recomendado:

Use o bot aquecedor para criar histórico de conversa nos chips.

Depois de alguns dias de aquecimento, inicie envios leves com o disparador.

Aumente o volume gradualmente, sempre monitorando respostas, bloqueios e métricas.

## 9. Boas práticas e responsabilidade
Automação com WhatsApp exige cuidado e responsabilidade.
Seguir boas práticas aumenta a durabilidade das contas e protege a reputação do seu número.

Respeite as políticas oficiais do WhatsApp.

Trabalhe com listas de contatos que aceitaram receber mensagens.

Evite spam e disparos agressivos em horários inadequados.

Proteja os dados pessoais armazenados nas planilhas e arquivos.

## 10. Fale comigo no WhatsApp

Se você quiser suporte, customização ou ajuda para adaptar este projeto ao seu cenário, pode falar diretamente comigo.  
Clique no botão abaixo para abrir uma conversa no WhatsApp:

[![WhatsApp - Clique aqui](https://img.shields.io/badge/WhatsApp-CLIQUE%20AQUI-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5511960621180)


## 11. Contribuição
Este projeto foi pensado para ser evolutivo e aberto a ideias.
Se você tiver sugestões, melhorias ou encontrar algum problema, sua contribuição é muito bem‑vinda.

Abra issues com dúvidas, ideias ou bugs.

Envie pull requests com melhorias de código ou documentação.

Faça um fork e crie sua própria versão, adaptando para o seu contexto.

Obrigado por acompanhar o desenvolvimento deste bot disparador.
Bons disparos, com consciência e estratégia! 🚀
