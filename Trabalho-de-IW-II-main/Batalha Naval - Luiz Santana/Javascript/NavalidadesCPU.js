// 1. MEMÓRIA DA IA: Lista simples com as 100 coordenadas
let tirosDisponiveis = [];
for (let l = 0; l < 10; l++) {
    for (let c = 0; c < 10; c++) {
        tirosDisponiveis.push([l, c]);
    }
}

// 2. MATRIZ SECRETA: O mapa do oceano com números de 0 a 4
let sequencia = [];
for (let linha = 0; linha < 10; linha++) {
    let oceano = [];
    for (let coluna = 0; coluna < 10; coluna++) {
        oceano.push(Math.floor(Math.random() * 5));
    }
    sequencia.push(oceano);
}

// 3. CAPTURA O TABULEIRO DO HTML
let tabuleiro = document.getElementById("tabuleiro_bem_bolado");

// 4. FUNÇÃO PRINCIPAL DO MODO CPU
function BatalhaNavalCPU() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let celula = document.createElement("div");
            celula.classList.add("celula");
            celula.id = "cel-" + x + "-" + y; // Dá o ID único para a caixinha

            let imagem = document.createElement("img");
            imagem.src = "Imagens/prontopraplay.png";
            imagem.style.height = "100%";
            imagem.style.width = "100%";
            celula.appendChild(imagem);

            // Quando o jogador clica na caixinha dele:
            celula.addEventListener("click", function () {
                // Revela o tiro do jogador
                revelarCaixinha(x, y, imagem); 
                
                // Passa a vez para a IA pensar e contra-atacar
                turnoDaIA();                   
            });

            tabuleiro.appendChild(celula);
        }
    }
}

// FUNÇÃO AUXILIAR: Apenas olha o número secreto e troca a imagem na tela
function revelarCaixinha(linha, coluna, tagImagem) {
    let numeroSecreto = sequencia[linha][coluna];
    
    switch (numeroSecreto) {
        case 0: tagImagem.src = "Imagens/wave.png"; break;
        case 1: tagImagem.src = "Imagens/Ship-1.png"; break;
        case 2: tagImagem.src = "Imagens/Ship-2.png"; break;
        case 3: tagImagem.src = "Imagens/Ship-3.png"; break;
        case 4: tagImagem.src = "Imagens/bomba.png"; break;
    }

    // Trava APENAS esta caixinha específica que acabou de ser revelada
    let caixinhaAlvo = document.getElementById("cel-" + linha + "-" + coluna);
    caixinhaAlvo.style.pointerEvents = "none";
}

// FUNÇÃO DO TURNO DA IA (Com o delay de 2 segundos)
function turnoDaIA() {
    // TRAVA O JOGO: Bloqueia o tabuleiro inteiro para o player não clicar enquanto a IA pensa
    tabuleiro.style.pointerEvents = "none";

    // Espera 2 segundos antes de executar o tiro do bot
    setTimeout(function () {
        
        if (tirosDisponiveis.length > 0) {
            // Sorteia uma posição na lista de tiros da IA
            let indiceSorteado = Math.floor(Math.random() * tirosDisponiveis.length);
            let tiroEscolhido = tirosDisponiveis[indiceSorteado];
            
            // Remove o tiro da lista para ela nunca repetir o alvo
            tirosDisponiveis.splice(indiceSorteado, 1);

            let botX = tiroEscolhido[0]; // Linha do tiro do bot
            let botY = tiroEscolhido[1]; // Coluna do tiro do bot

            // Acha a caixinha física da IA usando o ID
            let celulaBot = document.getElementById("cel-" + botX + "-" + botY);
            let imgBot = celulaBot.querySelector("img");

            // Revela o tiro que a IA deu
            revelarCaixinha(botX, botY, imgBot);
        }

        // DESTRAVA O JOGO: Libera o tabuleiro inteiro de volta para o jogador clicar na próxima rodada
        tabuleiro.style.pointerEvents = "auto";

    }, 1000); // 2000 ms = 2 segundos
}