const Boom = new Audio('Áudios/água.m4a');
// Cria um objeto de áudio para o som de "água" (tocado quando o jogador clica numa célula vazia)

const Xablau = new Audio('Áudios/Navio.m4a');
// Cria um objeto de áudio para o som de "acertou navio"

const Kaboom = new Audio('Áudios/Bomba.mp3');
// Cria um objeto de áudio para o som de "bomba/explosão"

let vidasSolo = 0;
// Variável global que guarda quantas vidas o jogador tem no modo solo

let barcosRestantesSolo = 0;
// Variável global que conta quantos barcos ainda restam no tabuleiro (modo solo)

let modoAtual = 'solo'; 
// Guarda qual modo está sendo jogado atualmente ('solo' ou outro), usado para saber 
// o que reiniciar quando o jogador clicar em "Jogar Novamente"

function BatalhaNaval() {
// Função principal do modo solo, responsável por criar o tabuleiro e a lógica do jogo

    modoAtual = 'solo';
    // Marca que o modo atual é "solo" (importante para a função reiniciarJogo saber o que chamar depois)

    vidasSolo = 5
    // Reinicia as vidas do jogador para 5 no começo da partida

    barcosRestantesSolo = 0;
    // Zera o contador de barcos restantes (será recalculado ao gerar o tabuleiro)
    
    document.getElementById("status_solo").style.display = "block";
    // Exibe a div que mostra "Vidas: X" na tela

    document.getElementById("vidas_contador").innerText = vidasSolo;
    // Atualiza o texto do contador de vidas na tela para mostrar o valor atual (5)

    let sequencia = [];
    // Array que vai guardar o "mapa" do jogo: uma matriz 10x10 com o que tem em cada célula
    // (0 = água, 1/2/3 = tipos de navio, 4 = bomba)

    let tabuleiro = document.getElementById("tabuleiro_bem_bolado");
    // Pega a referência da div que vai conter o tabuleiro visual

    tabuleiro.innerHTML = "";
    // Limpa qualquer conteúdo anterior do tabuleiro (importante ao reiniciar o jogo)

    for (let linha = 0; linha < 10; linha++) {
    // Laço que percorre 10 linhas (para montar uma matriz 10x10)

        let oceano = [];
        // Array temporário que representa UMA linha do tabuleiro

        for (let coluna = 0; coluna < 10; coluna++) {
        // Laço que percorre as 10 colunas dessa linha

            let opcaoSorteada = Math.floor(Math.random() * 5);
            // Sorteia um número aleatório entre 0 e 4 (inteiro), que vai definir o conteúdo da célula:
            // 0 = água | 1, 2, 3 = tipos de navio | 4 = bomba

            if (opcaoSorteada >= 1 && opcaoSorteada <= 3) {
            // Verifica se o número sorteado corresponde a algum tipo de navio (1, 2 ou 3)

                barcosRestantesSolo++;
                // Se for navio, incrementa o contador de barcos restantes
            }

            oceano.push(opcaoSorteada);
            // Adiciona o valor sorteado na linha atual (oceano)
        }
        sequencia.push(oceano);
        // Adiciona a linha completa (oceano) na matriz geral (sequencia)
    }

    // Se por um azar matemático o mapa nascer sem barcos, força pelo menos 1 para o jogo rodar
    if (barcosRestantesSolo === 0) {
    // Verifica se, por sorteio, nenhuma célula virou navio (caso raro, mas possível)

        sequencia[5][5] = 1;
        // Força manualmente a célula da posição [5][5] a ser um navio tipo 1

        barcosRestantesSolo = 1;
        // Atualiza o contador para refletir esse navio forçado
    }

    for (let x = 0; x < 10; x++) {
    // Laço que percorre as linhas para CRIAR os elementos visuais (HTML) do tabuleiro

        for (let y = 0; y < 10; y++) {
        // Laço que percorre as colunas

            let celula = document.createElement("div");
            // Cria uma nova div que representa uma célula do tabuleiro

            celula.classList.add("celula");
            // Adiciona a classe CSS "celula" para estilização (tamanho, borda, etc.)

            let imageminicial = document.createElement("img");
            // Cria um elemento de imagem que vai dentro da célula

            imageminicial.src = "Imagens/Mira.png"; 
            // Define a imagem inicial como uma "mira" (indicando célula não revelada/clicável)

            imageminicial.style.height = "100%";
            // Faz a imagem ocupar 100% da altura da célula

            imageminicial.style.width = "100%";
            // Faz a imagem ocupar 100% da largura da célula

            celula.appendChild(imageminicial);
            // Insere a imagem dentro da célula (div)

            celula.addEventListener("click", function () {
            // Adiciona um "ouvinte de clique": quando o jogador clicar nessa célula, executa essa função

                tabuleiro.style.pointerEvents = "none";
                // Desabilita temporariamente os cliques em TODO o tabuleiro (evita cliques múltiplos rápidos enquanto processa)

                let opcao = sequencia[x][y];
                // Recupera o que está escondido nessa célula específica (0 a 4), usando os valores 
                // x e y capturados no momento da criação da célula (closure)

                switch (opcao) {
                // Verifica qual era o conteúdo da célula e reage de acordo

                    case 0: 
                        imageminicial.src = "Imagens/Água.png"; 
                        // Troca a imagem da mira para a imagem de "água" (errou)

                        Boom.play(); 
                        // Toca o som de água
                        break;

                    case 1: 
                        imageminicial.src = "Imagens/Barcov1.png"; 
                        // Mostra a imagem do navio tipo 1 (acertou)

                        Xablau.play(); 
                        // Toca o som de "acertou navio"

                        adicionarPontos('solo', 321); 
                        // Chama função (de outro arquivo) para somar 321 pontos no modo solo

                        dispararTerremoto();
                        // Chama uma função (provavelmente um efeito visual de "tremor" na tela)

                        barcosRestantesSolo--; 
                        // Diminui o contador de barcos restantes, já que esse foi destruído
                        break;

                    case 2: 
                        imageminicial.src = "Imagens/Barcov2.png"; 
                        Xablau.play(); 
                        adicionarPontos('solo', 231); 
                        dispararTerremoto();
                        barcosRestantesSolo--; 
                        // Mesma lógica do case 1, mas para o navio tipo 2 (231 pontos)
                        break;

                    case 3: 
                        imageminicial.src = "Imagens/Barcov3.png"; 
                        Xablau.play(); 
                        adicionarPontos('solo', 132);
                        dispararTerremoto();
                        barcosRestantesSolo--; 
                        // Mesma lógica, navio tipo 3 (132 pontos)
                        break;

                    case 4: 
                        imageminicial.src = "Imagens/Bomba.png"; 
                        // Mostra a imagem de uma bomba (célula "armadilha")

                        Kaboom.play(); 
                        // Toca o som de explosão

                        dispararTerremoto();
                        // Efeito de tremor na tela

                        vidasSolo--; // Tira apenas 1 vida ao cair numa bomba
                        // Reduz em 1 a quantidade de vidas do jogador

                        document.getElementById("vidas_contador").innerText = vidasSolo;
                        // Atualiza o número de vidas exibido na tela
                        break;
                }

                celula.style.pointerEvents = "none";
                // Desabilita cliques futuros NESSA célula específica (já foi revelada, não pode clicar de novo)

                celula.classList.add("clicada");
                // Adiciona a classe "clicada" (provavelmente para estilizar visualmente células já reveladas)

                if (vidasSolo <= 0) {
                // Verifica se as vidas chegaram a zero ou menos

                    finalizarPartida("DERROTA!", "Suas vidas acabaram!");
                    // Chama a função que encerra o jogo, mostrando mensagem de derrota

                    return;
                    // Sai da função de clique imediatamente, não executando o código abaixo
                }
                if (barcosRestantesSolo <= 0) {
                // Verifica se todos os barcos foram destruídos

                    finalizarPartida("VITÓRIA!", "Você destruiu todos os barcos!");
                    // Chama a função de fim de jogo, mostrando mensagem de vitória

                    return;
                    // Sai da função de clique
                }

                setTimeout(function() {
                    tabuleiro.style.pointerEvents = "auto";
                }, 1500); 
                // Depois de 1.5 segundos, reabilita os cliques no tabuleiro (esse delay provavelmente 
                // dá tempo para a animação/som de "terremoto" terminar antes de liberar novo clique)
            });
    
            tabuleiro.appendChild(celula);
            // Insere a célula criada dentro da div do tabuleiro, tornando-a visível na tela
        }
    }
}

