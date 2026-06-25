//declarando variáveis de tempo.
let tempoSegundos = 0;
let intervaloCronometro = null;

// Áudios específicos para o modo CPU (evita erros de escopo global)
const BoomCPU = new Audio('Áudios/água.m4a');
// Som de "água" exclusivo do modo CPU

const XablauCPU = new Audio('Áudios/Navio.m4a');
// Som de "acertou navio" exclusivo do modo CPU

const KaboomCPU = new Audio('Áudios/Bomba.mp3');
// Som de "bomba/explosão" exclusivo do modo CPU

// Função utilitária do efeito visual de terremoto
function dispararTerremoto() {
// Função compartilhada (usada no modo solo e no modo CPU) que cria um efeito visual 
// de "tremor" na tela

    let tab = document.getElementById("tabuleiro_bem_bolado");
    tab.classList.add("tremer");
    setTimeout(() => {
        tab.classList.remove("tremer");
    }, 1000);
}

// Verifica se a lista de tiros da IA já existe para não dar erro de duplicação
if (typeof tirosDisponiveisCPU === 'undefined') {
    var tirosDisponiveisCPU = [];
}

// Variável para rastrear quantos barcos restam no tabuleiro do BOT (para validar vitória do jogador)
let barcosRestantesCPU = 0;

// Variável para rastrear quantos barcos restam no tabuleiro do JOGADOR (para validar vitória da CPU)
let barcosRestantesJogador = 0;

// Matriz secreta que representa o tabuleiro do JOGADOR, usada pela IA para atirar de verdade
let sequenciaJogador = [];

// Função principal que monta o modo de jogo contra o Bot
function BatalhaNavalCPU() {
    modoAtual = 'cpu'; // Atualiza o estado global para o botão reiniciar saber onde voltar
    barcosRestantesCPU = 0; // Reseta o contador de barcos do BOT
    barcosRestantesJogador = 0; // NOVO: Reseta o contador de barcos do JOGADOR

    let tab = document.getElementById("tabuleiro_bem_bolado");
    tab.innerHTML = ""; 
    
    // Oculta o contador de vidas do modo solo caso ele esteja visível
    if (document.getElementById("status_solo")) {
        document.getElementById("status_solo").style.display = "none";
    }
    
    // Reseta a lista de tiros que a IA pode dar nesta partida
    tirosDisponiveisCPU = [];
    for (let l = 0; l < 10; l++) {
        for (let c = 0; c < 10; c++) {
            tirosDisponiveisCPU.push([l, c]);
        }
    }

    // Gera a matriz secreta de barcos do Bot (valores de 0 a 4)
    let sequenciaCPU = [];
    for (let linha = 0; linha < 10; linha++) {
        let oceano = [];
        for (let coluna = 0; coluna < 10; coluna++) {
            let sorteio = Math.floor(Math.random() * 5);
            if (sorteio >= 1 && sorteio <= 3) {
                barcosRestantesCPU++;
            }
            oceano.push(sorteio);
        }
        sequenciaCPU.push(oceano);
    }

    // Gera a matriz secreta de barcos do JOGADOR 
    sequenciaJogador = [];
    for (let linha = 0; linha < 10; linha++) {
        let oceano = [];
        for (let coluna = 0; coluna < 10; coluna++) {
            let sorteio = Math.floor(Math.random() * 5);
            if (sorteio >= 1 && sorteio <= 3) {
                barcosRestantesJogador++;
            }
            oceano.push(sorteio);
        }
        sequenciaJogador.push(oceano);
    }

    // Cria e desenha as caixinhas na tela para o modo CPU
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let celula = document.createElement("div");
            celula.classList.add("celula");

            let imageminicial = document.createElement("img");
            imageminicial.src = "Imagens/Mira.png";
            imageminicial.style.height = "100%";
            imageminicial.style.width = "100%";
            celula.appendChild(imageminicial);

            // Evento de clique para o Modo CPU (Vez do Player)
            celula.addEventListener("click", function () {
                // 1. Bloqueia cliques em TODO o tabuleiro para ninguém bugar o delay
                tab.style.pointerEvents = "none";

                let opcao = sequenciaCPU[x][y];
                // O jogador ataca o mapa do BOT (sequenciaCPU) — isso já estava certo

                switch (opcao) {
                    case 0: 
                        imageminicial.src = "Imagens/Água.png"; 
                        BoomCPU.play(); 
                        break;
                    case 1: 
                        imageminicial.src = "Imagens/Barcov1.png"; 
                        XablauCPU.play(); 
                        adicionarPontos('player', 321); 
                        dispararTerremoto();
                        barcosRestantesCPU--;
                        break;
                    case 2: 
                        imageminicial.src = "Imagens/Barcov2.png"; 
                        XablauCPU.play(); 
                        adicionarPontos('player', 231); 
                        dispararTerremoto();
                        barcosRestantesCPU--;
                        break;
                    case 3: 
                        imageminicial.src = "Imagens/Barcov3.png"; 
                        XablauCPU.play(); 
                        adicionarPontos('player', 132); 
                        dispararTerremoto();
                        barcosRestantesCPU--;
                        break;
                    case 4: 
                        imageminicial.src = "Imagens/Bomba.png"; 
                        KaboomCPU.play(); 
                        adicionarPontos('player', -123);
                        dispararTerremoto();
                        break;
                }

                // 2. Garante que ESTA célula específica nunca mais possa ser clicada de forma alguma
                celula.style.pointerEvents = "none";
                celula.classList.add("clicada"); 

                // Validação de Fim de Jogo: se o jogador limpou o mapa do bot
                if (barcosRestantesCPU <= 0) {
                    pararCronometro();
                    finalizarPartida("VITÓRIA!", "Você derrotou a CPU e destruiu toda a frota!");
                    return;
                }

                // 3. Cria o delay de 1.5 segundos para a IA responder e depois libera o tabuleiro
                setTimeout(function() {
                    if (typeof turnoDaIACPU === "function") {
                        turnoDaIACPU();
                    }
                    
                    // Libera as caixinhas não clicadas de volta para o jogador
                    tab.style.pointerEvents = "auto";
                }, 1500); 
            });

            // Adiciona a célula montada dentro do grid principal do HTML
            tab.appendChild(celula);
        }
    }
}

