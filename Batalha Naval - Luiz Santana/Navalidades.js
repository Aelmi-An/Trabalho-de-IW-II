function BatalhaNaval() {

// variável receberá o valor de cada linha pelo for abaixo:
let sequencia = [];

// for abaixo:
for (let linha = 0; linha < 10; linha++) {

    // Cria uma linha vazia
    let oceano = [];

    // Cria as 10 colunas da linha atual
    for (let coluna = 0; coluna < 10; coluna++) {

        // Sorteia um número entre 0 e 4
        let conteudo = Math.floor(Math.random() * 5);

        // Adiciona o número sorteado à linha
        oceano.push(conteudo);

    }

    // Adiciona a linha completa à matriz principal 
    sequencia.push(oceano);

}

// Pega a div que será usada como tabuleiro
let tabuleiro = document.getElementById("tabuleiro_bem_bolado");

// For para criação das células (Cada caixinha top)
for (let x = 0; x < 10; x++) {

    for (let y = 0; y < 10; y++) {

        // Criação das células/espaços do tabuleiro
        let celula = document.createElement("div");

        // Adiciona a classe "celula" para aplicar o CSS
        celula.classList.add("celula");

        // Cria a imagem inicial da célula
        let imageminicial = document.createElement("img");

        // Imagem mostrada antes do clique
        imageminicial.src = "prontopraplay.png";

        // Faz a imagem ocupar toda a célula
        imageminicial.style.height = "100%";
        imageminicial.style.width = "100%";

        // Adiciona a imagem dentro da célula
        celula.appendChild(imageminicial);

        // Evento ativado quando a célula é clicada
        celula.addEventListener("click", function () {

            // Obtém o valor armazenado na posição da matriz
            let opcao = sequencia[x][y];

            // Verifica qual conteúdo existe na posição clicada
            switch (opcao) {

                // Água
                case 0:
                    imageminicial.src = "wave.png";
                    break;

                // Barco v1
                case 1:
                    imageminicial.src = "Ship-1.png";
                    break;

                // Barco v2
                case 2:
                    imageminicial.src = "Ship-2.png";
                    break;

                // Barco v3
                case 3:
                    imageminicial.src = "Ship-3.png";
                    break;

                // Bomba
                case 4:
                    imageminicial.src = "bomba.png";
                    break;
            }

            // Impede novos cliques na mesma célula
            celula.style.pointerEvents = "none";

        });

        // Adiciona a célula ao tabuleiro
        tabuleiro.appendChild(celula);

    }

}


}

// Chama a função para iniciar o jogo
BatalhaNaval();
