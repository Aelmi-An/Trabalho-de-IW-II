const Boom = new Audio('Áudios/água.m4a');
const Xablau = new Audio('Áudios/Navio.m4a');
const Kaboom = new Audio('Áudios/Bomba.mp3');

function BatalhaNaval() {
    let sequencia = [];
    // Captura o tabuleiro
    let tabuleiro = document.getElementById("tabuleiro_bem_bolado");

    // Loop para gerar o mapa secreto de números (0 a 4)
    for (let linha = 0; linha < 10; linha++) {
        let oceano = [];
        for (let coluna = 0; coluna < 10; coluna++) {
            oceano.push(Math.floor(Math.random() * 5));
        }
        sequencia.push(oceano);
    }

    // Loop para criar as caixinhas na tela
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let celula = document.createElement("div");
            celula.classList.add("celula");

            let imageminicial = document.createElement("img");
            imageminicial.src = "Imagens/prontopraplay.png";
            imageminicial.style.height = "100%";
            imageminicial.style.width = "100%";
            celula.appendChild(imageminicial);

            // Evento de clique simples
            celula.addEventListener("click", function () {
                // 1. Bloqueia cliques em TODO o tabuleiro para ninguém sair clicando rápido
                tabuleiro.style.pointerEvents = "none";

                let opcao = sequencia[x][y];

                switch (opcao) {
                    case 0: imageminicial.src = "Imagens/wave.png"; Boom.play(); break;
                    case 1: imageminicial.src = "Imagens/Ship-1.png"; Xablau.play(); adicionarPontos('solo', 321); break;
                    case 2: imageminicial.src = "Imagens/Ship-2.png"; Xablau.play(); adicionarPontos('solo', 231); break;
                    case 3: imageminicial.src = "Imagens/Ship-3.png"; Xablau.play(); adicionarPontos('solo', 132); break;
                    case 4: imageminicial.src = "Imagens/bomba.png"; Kaboom.play(); break;
                }

                // 2. Garante que ESTA célula específica nunca mais possa ser clicada
                celula.style.pointerEvents = "none";
                celula.classList.add("clicada"); // Opcional: boa prática para marcar visualmente via CSS

                // 3. Cria o delay de 1.5 segundos (1500 milissegundos) para liberar o tabuleiro de volta
                setTimeout(function() {
                    tabuleiro.style.pointerEvents = "auto";
                }, 1500); 
            });
    
            tabuleiro.appendChild(celula);
        }
    }
}