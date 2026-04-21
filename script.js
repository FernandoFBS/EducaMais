// 1. NOSSO BANCO DE DADOS (As 20 Palavras)
const bancoDePalavras = [
    { palavra: "BOLA", silabas: ["BO", "LA"] },
    { palavra: "PATO", silabas: ["PA", "TO"] },
    { palavra: "GATO", silabas: ["GA", "TO"] },
    { palavra: "SAPO", silabas: ["SA", "PO"] },
    { palavra: "DADO", silabas: ["DA", "DO"] },
    { palavra: "FADA", silabas: ["FA", "DA"] },
    { palavra: "VACA", silabas: ["VA", "CA"] },
    { palavra: "BOLO", silabas: ["BO", "LO"] },
    { palavra: "LUVA", silabas: ["LU", "VA"] },
    { palavra: "MALA", silabas: ["MA", "LA"] },
    { palavra: "DEDO", silabas: ["DE", "DO"] },
    { palavra: "COPO", silabas: ["CO", "PO"] },
    { palavra: "MESA", silabas: ["ME", "SA"] },
    { palavra: "LIXO", silabas: ["LI", "XO"] },
    { palavra: "FOCA", silabas: ["FO", "CA"] },
    { palavra: "TETO", silabas: ["TE", "TO"] },
    { palavra: "SUCO", silabas: ["SU", "CO"] },
    { palavra: "LOBO", silabas: ["LO", "BO"] },
    { palavra: "MATO", silabas: ["MA", "TO"] },
    { palavra: "RATO", silabas: ["RA", "TO"] }
];

// 2. LIGAÇÃO COM O HTML
const areaConstrucao = document.getElementById('palavra-montada');
const bancoSilabas = document.getElementById('banco-silabas');
const feedback = document.getElementById('feedback');
const mensagemTexto = document.getElementById('mensagem-texto');

// 3. CONTROLE DO JOGO
let indiceAtual = 0;
let respostaTemporaria = "";

// 4. FUNÇÃO QUE PREPARA A TELA
function iniciarFase() {
    areaConstrucao.innerHTML = "";
    bancoSilabas.innerHTML = "";
    feedback.classList.add('oculto');
    respostaTemporaria = "";

    const dadosPalavra = bancoDePalavras[indiceAtual];
    
    // Embaralha as sílabas
    const silabasEmbaralhadas = [...dadosPalavra.silabas].sort(() => Math.random() - 0.5);

    // Cria os botões na tela
    silabasEmbaralhadas.forEach(silaba => {
        const botao = document.createElement('button');
        botao.innerText = silaba;
        botao.classList.add('btn-silaba');
        
        botao.onclick = () => selecionarSilaba(silaba, botao);
        
        bancoSilabas.appendChild(botao);
    });
}

// 5. FUNÇÃO DE CLIQUE NA SÍLABA
function selecionarSilaba(silaba, botao) {
    respostaTemporaria += silaba; 
    
    const span = document.createElement('span');
    span.innerText = silaba;
    areaConstrucao.appendChild(span);
    
    botao.style.display = "none";

    const palavraCorreta = bancoDePalavras[indiceAtual].palavra;
    if (respostaTemporaria.length >= palavraCorreta.length) {
        validarResposta();
    }
}

// 6. FUNÇÃO QUE VERIFICA O ACERTO OU ERRO
function validarResposta() {
    const palavraCorreta = bancoDePalavras[indiceAtual].palavra;

    if (respostaTemporaria === palavraCorreta) {
        feedback.classList.remove('oculto');
        mensagemTexto.innerText = "🌟 Parabéns! Você formou: " + palavraCorreta;
        indiceAtual++; 
        
        // Se acabaram as palavras, avisa o jogador
        if(indiceAtual >= bancoDePalavras.length) {
            mensagemTexto.innerText = "🏆 Fim de jogo! Você completou todas as palavras!";
            document.querySelector('#feedback button').style.display = "none"; // Esconde o botão de próxima
        }
    } else {
        alert("Quase lá! Vamos tentar essa palavra de novo?");
        iniciarFase(); 
    }
}

// 7. FUNÇÃO PARA AVANÇAR DE FASE (Chamada pelo botão verde do HTML)
function proximaFase() {
    iniciarFase();
}

// INICIA O JOGO ASSIM QUE A PÁGINA CARREGA
iniciarFase();