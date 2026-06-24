// Guarda os pontos de cada modo na memória do jogo
let pontosSolo = 0;
let pontosPlayer = 0;
let pontosCPU = 0;

// Atualiza os números que aparecem no HTML
function atualizarTelaDoPlacar() {
    let placarSolo = document.getElementById("pontos-player-solo");
    if (placarSolo) {
        placarSolo.innerText = pontosSolo;
    }
    
    let placarPlayerCPU = document.getElementById("pontos-player");
    let placarBotCPU = document.getElementById("pontos-cpu");
    
    if (placarPlayerCPU) {
        placarPlayerCPU.innerText = pontosPlayer;
    }
    if (placarBotCPU) {
        placarBotCPU.innerText = pontosCPU;
    }
}

// Soma ou subtrai os pontos baseado em quem jogou e no valor do barco
function adicionarPontos(quem, quantidade) {
    if (quem === 'solo') {
        pontosSolo += quantidade;
    } else if (quem === 'player') {
        pontosPlayer += quantidade;
    } else if (quem === 'cpu') {
        pontosCPU += quantidade;
    }
    
    // Atualiza a tela logo após fazer a conta
    atualizarTelaDoPlacar();
}

// Reseta todos os pontos para 0 quando o jogo recomeça
function zerarPlacar() {
    pontosSolo = 0;
    pontosPlayer = 0;
    pontosCPU = 0;
    
    atualizarTelaDoPlacar();
}