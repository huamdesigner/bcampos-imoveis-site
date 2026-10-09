// =========================================================
// BCAMPOS IMÓVEIS — JavaScript principal
// =========================================================

// Marca que o JS carregou (libera as animações de entrada no CSS)
document.documentElement.classList.add("js");


// ---------------------------------------------------------
// MENU MOBILE
// ---------------------------------------------------------

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

function definirMenu(aberto) {
    if (!nav || !menuToggle) return;

    nav.classList.toggle("active", aberto);
    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    menuToggle.textContent = aberto ? "✕" : "☰";
}

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {
        definirMenu(!nav.classList.contains("active"));
    });

    // Fecha ao clicar em um link
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => definirMenu(false));
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (event) => {
        if (
            nav.classList.contains("active") &&
            !nav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            definirMenu(false);
        }
    });

    // Fecha com a tecla ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && nav.classList.contains("active")) {
            definirMenu(false);
            menuToggle.focus();
        }
    });

    // Fecha ao aumentar a tela
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) definirMenu(false);
    });
}


// ---------------------------------------------------------
// ANO AUTOMÁTICO NO RODAPÉ
// ---------------------------------------------------------

const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();


// ---------------------------------------------------------
// SOMBRA NO CABEÇALHO AO ROLAR A PÁGINA
// ---------------------------------------------------------

const header = document.querySelector(".header");

function atualizarHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
}

window.addEventListener("scroll", atualizarHeader, { passive: true });
atualizarHeader();


// ---------------------------------------------------------
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
// ---------------------------------------------------------

const elementos = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const alvo = entry.target;
                    alvo.classList.add("visible");
                    observer.unobserve(alvo);

                    // Remove o atraso depois da entrada, para não atrasar o efeito de hover
                    setTimeout(() => { alvo.style.transitionDelay = ""; }, 1000);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elementos.forEach((el, i) => {
        // Pequeno atraso escalonado dentro de cada grade de cards
        const posicao = Array.prototype.indexOf.call(el.parentElement.children, el);
        el.style.transitionDelay = Math.min(posicao, 5) * 70 + "ms";
        observer.observe(el);
    });

} else {
    // Navegadores antigos: mostra tudo direto
    elementos.forEach((el) => el.classList.add("visible"));
}