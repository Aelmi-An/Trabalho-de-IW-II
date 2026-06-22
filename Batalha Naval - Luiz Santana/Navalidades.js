// ==========================================
// 1. O CÉREBRO DA IA (SORTEIO COM MEMÓRIA)
// ==========================================
class IABatalhaNaval {
    constructor() {
        // Lista que vai guardar todas as 100 coordenadas possíveis [x, y]
        this.jogadasDisponiveis = [];
        
        // Alimenta a lista criando combinações de 0 a 9 para linhas e colunas
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.jogadasDisponiveis.push([x, y]);
            }
        }
    }

    atirar() {
        // Se ainda existirem tiros disponíveis na lista...
        if (this.jogadasDisponiveis.length > 0) {
            // Sorteia uma posição (índice) qualquer dentro da lista
            let indiceSorteado = Math.floor(Math.random() * this.jogadasDisponiveis.length);
            
            // Pega as coordenadas [x, y] que estão nessa posição sorteada
            let tiroEscolhido = this.jogadasDisponiveis[indiceSorteado];
            
            // REMOVE o tiro da lista para a IA nunca repetir o alvo (sua memória)
            this.jogadasDisponiveis.splice(indiceSorteado, 1);
            
            // Devolve as coordenadas sorteadas para o jogo rodar
            return tiroEscolhido;
        }
        return null; // Retorna nada se o tabuleiro estiver completamente cheio
    }
}

// ==========================================
// 2. MOTOR DO JOGO E TURNOS ALTERNADOS
// ==========================================
function BatalhaNaval() {
    let sequencia = [];       // Matriz secreta (guarda apenas os números de 0 a 4)
    let tabuleiroVisual = []; // Matriz visual (guarda as DIVs do HTML para podermos alterá-las)

    // LOOP ORIGINAL: Cria o mapa de números secretos (o oceano)
    for (let linha = 0; linha < 10; linha++) {
        let oceano = [];
        for (let coluna = 0; coluna < 10; coluna++) {
            let conteudo = Math.floor(Math.random() * 5);
            oceano.push(conteudo);
        }
        sequencia.push(oceano);
    }

    let tabuleiro = document.getElementById("tabuleiro_bem_bolado");
    let botInimigo = new IABatalhaNaval(); // Liga o cérebro da IA para esta partida

    // LOOP VISUAL: Cria as caixinhas na tela
    for (let x = 0; x < 10; x++) {
        tabuleiroVisual[x] = []; // Prepara a linha dentro da nossa matriz visual
        
        for (let y = 0; y < 10; y++) {
            // Cria a div da célula e configura a imagem azul padrão
            let celula = document.createElement("div");
            celula.classList.add("celula");

            let imageminicial = document.createElement("img");
            imageminicial.src = "Imagens/prontopraplay.png";
            imageminicial.style.height = "100%";
            imageminicial.style.width = "100%";
            celula.appendChild(imageminicial);

            // SALVA A DIV na matriz visual usando as coordenadas x e y (essencial para a IA achar ela depois)
            tabuleiroVisual[x][y] = celula;

            // EVENTO PRINCIPAL: O que acontece quando o PLAYER clica em uma caixinha
            celula.addEventListener("click", function () {
                
                // ------------------------------------------
                // [TURNO DO JOGADOR]
                // ------------------------------------------
                let opcao = sequencia[x][y]; // Olha o número secreto da caixinha clicada
                
                // Revela a imagem correta para o jogador baseado no número secreto
                switch (opcao) {
                    case 0: imageminicial.src = "Imagens/wave.png"; break;
                    case 1: imageminicial.src = "Imagens/Ship-1.png"; break;
                    case 2: imageminicial.src = "Imagens/Ship-2.png"; break;
                    case 3: imageminicial.src = "Imagens/Ship-3.png"; break;
                    case 4: imageminicial.src = "Imagens/bomba.png"; break;
                }
                celula.style.pointerEvents = "none"; // Desativa futuros cliques nessa caixinha

                // ------------------------------------------
                // [TURNO DA IA] - Roda imediatamente após o clique do player
                // ------------------------------------------
                let tiroBot = botInimigo.atirar(); // IA sorteia e extrai um tiro [x, y] da lista dela
                
                if (tiroBot !== null) {
                    let botX = tiroBot[0]; // Linha escolhida pela IA
                    let botY = tiroBot[1]; // Coluna escolhida pela IA
                    
                    let opcaoBot = sequencia[botX][botY];          // Vê o número secreto que a IA acertou
                    let celulaBot = tabuleiroVisual[botX][botY];    // Usa a matriz visual para achar a DIV física desse alvo
                    let imgBot = celulaBot.querySelector("img");    // Pega a tag <img> de dentro da DIV da IA

                    // Revela a imagem correta no alvo que a IA atingiu
                    switch (opcaoBot) {
                        case 0: imgBot.src = "Imagens/wave.png"; break;
                        case 1: imgBot.src = "Imagens/Ship-1.png"; break;
                        case 2: imgBot.src = "Imagens/Ship-2.png"; break;
                        case 3: imgBot.src = "Imagens/Ship-3.png"; break;
                        case 4: imgBot.src = "Imagens/bomba.png"; break;
                    }
                    celulaBot.style.pointerEvents = "none"; // Desativa a caixinha da IA para o player não clicar nela
                }
            });

            tabuleiro.appendChild(celula); // Insere a caixinha fisicamente no HTML
        }
    }
}

// Inicia o jogo
BatalhaNaval();