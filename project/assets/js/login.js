const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    const dados = { email, senha };

    try {
        const resposta = await fetch("http://localhost/apicaes/index.php?url=api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const json = await resposta.json();

        if (json.erro) {
            alert(json.mensagem);
            return;
        }

        // Salva dados do usuário logado
        localStorage.setItem("usuario", JSON.stringify(json.dados));

        // Redireciona
        window.location.href = "home.html";

    } catch (erro) {
        alert("Erro ao conectar com API.");
        console.error(erro);
    }
});
