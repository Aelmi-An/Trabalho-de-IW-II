// Áudios específicos para o modo CPU (evita erros de escopo global)
const BoomCPU = new Audio('Áudios/água.m4a');
const XablauCPU = new Audio('Áudios/Navio.m4a');
const KaboomCPU = new Audio('Áudios/Bomba.mp3');

// Verifica se a lista de tiros da IA já existe para não dar erro de duplicação
if (typeof tirosDisponiveisCPU === 'undefined') {
    var tirosDisponiveisCPU = [];
}

// Função principal que monta o modo de jogo contra o Bot
function BatalhaNavalCPU() {
    let tab = document.getElementById("tabuleiro_bem_bolado");
    tab.innerHTML = ""; 
    
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
            oceano.push(Math.floor(Math.random() * 5)); 
        }
        sequenciaCPU.push(oceano);
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

            // Evento de clique para o Modo CPU
            celula.addEventListener("click", function () {
                // 1. Bloqueia cliques em TODO o tabuleiro para ninguém bugar o delay
                tab.style.pointerEvents = "none";

                let opcao = sequenciaCPU[x][y];

                // Executa a lógica de imagens, sons e pontos específicos do Player na CPU
                switch (opcao) {
                    case 0: 
                        imageminicial.src = "Imagens/Água.png"; 
                        BoomCPU.play(); 
                        break;
                    case 1: 
                        imageminicial.src = "Imagens/Barcov1.png"; 
                        XablauCPU.play(); 
                        adicionarPontos('player', 321); 
                        break;
                    case 2: 
                        imageminicial.src = "Imagens/Barcov2.png"; 
                        XablauCPU.play(); 
                        adicionarPontos('player', 231); 
                        break;
                    case 3: 
                        imageminicial.src = "Imagens/Barcov3.png"; 
                        XablauCPU.play(); 
                        adicionarPontos('player', 132); 
                        break;
                    case 4: 
                        imageminicial.src = "Imagens/Bomba.png"; 
                        KaboomCPU.play(); 
                        adicionarPontos('player', -123)
                        break;
                }

                // 2. Garante que ESTA célula específica nunca mais possa ser clicada de forma alguma
                celula.style.pointerEvents = "none";
                celula.classList.add("clicada"); 

                // 3. Cria o delay de 1.5 segundos para a IA responder e depois libera o tabuleiro
                setTimeout(function() {
                    // Executa o turno da IA se você tiver criado essa função
                    if (typeof turnoDaIACPU === "function") {
                        turnoDaIACPU(sequenciaCPU);
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
function turnoDaIACPU(sequenciaCPU) {
    if (tirosDisponiveisCPU.length === 0) return;

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
        turnoDaIACPU(sequenciaCPU); 
        return; 
    }

    let imagemIA = celulaIA ? celulaIA.querySelector("img") : null;
    let opcaoIA = sequenciaCPU[linhaIA][colunaIA]; 

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
            break;
        case 2: 
            if (imagemIA) imagemIA.src = "Imagens/Barcov2.png"; 
            XablauCPU.play(); 
            adicionarPontos('cpu', 231); 
            break;
        case 3: 
            if (imagemIA) imagemIA.src = "Imagens/Barcov3.png"; 
            XablauCPU.play(); 
            adicionarPontos('cpu', 132); 
            break;
        case 4: 
            if (imagemIA) imagemIA.src = "Imagens/Bomba.png"; 
            KaboomCPU.play(); 
            adicionarPontos('cpu', -123)
            break;
    }

    // 4. Trava a célula na tela
    if (celulaIA) {
        celulaIA.style.pointerEvents = "none";
        celulaIA.classList.add("clicada");
    }
}