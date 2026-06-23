// Usamos uma estrutura que não conflita com o outro arquivo
if (typeof tirosDisponiveisCPU === 'undefined') {
    var tirosDisponiveisCPU = [];
}

function BatalhaNavalCPU() {
    let tab = document.getElementById("tabuleiro_bem_bolado");
    tab.innerHTML = ""; // Limpa o tabuleiro anterior, se houver
    
    // Reinicia os tiros da IA
    tirosDisponiveisCPU = [];
    for (let l = 0; l < 10; l++) {
        for (let c = 0; c < 10; c++) {
            tirosDisponiveisCPU.push([l, c]);
        }
    }

    // Recria a matriz secreta local para a CPU não usar a mesma do modo solo antiga
    let sequenciaCPU = [];
    for (let linha = 0; linha < 10; linha++) {
        let oceano = [];
        for (let coluna = 0; coluna < 10; coluna++) {
            oceano.push(Math.floor(Math.random() * 5));
        }
        sequenciaCPU.push(oceano);
    }

    // Loop para criar o grid na tela
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let celula = document.createElement("div");
            celula.classList.add("celula");
            celula.id = "cel-" + x + "-" + y;

            let imagem = document.createElement("img");
            imagem.src = "Imagens/prontopraplay.png";
            imagem.style.height = "100%";
            imagem.style.width = "100%";
            celula.appendChild(imagem);

            // Evento de clique
            celula.addEventListener("click", function () {
                // Jogador joga
                revelarCaixinhaCPU(x, y, imagem, sequenciaCPU); 
                
                // IA joga
                turnoDaIACPU(sequenciaCPU);                   
            });

            tab.appendChild(celula);
        }
    }
}

function revelarCaixinhaCPU(linha, coluna, tagImagem, matriz) {
    let numeroSecreto = matriz[linha][coluna];
    
    switch (numeroSecreto) {
        case 0: tagImagem.src = "Imagens/wave.png"; Boom.play(); break;
        case 1: tagImagem.src = "Imagens/Ship-1.png"; Xablau.play(); break;
        case 2: tagImagem.src = "Imagens/Ship-2.png"; Xablau.play(); break;
        case 3: tagImagem.src = "Imagens/Ship-3.png"; Xablau.play(); break;
        case 4: tagImagem.src = "Imagens/bomba.png"; Kaboom.play(); break;
    }

    let caixinhaAlvo = document.getElementById("cel-" + linha + "-" + coluna);
    caixinhaAlvo.style.pointerEvents = "none";
    caixinhaAlvo.classList.add("revelada");
}

function turnoDaIACPU(matriz) {
    let tab = document.getElementById("tabuleiro_bem_bolado");
    tab.style.pointerEvents = "none";

    setTimeout(function () {
        if (tirosDisponiveisCPU.length > 0) {
            let indiceSorteado = Math.floor(Math.random() * tirosDisponiveisCPU.length);
            let tiroEscolhido = tirosDisponiveisCPU[indiceSorteado];
            
            tirosDisponiveisCPU.splice(indiceSorteado, 1);

            let botX = tiroEscolhido[0];
            let botY = tiroEscolhido[1];

            let celulaBot = document.getElementById("cel-" + botX + "-" + botY);
            let imgBot = celulaBot.querySelector("img");

            revelarCaixinhaCPU(botX, botY, imgBot, matriz);
        }

        tab.style.pointerEvents = "auto";

        let jaReveladas = document.querySelectorAll(".revelada");
        jaReveladas.forEach(cel => cel.style.pointerEvents = "none");

    }, 1500);
}