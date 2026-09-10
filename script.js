document.addEventListener('DOMContentLoaded', () => {
    const botoesCategoria = document.querySelectorAll('.btn-categoria');
    const cardsJogos = document.querySelectorAll('.game-card');
    const campoBusca = document.getElementById('campo-busca');
    const tituloPagina = document.getElementById('titulo-pagina');

    // FUNÇÃO PARA FILTRAR OS JOGOS
    function filtrarJogos() {
        const termoBusca = campoBusca.value.toLowerCase();
        const categoriaAtiva = document.querySelector('.btn-categoria.active').dataset.categoria;

        cardsJogos.forEach(card => {
            const tituloJogo = card.querySelector('.game-title').textContent.toLowerCase();
            const generoJogo = card.dataset.genero;

            const bateComBusca = tituloJogo.includes(termoBusca);
            const bateComCategoria = (categoriaAtiva === 'todos' || generoJogo === categoriaAtiva);

            // Mostra o card se ele corresponder à busca E à categoria selecionada
            if (bateComBusca && bateComCategoria) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // EVENTO DE CLIQUE NAS CATEGORIAS
    botoesCategoria.forEach(botao => {
        botao.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove a classe ativa de todos e adiciona no clicado
            botoesCategoria.forEach(b => b.classList.remove('active'));
            botao.classList.add('active');

            // Atualiza o título dinamicamente
            if(botao.dataset.categoria === 'todos') {
                tituloPagina.textContent = "Adicionados Recentemente";
            } else {
                tituloPagina.textContent = `Jogos de ${botao.textContent}`;
            }

            filtrarJogos();
        });
    });

    // EVENTO DE DIGITAÇÃO NA BARRA DE BUSCA
    campoBusca.addEventListener('input', filtrarJogos);
});

// ==========================================================================
// SISTEMA AUTOMÁTICO DE JOGOS SEMELHANTES (COMPATÍVEL COM GITHUB PAGES)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const containerSemelhantes = document.getElementById('jogos-semelhantes');
    
    // Se não estivermos em uma página de jogo, interrompe a execução
    if (!containerSemelhantes || !document.body.dataset.generoAtual) return;

    const generoAtual = document.body.dataset.generoAtual.toLowerCase();
    
    // Pega o título real do jogo escrito no H1 e força ficar minúsculo
    const elementoTituloInterno = document.querySelector('.titulo-jogo-interno');
    const tituloJogoAtual = elementoTituloInterno ? elementoTituloInterno.textContent.trim().toLowerCase() : "";

    // Cadastro de todos os jogos do seu site
    const bancoDeJogos = [
        {
            titulo: "MiSide",
            url: "miside.html",
            imagem: "miside.jpg", 
            categoria: "Terror Psicológico",
            genero: "terror"
        },
        {
            titulo: "The Karaoke",
            url: "tkaraoke.html", // Certifique-se de que o seu arquivo se chama tkaraoke.html igual aqui
            imagem: "karaoke.jpg",
            categoria: "Terror Psicológico",
            genero: "terror"
        },
    ];

    // FILTRO BLINDADO: Ignora completamente letras maiúsculas/minúsculas
    const jogosFiltrados = bancoDeJogos.filter(jogo => {
        const nomeJogoBanco = jogo.titulo.toLowerCase();
        const generoJogoBanco = jogo.genero.toLowerCase();
        
        // Compara de forma segura se um título contém o outro sem diferenciar caixas
        const ehOMesmoJogo = tituloJogoAtual.includes(nomeJogoBanco) || nomeJogoBanco.includes(tituloJogoAtual);
        
        return generoJogoBanco === generoAtual && !ehOMesmoJogo;
    });

    // Se não houver nenhum outro jogo do mesmo gênero cadastrado
    if (jogosFiltrados.length === 0) {
        containerSemelhantes.innerHTML = `<p style="color: var(--texto-cinza); font-style: italic; grid-column: 1/-1; text-align: center; width: 100%;">Nenhum outro jogo semelhante encontrado no momento.</p>`;
        return;
    }

    // Injeta os cards estruturados limpando o container antes
    containerSemelhantes.innerHTML = "";
    jogosFiltrados.forEach(jogo => {
        const cardHTML = `
            <div class="game-card">
                <img src="${jogo.imagem}" alt="${jogo.titulo}" class="game-thumb">
                <div class="game-info">
                    <div class="game-title">${jogo.titulo}</div>
                    <div class="game-category">${jogo.categoria}</div>
                    <a href="${jogo.url}" class="btn-download">Ver Jogo</a>
                </div>
            </div>
        `;
        containerSemelhantes.innerHTML += cardHTML;
    });
});