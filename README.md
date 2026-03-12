3. Pré-requisitos
Node.js instalado (versão LTS recomendada).

Conta(s) de WhatsApp ativas para usar no aquecedor.

Navegador atualizado para ler o QR Code na primeira conexão.

Instale as dependências:

bash
npm install
4. Arquivo conversas.json
Aqui você configura quem conversa com quem, quais mensagens são usadas e os intervalos de tempo.

Exemplo enxuto:

json
{
  "contatos": [
    { "id": "chip1", "numero": "5511999999999@c.us" },
    { "id": "chip2", "numero": "5511888888888@c.us" }
  ],
  "mensagens": {
    "perguntas": [
      "E aí, tudo certo por aí?",
      "Boa tarde, como tá o dia?",
      "Trabalhando muito ou tá tranquilo?"
    ],
    "respostas": [
      "Tudo tranquilo e você?",
      "Correria, mas tá indo kkk",
      "Tô de boa por enquanto"
    ]
  },
  "config": {
    "delayMinMinutos": 2,
    "delayMaxMinutos": 10
  }
}
contatos: lista de números que vão participar das conversas.

mensagens.perguntas e mensagens.respostas: variações para deixar o fluxo menos repetitivo.

config: intervalo mínimo e máximo entre mensagens (em minutos).

5. Como rodar o aquecedor
Com as dependências instaladas, rode:

bash
node js/aquecedor.js
No primeiro uso, o terminal vai mostrar um QR Code.

Abra o WhatsApp no celular, vá em Aparelhos conectados e escaneie o QR.

Depois de conectado, o bot começa a enviar/receber mensagens conforme o conversas.json.

Se fechar o terminal ou reiniciar a máquina, é só rodar o comando novamente e escanear (ou reaproveitar a sessão, se configurado com LocalAuth).

6. Configurações importantes (delays e comportamento)
No código do bot você encontrará funções responsáveis pelos delays e pelo comportamento mais humano, por exemplo:

js
function gerarDelayAleatorio(minSegundos, maxSegundos) {
  const min = minSegundos * 1000;
  const max = maxSegundos * 1000;
  return Math.floor(Math.random() * (max - min + 1) + min);
}
Algumas boas práticas ao ajustar:

Use delays maiores no início (mais “devagar” é mais seguro).

Evite valores fixos; sempre trabalhe com intervalo mínimo e máximo.

Simule pausas entre contatos, não dispare tudo em sequência.

7. Logs e acompanhamento
Durante a execução, o terminal mostra:

Contato atual sendo processado.

Número formatado que está recebendo mensagem.

Mensagens enviadas e possíveis erros.

Tempo de espera até o próximo contato.

Isso ajuda a entender o comportamento do bot e identificar qualquer problema rapidamente.

8. Próximos passos
Ajustar os delays conforme o perfil de uso e o risco que você aceita.

Testar o aquecedor em chips diferentes antes de escalar o volume.

Integrar este projeto ao disparador para campanhas completas de envio.

Criar novos scripts de conversa personalizados para cada público.

9. Boas práticas
Comece sempre com poucos contatos e aumente aos poucos.

Teste em ambiente controlado antes de colocar em produção.

Respeite as regras do WhatsApp e a privacidade dos usuários.

Mantenha dependências, Node.js e documentação atualizados.

10. Contribuição
Curtiu o projeto e quer melhorar algo?

Abra uma issue com dúvidas, ideias ou problemas encontrados.

Envie pull requests com melhorias de código ou de documentação.

Faça um fork e adapte o projeto para o seu cenário.

Obrigado por acompanhar o desenvolvimento deste bot.
Bons testes e bons aquecimentos de conta! 🚀