function finalizarPartida(titulo, texto) {
// Função que finaliza a partida, recebendo um título (ex: "VITÓRIA!") e um texto de detalhe

    pararCronometro();
    // Para o cronômetro imediatamente, travando o tempo final da partida

    document.getElementById("mensagem_fim").innerText = titulo;
    // Define o texto do título de fim de jogo

    document.getElementById("detalhes_fim").innerText = texto;
    // Define o texto com detalhes (ex: "Suas vidas acabaram!")

    document.getElementById("tela_fim_jogo").style.display = "block"; 
    // Exibe a tela de fim de jogo

    document.getElementById("tabuleiro_bem_bolado").style.pointerEvents = "none"; 
    // Desabilita cliques no tabuleiro (já que o jogo acabou)

    document.getElementById("controles_partida").style.display = "none"; 
    // Esconde o botão de "Voltar ao Menu" do meio da partida para não acumular botões
}

function reiniciarJogo() {
// Função que reinicia o jogo (chamada pelo botão "Jogar Novamente")

    iniciarCronometro();
    // Reinicia o cronômetro para a nova partida.

    document.getElementById("tela_fim_jogo").style.display = "none";
    // Esconde a tela de fim de jogo

    document.getElementById("placar_padrao").style.display = "none";
    // Esconde o placar do modo solo (vai ser reexibido daqui a pouco, dependendo do modo)

    document.getElementById("placar_com_cpu").style.display = "none";
    // Esconde o placar do modo CPU

    document.getElementById("status_solo").style.display = "none";
    // Esconde o contador de vidas (também será reexibido se for modo solo)

    document.getElementById("tabuleiro_bem_bolado").style.pointerEvents = "auto";
    // Reabilita os cliques no tabuleiro para a nova partida

    document.getElementById("controles_partida").style.display = "block"; 
    // Mostra novamente o botão "Voltar ao Menu" (que finalizarPartida tinha escondido)

    zerarPlacar(); 
    // Chama a função (de outro arquivo) que zera a pontuação

    if (modoAtual === 'solo') {
    // Verifica se o modo da partida anterior era "solo"

        document.getElementById("placar_padrao").style.display = "flex";
        // Reexibe o placar do modo solo

        BatalhaNaval();
        // Inicia uma nova partida solo (recria o tabuleiro do zero)

    } else {
        document.getElementById("placar_com_cpu").style.display = "flex";
        // Caso contrário (modo CPU), reexibe o placar correspondente

        BatalhaNavalCPU();
        // Inicia uma nova partida contra a CPU
    }
}