// ARRAY QUE VAI PARA A API
let fotos = ["","","","",""];

// --- EVENTO DE PREVIEW + UPLOAD ---
document.querySelectorAll(".inputfoto").forEach(input => {
    input.addEventListener("change", async function () {

        const file = this.files[0];
        const id = this.dataset.id;
        const preview = document.getElementById("preview-" + id);

        if (!file) return;

        // ---------- PREVIEW ----------
        const reader = new FileReader();
        reader.onload = e => {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(file);

        // ---------- UPLOAD ----------
        const formData = new FormData();
        formData.append("foto", file);

        const response = await fetch("uploadFoto.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (!result.success) {
            alert("Erro ao enviar: " + result.error);
            return;
        }

        // Salvar URL no array final
        fotos[id] = result.url;
    });
});


// --- SELEÇÃO SEXO ---
let sexoSelecionado = "";
document.querySelectorAll("[data-sexo]").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("[data-sexo]").forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        sexoSelecionado = btn.dataset.sexo;
    });
});

// --- SELEÇÃO PORTE ---
let porteSelecionado = "";
document.querySelectorAll("[data-porte]").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("[data-porte]").forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        porteSelecionado = btn.dataset.porte;
    });
});



// --- BOTÃO SALVAR ---
document.querySelector("#btnSalvar").addEventListener("click", async () => {

    const payload = {
        nome: document.querySelector("#nome").value,
        descricao: document.querySelector("#descricao").value,
        sexo: sexoSelecionado,
        porte: porteSelecionado,
        idade: Number(document.querySelector("#idade").value),
        id_usuario: 4,
        fotos: fotos.filter(f => f !== "") // tira espaços vazios
    };

    console.log("ENVIANDO PARA API:", payload);

    const response = await fetch("http://localhost/apicaes/api.php?url=api/caes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log(result);
});
