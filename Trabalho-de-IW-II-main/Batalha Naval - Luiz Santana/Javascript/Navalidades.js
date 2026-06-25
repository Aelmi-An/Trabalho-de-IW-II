const Boom = new Audio('Áudios/água.m4a');
const Xablau = new Audio('Áudios/Navio.m4a');
const Kaboom = new Audio('Áudios/Bomba.mp3');

let vidasSolo = 5;
let barcosRestantesSolo = 0;
let modoAtual = 'solo'; 

function BatalhaNaval() {
    modoAtual = 'solo';
    vidasSolo = 10;
    barcosRestantesSolo = 0;
    
    document.getElementById("status_solo").style.display = "block";
    document.getElementById("vidas_contador").innerText = vidasSolo;

    let sequencia = [];
    let tabuleiro = document.getElementById("tabuleiro_bem_bolado");
    tabuleiro.innerHTML = "";

    for (let linha = 0; linha < 10; linha++) {
        let oceano = [];
        for (let coluna = 0; coluna < 10; coluna++) {
            let opcaoSorteada = Math.floor(Math.random() * 5);
            if (opcaoSorteada >= 1 && opcaoSorteada <= 3) {
                barcosRestantesSolo++;
            }
            oceano.push(opcaoSorteada);
        }
        sequencia.push(oceano);
    }

    // Se por um azar matemático o mapa nascer sem barcos, força pelo menos 1 para o jogo rodar
    if (barcosRestantesSolo === 0) {
        sequencia[5][5] = 1;
        barcosRestantesSolo = 1;
    }

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let celula = document.createElement("div");
            celula.classList.add("celula");

            let imageminicial = document.createElement("img");
            imageminicial.src = "Imagens/Mira.png"; 
            imageminicial.style.height = "100%";
            imageminicial.style.width = "100%";
            celula.appendChild(imageminicial);

            celula.addEventListener("click", function () {
                tabuleiro.style.pointerEvents = "none";
                let opcao = sequencia[x][y];

                switch (opcao) {
                    case 0: 
                        imageminicial.src = "Imagens/Água.png"; 
                        Boom.play(); 
                        break;
                    case 1: 
                        imageminicial.src = "Imagens/Barcov1.png"; 
                        Xablau.play(); 
                        adicionarPontos('solo', 321); 
                        dispararTerremoto();
                        barcosRestantesSolo--; 
                        break;
                    case 2: 
                        imageminicial.src = "Imagens/Barcov2.png"; 
                        Xablau.play(); 
                        adicionarPontos('solo', 231); 
                        dispararTerremoto();
                        barcosRestantesSolo--; 
                        break;
                    case 3: 
                        imageminicial.src = "Imagens/Barcov3.png"; 
                        Xablau.play(); 
                        adicionarPontos('solo', 132);
                        dispararTerremoto();
                        barcosRestantesSolo--; 
                        break;
                    case 4: 
                        imageminicial.src = "Imagens/Bomba.png"; 
                        Kaboom.play(); 
                        dispararTerremoto();
                        vidasSolo--; // CORREÇÃO: Agora tira apenas 1 vida em vez de zerar tudo!
                        document.getElementById("vidas_contador").innerText = vidasSolo;
                        break;
                }

                celula.style.pointerEvents = "none";
                celula.classList.add("clicada");

                // CORREÇÃO: Função escrita corretamente com "A" ao invés de "E"
                if (vidasSolo <= 0) {
                    finalizarPartida("DERROTA!", "Suas vidas acabaram!");
                    return;
                }
                if (barcosRestantesSolo <= 0) {
                    finalizarPartida("VITÓRIA!", "Você destruiu todos os barcos!");
                    return;
                }

                setTimeout(function() {
                    tabuleiro.style.pointerEvents = "auto";
                }, 1500); 
            });
    
            tabuleiro.appendChild(celula);
        }
    }
}

function finalizarPartida(titulo, texto) {
    document.getElementById("mensagem_fim").innerText = titulo;
    document.getElementById("detalhes_fim").innerText = texto;
    document.getElementById("tela_fim_jogo").style.display = "block"; 
    document.getElementById("tabuleiro_bem_bolado").style.pointerEvents = "none"; 
}

function reiniciarJogo() {
    document.getElementById("tela_fim_jogo").style.display = "none";
    // CORREÇÃO: ID buscando o placar sem acento e zerando pontos
    document.getElementById("placar_padrao").style.display = "none";
    document.getElementById("placar_com_cpu").style.display = "none";
    document.getElementById("status_solo").style.display = "none";
    document.getElementById("tabuleiro_bem_bolado").style.pointerEvents = "auto";

    zerarPlacar(); 

    if (modoAtual === 'solo') {
        document.getElementById("placar_padrao").style.display = "flex";
        BatalhaNaval();
    } else {
        document.getElementById("placar_com_cpu").style.display = "flex";
        BatalhaNavalCPU();
    }
}
function finalizarPartida(titulo, texto) {
    document.getElementById("mensagem_fim").innerText = titulo;
    document.getElementById("detalhes_fim").innerText = texto;
    document.getElementById("tela_fim_jogo").style.display = "block"; 
    document.getElementById("tabuleiro_bem_bolado").style.pointerEvents = "none"; 
    
    // Esconde o botão de "Voltar ao Menu" do meio da partida para não acumular botões
    document.getElementById("controles_partida").style.display = "none"; 
}

function reiniciarJogo() {
    document.getElementById("tela_fim_jogo").style.display = "none";
    document.getElementById("placar_padrao").style.display = "none";
    document.getElementById("placar_com_cpu").style.display = "none";
    document.getElementById("status_solo").style.display = "none";
    document.getElementById("tabuleiro_bem_bolado").style.pointerEvents = "auto";
    
    // Mostra o botão de pânico/retorno novamente
    document.getElementById("controles_partida").style.display = "block"; 

    zerarPlacar(); 

    if (modoAtual === 'solo') {
        document.getElementById("placar_padrao").style.display = "flex";
        BatalhaNaval();
    } else {
        document.getElementById("placar_com_cpu").style.display = "flex";
        BatalhaNavalCPU();
    }
}