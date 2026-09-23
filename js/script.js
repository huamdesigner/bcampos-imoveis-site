// =========================================================
// BCAMPOS IMÓVEIS
// JavaScript principal
// =========================================================


// =========================================================
// MENU MOBILE
// =========================================================

const menuToggle = document.getElementById("menuToggle");

const nav = document.getElementById("nav");


if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("active");

        const menuAberto =
            nav.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            menuAberto
        );

        menuToggle.setAttribute(
            "aria-label",
            menuAberto
                ? "Fechar menu"
                : "Abrir menu"
        );

    });


    // Fecha o menu ao clicar em um link

    document
        .querySelectorAll(".nav a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

}


// =========================================================
// ANO AUTOMÁTICO NO RODAPÉ
// =========================================================

const year = document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


// =========================================================
// FECHAR MENU AO REDIMENSIONAR A TELA
// =========================================================

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 768 &&
        nav
    ) {

        nav.classList.remove("active");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Abrir menu"
            );

        }

    }

});


// =========================================================
// FECHAR MENU AO CLICAR FORA
// =========================================================

document.addEventListener("click", (event) => {

    if (
        !nav ||
        !menuToggle
    ) {
        return;
    }


    const clicouNoMenu =
        nav.contains(event.target);

    const clicouNoBotao =
        menuToggle.contains(event.target);


    if (
        nav.classList.contains("active") &&
        !clicouNoMenu &&
        !clicouNoBotao
    ) {

        nav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }

});


// =========================================================
// ANIMAÇÃO SUAVE DOS CARDS
// =========================================================

const cards = document.querySelectorAll(
    ".service-card, .area-card, .feature"
);


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    cards.forEach((card) => {

        observer.observe(card);

    });

}