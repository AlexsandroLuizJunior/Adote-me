document.getElementById("formCadastro").addEventListener("submit", async function (e) {
    e.preventDefault();

    const url = "http://localhost/apicaes/api.php?url=api/usuarios";

    const data = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        telefone: document.getElementById("telefone").value,
        tipo: document.getElementById("tipo").value // oculto, mas enviado
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "login.html";
        } else {
            alert("Erro: " + result.mensagem);
        }

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar à API.");
    }
});
