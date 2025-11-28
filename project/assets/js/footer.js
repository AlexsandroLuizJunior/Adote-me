// IMPORT FOOTER
fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
        const footerEl = document.getElementById("footer");
        if (footerEl) footerEl.innerHTML = data;
    });