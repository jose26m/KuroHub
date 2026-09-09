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
