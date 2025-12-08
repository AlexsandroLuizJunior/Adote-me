async function carregarCaes() {
    const lista = document.querySelector("#lista-cachorros");

    try {
        const request = await fetch("http://localhost/apicaes/api.php?url=api/caes");
        const response = await request.json();

        console.log("Resposta da API:", response);

        if (!response.dados || response.dados.length === 0) {
            lista.innerHTML = "<p>Nenhum cachorro encontrado.</p>";
            return;
        }

        response.dados.forEach(cao => {

            // foto principal
            const fotoPrincipal = (cao.fotos && cao.fotos.length > 0)
                ? cao.fotos[0]
                : "../assets/imgs/placeholder-dog.png"; // coloque uma imagem sua aqui

            const card = `
                <div class="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-5">
                    <div class="card">

                        <img src="${fotoPrincipal}" class="card-img-top" alt="${cao.nome}">

                        <div class="card-body">
                            <h4 class="card-title">${cao.nome}</h4>

                            <p><strong>Idade:</strong> ${cao.idade} anos</p>
                            <p><strong>Porte:</strong> ${cao.porte}</p>

                            <div class="text-container">
                                <p class="card-text">${cao.descricao}</p>
                            </div>

                            <a href="visualizar-cachorro.html?id=${cao.id}" class="btn-adotar">
                                ADOTAR
                            </a>
                        </div>
                    </div>
                </div>
            `;

            lista.insertAdjacentHTML("beforeend", card);
        });

    } catch (error) {
        console.error("Erro ao carregar cães:", error);
        lista.innerHTML = "<p>Erro ao carregar dados.</p>";
    }
}

carregarCaes();