function turnoDaIACPU() {
// A CPU recebe o "tabuleiro do jogador"

    if (tirosDisponiveisCPU.length === 0) {
        pararCronometro();
        finalizarPartida("FIM DE JOGO", "Não sobrou nada!");
        return;
    }

    // 1. Sorteia o tiro da lista
    let indiceAleatorio = Math.floor(Math.random() * tirosDisponiveisCPU.length);
    let tiro = tirosDisponiveisCPU[indiceAleatorio];
    tirosDisponiveisCPU.splice(indiceAleatorio, 1); 

    let linhaIA = tiro[0];
    let colunaIA = tiro[1];

    // 2. BUSCA INFALÍVEL: Em vez de ID, pega pelo índice do Grid (linha * 10 + coluna)
    let tab = document.getElementById("tabuleiro_bem_bolado");
    let todasAsCelulas = tab.getElementsByClassName("celula");
    let indiceDaCelula = (linhaIA * 10) + colunaIA;
    let celulaIA = todasAsCelulas[indiceDaCelula];

    // Se a célula sorteada já estiver clicada, tenta outra casa imediatamente
    if (celulaIA && celulaIA.classList.contains("clicada")) {
        turnoDaIACPU(); 
        return; 
    }

    let imagemIA = celulaIA ? celulaIA.querySelector("img") : null;

    let opcaoIA = sequenciaJogador[linhaIA][colunaIA]; 

    // 3. Executa a reação visual e sonora do tiro da CPU
    switch (opcaoIA) {
        case 0: 
            if (imagemIA) imagemIA.src = "Imagens/Água.png"; 
            BoomCPU.play(); 
            break;
        case 1: 
            if (imagemIA) imagemIA.src = "Imagens/Barcov1.png"; 
            XablauCPU.play(); 
            adicionarPontos('cpu', 321);
            dispararTerremoto(); 
            barcosRestantesJogador--;
            // NOVO: diminui o contador de barcos do jogador, já que um segmento foi destruído
            break;
        case 2: 
            if (imagemIA) imagemIA.src = "Imagens/Barcov2.png"; 
            XablauCPU.play(); 
            adicionarPontos('cpu', 231); 
            dispararTerremoto();
            barcosRestantesJogador--;
            break;
        case 3: 
            if (imagemIA) imagemIA.src = "Imagens/Barcov3.png"; 
            XablauCPU.play(); 
            adicionarPontos('cpu', 132); 
            dispararTerremoto();
            barcosRestantesJogador--;
            break;
        case 4: 
            if (imagemIA) imagemIA.src = "Imagens/Bomba.png"; 
            KaboomCPU.play(); 
            adicionarPontos('cpu', -123);
            dispararTerremoto();
            break;
    }

    // 4. Trava a célula atingida pela IA na tela
    if (celulaIA) {
        celulaIA.style.pointerEvents = "none";
        celulaIA.classList.add("clicada");
    }

    // NOVO: Validação de Fim de Jogo: se a CPU destruiu todos os barcos do jogador, ela vence
    if (barcosRestantesJogador <= 0) {
        pararCronometro();
        finalizarPartida("DERROTA!", "A CPU destruiu toda a sua frota!");
    }
}
