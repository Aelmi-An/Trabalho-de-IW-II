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

            // Evento de clique simples (apenas revela e trava a célula clicada)
            celula.addEventListener("click", function () {
                let opcao = sequencia[x][y];

                switch (opcao) {
                    case 0: imageminicial.src = "Imagens/wave.png"; break;
                    case 1: imageminicial.src = "Imagens/Ship-1.png"; break;
                    case 2: imageminicial.src = "Imagens/Ship-2.png"; break;
                    case 3: imageminicial.src = "Imagens/Ship-3.png"; break;
                    case 4: imageminicial.src = "Imagens/bomba.png"; const Kaboom = new Audio('Áudios/deltarune-explosion.mp3');Kaboom.play(); break;
                }
                celula.style.pointerEvents = "none";
            });

            tabuleiro.appendChild(celula);
        }
    }
}
