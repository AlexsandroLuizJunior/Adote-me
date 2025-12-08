function carregarInteressados() {
    const lista = document.querySelector("#lista-interessados");

    interessados.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("interessado-card");

        card.innerHTML = `
            <div class="interessado-info">
                <h3>${item.cachorro}</h3>
                <p>${item.descricao}</p>
            </div>

            <div class="interessado-contato">
                <p><strong>Nome do interessado:</strong> ${item.interessado}</p>
                <p><strong>Telefone:</strong> ${item.telefone}</p>
                <p><strong>Email:</strong> ${item.email}</p>
            </div>
        `;

        lista.appendChild(card);
    });
}

carregarInteressados();
