// Guarda os pontos de cada modo na memória do jogo
let pontosSolo = 0;
// Variável global que guarda a pontuação atual do modo solo

let pontosPlayer = 0;
// Variável global que guarda a pontuação do JOGADOR no modo contra CPU

let pontosCPU = 0;
// Variável global que guarda a pontuação da CPU no modo contra CPU

// Atualiza os números que aparecem no HTML
function atualizarTelaDoPlacar() {
// Função responsável por refletir na tela (HTML) os valores atuais das variáveis de pontos

    let placarSolo = document.getElementById("pontos-player-solo");
    // Busca o elemento <span> que mostra a pontuação do modo solo

    if (placarSolo) {
    // Verifica se o elemento existe antes de tentar usá-lo (evita erro caso o HTML 
    // não tenha esse elemento, ou caso ele ainda não tenha sido carregado)

        placarSolo.innerText = pontosSolo;
        // Atualiza o texto exibido com o valor atual de pontosSolo
    }
    
    let placarPlayerCPU = document.getElementById("pontos-player");
    // Busca o elemento que mostra a pontuação do jogador no modo CPU

    let placarBotCPU = document.getElementById("pontos-cpu");
    // Busca o elemento que mostra a pontuação da CPU
    
    if (placarPlayerCPU) {
    // Verifica se o elemento do placar do jogador existe

        placarPlayerCPU.innerText = pontosPlayer;
        // Atualiza o texto com a pontuação atual do jogador
    }
    if (placarBotCPU) {
    // Verifica se o elemento do placar da CPU existe

        placarBotCPU.innerText = pontosCPU;
        // Atualiza o texto com a pontuação atual da CPU
    }
}

// Soma ou subtrai os pontos baseado em quem jogou e no valor do barco
function adicionarPontos(quem, quantidade) {
// Função chamada pelos outros arquivos (Navalidades.js e NavalidadesCPU.js) sempre que 
// alguém precisa ganhar ou perder pontos. Recebe "quem" pontuou (string) e "quantidade" (número, 
// pode ser positivo para ganhar ou negativo para perder, como no caso da bomba)

    if (quem === 'solo') {
    // Se quem pontuou foi o jogador no modo solo

        pontosSolo += quantidade;
        // Soma (ou subtrai, se quantidade for negativa) o valor à pontuação solo

    } else if (quem === 'player') {
    // Se foi o jogador no modo contra CPU

        pontosPlayer += quantidade;
        // Atualiza a pontuação do jogador no modo CPU

    } else if (quem === 'cpu') {
    // Se foi a própria CPU que pontuou

        pontosCPU += quantidade;
        // Atualiza a pontuação da CPU
    }
    
    // Atualiza a tela logo após fazer a conta
    atualizarTelaDoPlacar();
    // Chama a função que reflete os novos valores na tela, garantindo que o placar visual 
    // sempre fique sincronizado com as variáveis internas
}

// Reseta todos os pontos para 0 quando o jogo recomeça
function zerarPlacar() {
// Função chamada ao iniciar ou reiniciar uma partida (em escolherModo, voltarAoMenu e reiniciarJogo)

    pontosSolo = 0;
    // Zera a pontuação do modo solo

    pontosPlayer = 0;
    // Zera a pontuação do jogador no modo CPU

    pontosCPU = 0;
    // Zera a pontuação da CPU
    
    atualizarTelaDoPlacar();
    // Atualiza a tela para mostrar "0" em todos os placares imediatamente
}