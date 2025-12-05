const API_BASE = "http://localhost/apicaes/api.php?url=api/usuarios";

    async function carregarDados() {

        // ID salvo na hora do login
        const userId = localStorage.getItem("user_id");

        if (!userId) {
            alert("Usuário não logado!");
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/${userId}`);
            const result = await response.json();

            if (result.erro) {
                alert("Erro ao carregar informações.");
                return;
            }

            const dados = result.dados;

            // Coloca os dados nos inputs
            document.getElementById("nome").value = dados.nome || "";
            document.getElementById("email").value = dados.email || "";
            document.getElementById("telefone").value = dados.telefone || "";
            // senha normalmente é deixada vazia
        }
        catch (erro) {
            console.error("Erro ao buscar usuário:", erro);
            alert("Não foi possível carregar os dados");
        }
    }
    // Carregar automaticamente ao abrir a página
    window.onload = carregarDados;


        // 🔹 2) Atualizar dados do usuário
        document.getElementById("formAtualizar").addEventListener("submit", async function (event) {
            event.preventDefault();

            const userId = localStorage.getItem("user_id");

            const dados = {
                nome: document.getElementById("nome").value,
                email: document.getElementById("email").value,
                senha: document.getElementById("senha").value,
                telefone: document.getElementById("telefone").value,
                tipo: "usuario"
            };

            const response = await fetch(`${API_BASE}/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados)
            });

            const result = await response.json();

            alert(result.mensagem);
        });

        // Carrega automaticamente quando abrir página
        window.onload = carregarDados;