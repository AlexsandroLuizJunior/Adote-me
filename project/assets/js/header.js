// IMPORT HEADER
fetch("../components/header.html")
    .then(res => res.text())
    .then(data => {
        const headerEl = document.getElementById("header");
        if (headerEl) headerEl.innerHTML = data;
    });
