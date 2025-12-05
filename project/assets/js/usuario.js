async function carregarUsuario() {
    const id = usuarioLogado.id;

    try {
        const response = await fetch(`http://localhost/apicaes/index.php?url=api/usuarios/${id}`);
        const json = await response.json();

        if (json.erro) {
            alert("Erro ao carregar dados do usuário");
            return;
        }

        const dados = json.dados;

        document.querySelector("#user-nome").innerText = dados.nome;
        document.querySelector("#user-email").innerText = dados.email;
        document.querySelector("#user-telefone").innerText = dados.telefone;

        console.log( id);

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar informações do usuário.");
    }
}

carregarUsuario();
