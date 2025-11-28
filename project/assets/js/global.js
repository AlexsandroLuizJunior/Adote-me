// IMPORT HEADER
fetch("../components/header.html")
    .then(res => res.text())
    .then(data => {
        const headerEl = document.getElementById("header");
        if (headerEl) headerEl.innerHTML = data;
    });

// IMPORT FOOTER
fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
        const footerEl = document.getElementById("footer");
        if (footerEl) footerEl.innerHTML = data;
    });

// BOTÕES SEXO & PORTE (APÓS O DOM CARREGAR)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.btn-option').forEach(btn => {
        btn.addEventListener('click', () => {

            const parent = btn.parentElement;

            // Remove classe "ativo" de todos os irmãos
            parent.querySelectorAll('.btn-option').forEach(b =>
                b.classList.remove('ativo')
            );

            // Ativa somente o clicado
            btn.classList.add('ativo');
        });
    });
});
