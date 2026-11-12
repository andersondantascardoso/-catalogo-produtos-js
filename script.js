const produtos = [
    { id: 1, nome: 'Monitor Gamer 24"', preco: 899.90, categoria: 'Eletrônicos' },
    { id: 2, nome: 'Teclado Mecânico RGB', preco: 250.00, categoria: 'Periféricos' },
    { id: 3, nome: 'Mouse sem Fio', preco: 120.50, categoria: 'Periféricos' },
    { id: 4, nome: 'Smartphone 128GB', preco: 1800.00, categoria: 'Eletrônicos' }
];

const form = document.getElementById('formProduto');
const inputNome = document.getElementById('nome');
const inputPreco = document.getElementById('preco');
const selectCategoria = document.getElementById('categoria');
const inputBusca = document.getElementById('busca');
const containerProdutos = document.getElementById('lista-produtos');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

let categoriaAtual = 'Todos';


function renderizarProdutos(lista) {
    if (lista.length === 0) {
        containerProdutos.innerHTML = '<p class="sem-produtos">Nenhum produto encontrado.</p>';
        return;
    }

    const htmlCards = lista.map(produto => {
    const { nome, preco, categoria } = produto;

        return `
            <article class="card-produto">
                <span class="card-categoria">${categoria}</span>
                <h4 class="card-nome">${nome}</h4>
                <p class="card-preco">R$ ${Number(preco).toFixed(2).replace('.', ',')}</p>
            </article>
        `;
    }).join('');

    containerProdutos.innerHTML = htmlCards;
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const novoProduto = {
        id: Date.now(),
        nome: inputNome.value.trim(),
        preco: parseFloat(inputPreco.value),
        categoria: selectCategoria.value
    };
    produtos.push(novoProduto);

    aplicarFiltros();

    form.reset();
});

function aplicarFiltros() {
    const termoBusca = inputBusca.value.toLowerCase().trim();

    const produtosFiltrados = produtos.filter(produto => {
        const { nome, categoria } = produto;
        const bateComBusca = nome.toLowerCase().includes(termoBusca);
        const bateComCategoria = categoriaAtual === 'Todos' || categoria === categoriaAtual;

        return bateComBusca && bateComCategoria;
    });

    renderizarProdutos(produtosFiltrados);
}

inputBusca.addEventListener('input', aplicarFiltros);

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', (e) => {
        botoesFiltro.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        categoriaAtual = e.target.dataset.categoria;
        aplicarFiltros();
    });
});

function produtoExiste(nomeProduto) {
    return produtos.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase());
}

renderizarProdutos(produtos);