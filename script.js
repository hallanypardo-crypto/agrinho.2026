// ============================================
// CONFIGURAÇÃO DO QUIZ
// ============================================

// Array com as perguntas, opções e respostas corretas
const perguntasQuiz = [
    {
        pergunta: "Qual é a principal causa da poluição de nascentes na zona rural?",
        opcoes: [
            "Uso excessivo de agrotóxicos",
            "Chuva ácida",
            "Queimadas naturais",
            "Falta de sol"
        ],
        respostaCorreta: 0  // índice 0 = "Uso excessivo de agrotóxicos"
    },
    {
        pergunta: "O que os agricultores podem fazer para preservar as nascentes?",
        opcoes: [
            "Jogar lixo próximo à nascente",
            "Plantar árvores ao redor e cercar a área",
            "Usar mais agrotóxicos",
            "Drenar toda a água"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual prática ajuda a reduzir o desperdício de água na agricultura?",
        opcoes: [
            "Irrigação por aspersão sem controle",
            "Irrigação por gotejamento",
            "Deixar torneiras abertas",
            "Lavar equipamentos nos rios"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "O que fazer com as embalagens de agrotóxicos após o uso?",
        opcoes: [
            "Jogar no rio",
            "Enterrar no solo",
            "Queimar no campo",
            "Devolver no local de compra para descarte correto"
        ],
        respostaCorreta: 3
    },
    {
        pergunta: "Como a reciclagem no campo ajuda o meio ambiente?",
        opcoes: [
            "Polui mais os rios",
            "Reduz o lixo e evita contaminação do solo e da água",
            "Não faz diferença",
            "Só serve para cidade"
        ],
        respostaCorreta: 1
    }
];

// Variáveis de controle do quiz
let perguntaAtual = 0;
let pontuacao = 0;
let respostasUsuario = []; // Armazena as respostas selecionadas

// Elementos do DOM
const perguntaArea = document.getElementById("pergunta-area");
const resultadoArea = document.getElementById("resultado-area");
const numeroPerguntaElem = document.getElementById("numero-pergunta");
const textoPerguntaElem = document.getElementById("texto-pergunta");
const opcoesArea = document.getElementById("opcoes-area");
const btnProximo = document.getElementById("btn-proximo");
const btnReiniciar = document.getElementById("btn-reiniciar");

// ============================================
// FUNÇÃO PARA CARREGAR A PERGUNTA ATUAL
// ============================================
function carregarPergunta() {
    // Obtém a pergunta atual
    const dadosPergunta = perguntasQuiz[perguntaAtual];
    
    // Exibe número da pergunta (ex: Pergunta 1 de 5)
    numeroPerguntaElem.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}`;
    
    // Exibe o texto da pergunta
    textoPerguntaElem.textContent = dadosPergunta.pergunta;
    
    // Limpa as opções antigas
    opcoesArea.innerHTML = "";
    
    // Cria os botões de opção para cada alternativa
    dadosPergunta.opcoes.forEach((opcao, indice) => {
        const divOpcao = document.createElement("div");
        divOpcao.classList.add("opcao");
        divOpcao.textContent = opcao;
        
        // Se o usuário já respondeu essa pergunta antes, marca a opção selecionada
        if (respostasUsuario[perguntaAtual] === indice) {
            divOpcao.classList.add("selecionada");
        }
        
        // Evento de clique para selecionar a opção
        divOpcao.addEventListener("click", () => {
            selecionarOpcao(indice);
        });
        
        opcoesArea.appendChild(divOpcao);
    });
    
    // Ajusta textos dos botões
    if (perguntaAtual === perguntasQuiz.length - 1) {
        btnProximo.textContent = "✅ Finalizar Quiz";
    } else {
        btnProximo.textContent = "Próxima Pergunta ➡";
    }
    
    // Esconde o botão reiniciar durante o quiz
    btnReiniciar.style.display = "none";
}

// ============================================
// FUNÇÃO PARA SELECIONAR UMA OPÇÃO
// ============================================
function selecionarOpcao(indiceSelecionado) {
    // Remove a classe 'selecionada' de todas as opções
    const todasOpcoes = document.querySelectorAll(".opcao");
    todasOpcoes.forEach(opcao => {
        opcao.classList.remove("selecionada");
    });
    
    // Adiciona a classe 'selecionada' na opção clicada
    todasOpcoes[indiceSelecionado].classList.add("selecionada");
    
    // Salva a resposta do usuário para esta pergunta
    respostasUsuario[perguntaAtual] = indiceSelecionado;
}

// ============================================
// FUNÇÃO PARA AVANÇAR PARA PRÓXIMA PERGUNTA
// ============================================
function proximaPergunta() {
    // Verifica se o usuário selecionou uma resposta para a pergunta atual
    if (respostasUsuario[perguntaAtual] === undefined) {
        alert("⚠️ Por favor, selecione uma resposta antes de continuar!");
        return;
    }
    
    // Verifica se a resposta está correta e acumula pontuação
    const respostaAtual = respostasUsuario[perguntaAtual];
    const respostaCorreta = perguntasQuiz[perguntaAtual].respostaCorreta;
    
    if (respostaAtual === respostaCorreta) {
        pontuacao++;
    }
    
    // Avança para a próxima pergunta
    perguntaAtual++;
    
    // Se ainda há perguntas, carrega a próxima
    if (perguntaAtual < perguntasQuiz.length) {
        carregarPergunta();
    } else {
        // Se acabaram as perguntas, mostra o resultado
        finalizarQuiz();
    }
}

// ============================================
// FUNÇÃO PARA FINALIZAR O QUIZ E MOSTRAR RESULTADO
// ============================================
function finalizarQuiz() {
    // Esconde a área de perguntas
    perguntaArea.style.display = "none";
    // Mostra a área de resultado
    resultadoArea.style.display = "block";
    
    // Calcula percentual de acertos
    const percentual = (pontuacao / perguntasQuiz.length) * 100;
    
    // Exibe pontuação
    const pontuacaoTexto = document.getElementById("pontuacao-texto");
    pontuacaoTexto.innerHTML = `Você acertou ${pontuacao} de ${perguntasQuiz.length} perguntas (${percentual}%)`;
    
    // Mensagem personalizada baseada no desempenho
    const mensagemElem = document.getElementById("mensagem-resultado");
    if (percentual === 100) {
        mensagemElem.innerHTML = "🏆 Excelente! Você é um guardião dos rios! Continue assim! 🌊";
    } else if (percentual >= 60) {
        mensagemElem.innerHTML = "👍 Bom trabalho! Ainda pode aprender mais. Leia as dicas do site! 🌱";
    } else {
        mensagemElem.innerHTML = "📚 Que tal revisar as soluções sustentáveis? Você pode melhorar e ajudar o meio ambiente! 💚";
    }
    
    // Mostra botão reiniciar
    btnReiniciar.style.display = "inline-block";
}

// ============================================
// FUNÇÃO PARA REINICIAR O QUIZ
// ============================================
function reiniciarQuiz() {
    // Reinicia todas as variáveis
    perguntaAtual = 0;
    pontuacao = 0;
    respostasUsuario = [];
    
    // Esconde área de resultado e mostra área de perguntas
    resultadoArea.style.display = "none";
    perguntaArea.style.display = "block";
    
    // Recarrega a primeira pergunta
    carregarPergunta();
}

// ============================================
// EVENTOS DOS BOTÕES DO QUIZ
// ============================================
btnProximo.addEventListener("click", proximaPergunta);
btnReiniciar.addEventListener("click", reiniciarQuiz);

// Botão "Novo Quiz" dentro da área de resultado
const btnNovoQuiz = document.getElementById("btn-novo-quiz");
if (btnNovoQuiz) {
    btnNovoQuiz.addEventListener("click", reiniciarQuiz);
}

// Inicializa o quiz quando a página carrega
carregarPergunta();

// ============================================
// FUNÇÕES DE ACESSIBILIDADE
// ============================================
const btnAcessibilidade = document.getElementById("acessibilidade-btn");
const menuAcessibilidade = document.getElementById("menu-acessibilidade");
const btnAumentar = document.getElementById("aumentar-fonte");
const btnDiminuir = document.getElementById("diminuir-fonte");
const btnContraste = document.getElementById("alto-contraste");

let fonteAtual = 16; // tamanho padrão em px

// Mostrar/Esconder menu de acessibilidade
btnAcessibilidade.addEventListener("click", () => {
    if (menuAcessibilidade.style.display === "none" || menuAcessibilidade.style.display === "") {
        menuAcessibilidade.style.display = "flex";
    } else {
        menuAcessibilidade.style.display = "none";
    }
});

// Aumentar fonte (até 28px)
btnAumentar.addEventListener("click", () => {
    if (fonteAtual < 28) {
        fonteAtual += 2;
        document.body.style.fontSize = fonteAtual + "px";
        document.documentElement.style.setProperty('--fonte-padrao', fonteAtual + 'px');
    }
});

// Diminuir fonte (até 12px)
btnDiminuir.addEventListener("click", () => {
    if (fonteAtual > 12) {
        fonteAtual -= 2;
        document.body.style.fontSize = fonteAtual + "px";
        document.documentElement.style.setProperty('--fonte-padrao', fonteAtual + 'px');
    }
});

// Ativar/Desativar alto contraste
let contrasteAtivo = false;
btnContraste.addEventListener("click", () => {
    if (!contrasteAtivo) {
        document.body.classList.add("alto-contraste");
        contrasteAtivo = true;
        btnContraste.textContent = "🌓 Desativar Contraste";
    } else {
        document.body.classList.remove("alto-contraste");
        contrasteAtivo = false;
        btnContraste.textContent = "🌓 Alto Contraste";
    }
});

// Fechar menu ao clicar fora (opcional)
document.addEventListener("click", (evento) => {
    if (!btnAcessibilidade.contains(evento.target) && !menuAcessibilidade.contains(evento.target)) {
        menuAcessibilidade.style.display = "none";
    }
});
