// Pega o ID via query string
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function carregarCachorro() {
    try {

        const req = await fetch(`http://localhost/apicaes/api.php?url=api/caes/${id}`);
        const resposta = await req.json();

        if (resposta.erro || !resposta.dados) {
            alert("Cachorro não encontrado!");
            return;
        }

        const cao = resposta.dados;

        // Preenche infos
        document.getElementById("nome").textContent = cao.nome;
        document.getElementById("sexo").textContent =
        cao.sexo === "M" ? "Macho" :
        cao.sexo === "F" ? "Fêmea" :
        "Não informado";
        document.getElementById("porte").textContent = cao.porte;
        document.getElementById("descricao").textContent = cao.descricao;

        // Atualiza as fotos
        carregarFotos(cao.fotos);

        configurarModal();

        // Botão ADOTAR
        document.getElementById("btnAdotar").addEventListener("click", () => {
            window.location.href = `mailto:contato@seudominio.com?subject=Quero adotar ${cao.nome}`;
        });

    } catch (e) {
        console.error("Erro:", e);
        alert("Erro ao carregar cachorro.");
    }
}

carregarCachorro();


// ---------------------------------------------------------
// 🔥 CARREGAR FOTOS NA TELA
// ---------------------------------------------------------
function carregarFotos(fotos) {
    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`photo-${i}`);
        const col = img.parentElement;

        if (!fotos[i - 1]) {
            col.classList.add("hidden-photo-col");
        } else {
            col.classList.remove("hidden-photo-col");
            img.src = fotos[i - 1];   // agora já vem URL completa da API
        }
    }
}


// ---------------------------------------------------------
// 🔥 MODAL DE VISUALIZAÇÃO
// ---------------------------------------------------------
let imagens = [];
let indiceAtual = 0;

function configurarModal() {
    imagens = [];

    const todas = document.querySelectorAll(".foto-cachorro");

    todas.forEach(img => {
        if (img.src && img.src.trim() !== "") {
            imagens.push(img.src);

            img.addEventListener("click", () => {
                abrirModal(imagens.indexOf(img.src));
            });
        }
    });
}

function abrirModal(index) {
    indiceAtual = index;

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");

    modal.style.display = "flex";
    modalImage.src = imagens[indiceAtual];
}

function fecharModal() {
    document.getElementById("imageModal").style.display = "none";
}

function anterior() {
    indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
    document.getElementById("modalImage").src = imagens[indiceAtual];
}

function proxima() {
    indiceAtual = (indiceAtual + 1) % imagens.length;
    document.getElementById("modalImage").src = imagens[indiceAtual];
}

// Eventos
document.querySelector(".close-modal").addEventListener("click", fecharModal);
document.querySelector(".left-arrow").addEventListener("click", anterior);
document.querySelector(".right-arrow").addEventListener("click", proxima);

document.getElementById("imageModal").addEventListener("click", (e) => {
    if (e.target.id === "imageModal") fecharModal();
});

function carregarFotos(fotos) {
    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`photo-${i}`);
        const col = img.parentElement;

        if (!fotos[i - 1]) {
            col.classList.add("hidden-photo-col");
        } else {
            col.classList.remove("hidden-photo-col");
            img.src = fotos[i - 1];
        }
    }
}
