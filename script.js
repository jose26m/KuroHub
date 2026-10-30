
document.addEventListener("DOMContentLoaded", function () {
    const botoesCategoria = document.querySelectorAll(".btn-categoria");
    const cardsJogos = document.querySelectorAll(".game-card");
    const campoBusca = document.getElementById("campo-busca");
    const tituloPagina = document.getElementById("titulo-pagina");
    const seletorOrdenacao = document.getElementById("ordenar-jogos");
    const gradeJogos = document.getElementById("grid-jogos");

    // Essa função aplica o tema escolhido e atualiza o ícone do botão.
function aplicarTema(tema) {
    const temaClaro = tema === "claro";

    document.body.classList.toggle("tema-claro", temaClaro);

    const botaoTema = document.getElementById("alternar-tema");

    if (botaoTema) {
        botaoTema.textContent = temaClaro ? "🌙" : "☀️";
        botaoTema.setAttribute(
            "aria-label",
            temaClaro ? "Ativar tema escuro" : "Ativar tema claro"
        );
    }
}
const temaSalvo = localStorage.getItem("temaKuroHub");

aplicarTema(temaSalvo || "escuro");

// Essa função alterna entre o tema claro e o tema escuro.
function alternarTema() {
    const temaAtual = document.body.classList.contains("tema-claro")
        ? "claro"
        : "escuro";

    const novoTema = temaAtual === "claro" ? "escuro" : "claro";

    localStorage.setItem("temaKuroHub", novoTema);

    aplicarTema(novoTema);
}

// Essa função permite abrir a pesquisa usando a tecla K.
function ativarAtalhoPesquisa() {
    document.addEventListener("keydown", function (evento) {
        if (
            evento.key.toLowerCase() === "k" &&
            !evento.ctrlKey &&
            !evento.altKey &&
            !evento.metaKey
        ) {
            const elemento = evento.target;

            if (
                elemento.tagName === "INPUT" ||
                elemento.tagName === "TEXTAREA" ||
                elemento.isContentEditable
            ) {
                return;
            }

            evento.preventDefault();

            if (campoBusca) {
                campoBusca.focus();
            }
        }
    });
}

    // Essa função transforma o texto em minúsculas, remove acentos e espaços extras para facilitar as comparações.
    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // Essa função identifica qual categoria está selecionada pelo usuário.
    function obterCategoriaSelecionada() {
        const botaoAtivo = document.querySelector(".btn-categoria.active");

        return botaoAtivo
            ? botaoAtivo.dataset.categoria || "todos"
            : "todos";
    }

    // Essa função filtra os jogos de acordo com o nome pesquisado e a categoria selecionada.
    function filtrarJogos() {
        const termoBusca = normalizarTexto(
            campoBusca ? campoBusca.value : ""
        );

        const categoriaSelecionada = obterCategoriaSelecionada();

        cardsJogos.forEach(function (card) {
            const elementoTitulo = card.querySelector(".game-title");

            const nomeJogo = normalizarTexto(
                elementoTitulo ? elementoTitulo.textContent : ""
            );

            const genero = normalizarTexto(card.dataset.genero || "");

            const correspondeNome = nomeJogo.includes(termoBusca);

            const correspondeCategoria =
                categoriaSelecionada === "todos" ||
                genero === normalizarTexto(categoriaSelecionada);

            card.classList.toggle(
                "hidden",
                !(correspondeNome && correspondeCategoria)
            );
        });

        const mensagemVazia = document.getElementById("mensagem-vazia");

    if (mensagemVazia) {
        const encontrouJogo = Array.from(cardsJogos).some(function (card) {
            return !card.classList.contains("hidden");
        });

        mensagemVazia.classList.toggle("hidden", encontrouJogo);
    }
     }

    botoesCategoria.forEach(function (botao) {
        botao.addEventListener("click", function (evento) {
            evento.preventDefault();

            botoesCategoria.forEach(function (outroBotao) {
                outroBotao.classList.remove("active");
            });

            botao.classList.add("active");

            const categoria = botao.dataset.categoria || "todos";

            if (tituloPagina) {
                tituloPagina.textContent =
                    categoria === "todos"
                        ? "Adicionados Recentemente"
                        : "Jogos de " + botao.textContent.trim();
            }

            filtrarJogos();
        });
    });

    if (campoBusca) {
        campoBusca.addEventListener("input", filtrarJogos);
    }

    if (seletorOrdenacao) {
    seletorOrdenacao.addEventListener("change", ordenarJogos);
}
const botaoTema = document.getElementById("alternar-tema");

if (botaoTema) {
    botaoTema.addEventListener("click", alternarTema);
}

// Essa função organiza os jogos pelo nome, em ordem crescente ou decrescente.
function ordenarJogos() {
    if (!seletorOrdenacao || !gradeJogos) {
        return;
    }

    const jogos = Array.from(cardsJogos);

    if (seletorOrdenacao.value === "az") {
        jogos.sort(function (a, b) {
            return a.querySelector(".game-title").textContent.localeCompare(
                b.querySelector(".game-title").textContent
            );
        });
    } else if (seletorOrdenacao.value === "za") {
        jogos.sort(function (a, b) {
            return b.querySelector(".game-title").textContent.localeCompare(
                a.querySelector(".game-title").textContent
            );
        });
    }

    jogos.forEach(function (jogo) {
        gradeJogos.appendChild(jogo);
    });
}

    filtrarJogos();

const bancoDeJogos = [
    {
        nome: "MiSide",
        url: "miside.html",
        imagem: "miside.jpg",
        genero: "terror",
        categoria: "Terror Psicológico"
    },
    {
        nome: "The Karaoke",
        url: "tkaraoke.html",
        imagem: "karaoke.jpg",
        genero: "terror",
        categoria: "Terror Psicológico"
    },
    {
        nome: "Persona 5 Royal",
        url: "persona.html",
        imagem: "persona.jpg",
        genero: "rpg",
        categoria: "RPG japonês"
    },
    {
        nome: "DAVE THE DIVER",
        url: "dave.html",
        imagem: "dave.jpg",
        genero: "aventura",
        categoria: "Aventura e simulação"
    }
];
    const containerSemelhantes =
        document.getElementById("jogos-semelhantes");

    if (containerSemelhantes) {
        const generoAtual = normalizarTexto(
            document.body.dataset.generoAtual || ""
        );

        const tituloAtualElemento = document.querySelector(
            ".titulo-jogo-interno"
        );

        const tituloAtual = normalizarTexto(
            tituloAtualElemento
                ? tituloAtualElemento.textContent.split("|")[0]
                : ""
        );

        if (generoAtual && tituloAtual) {
            const jogosSemelhantes = bancoDeJogos.filter(function (jogo) {
                return (
                    normalizarTexto(jogo.genero) === generoAtual &&
                    normalizarTexto(jogo.nome) !== tituloAtual
                );
            });

            if (jogosSemelhantes.length > 0) {
                containerSemelhantes.innerHTML = "";

                jogosSemelhantes.forEach(function (jogo) {
                    const card = document.createElement("div");
                    card.className = "game-card";

                    const imagem = document.createElement("img");
                    imagem.src = jogo.imagem;
                    imagem.alt = "Capa de " + jogo.nome;
                    imagem.className = "game-thumb";

                    const informacoes = document.createElement("div");
                    informacoes.className = "game-info";

                    const titulo = document.createElement("div");
                    titulo.className = "game-title";
                    titulo.textContent = jogo.nome;

                    const categoria = document.createElement("div");
                    categoria.className = "game-category";
                    categoria.textContent = jogo.categoria;

                    const link = document.createElement("a");
                    link.href = jogo.url;
                    link.className = "btn-download";
                    link.textContent = "Ver jogo";

                    informacoes.appendChild(titulo);
                    informacoes.appendChild(categoria);
                    informacoes.appendChild(link);

                    card.appendChild(imagem);
                    card.appendChild(informacoes);

                    containerSemelhantes.appendChild(card);
                });
            } else {
                containerSemelhantes.textContent =
                    "Nenhum outro jogo semelhante encontrado no momento.";
            }
        }
    }
    ativarAtalhoPesquisa();

});

const videoAnuncio = document.getElementById("video-anuncio");
const telaAnuncio = document.getElementById("tela-anuncio");

if (videoAnuncio && telaAnuncio) {
    videoAnuncio.addEventListener("ended", function () {
        telaAnuncio.classList.add("oculto");
    });
}