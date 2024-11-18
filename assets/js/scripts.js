// Função para carregar o Topo do site, adicionar rolagem suave e controlar o menu mobile
function initializeHeader() {
    // Determine a profundidade do diretório
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    var pathToMenu = "../".repeat(depth) + "part/header.html";

    // Carregar o menu
    const xhr = new XMLHttpRequest();
    xhr.open("GET", pathToMenu, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("header-container").innerHTML = xhr.responseText;

            // Adicionar rolagem suave
            addSmoothScroll();

            // Controlar o menu mobile
            addMobileMenuControl();
        }
    };
    xhr.send();
}

// Função para adicionar eventos de clique para rolagem suave
function addSmoothScroll() {
    var links = document.querySelectorAll("nav ul li a");

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            var href = this.getAttribute("href");

            // Verifica se o link é interno (começa com '#')
            if (href.startsWith("#")) {
                event.preventDefault();

                var targetId = href.substring(1);
                var targetElement = document.getElementById(targetId);

                if (targetElement) {
                    var offsetTop = targetElement.offsetTop;
                    var headerHeight = 50; // Altura do cabeçalho fixo (ajuste conforme necessário)
                    window.scrollTo({
                        top: offsetTop - headerHeight,
                        behavior: "smooth",
                    });
                }
            }
            // Se for link externo, deixa o comportamento padrão
        });
    });
}

// Função para controle do menu mobile
function addMobileMenuControl() {
    const menuMobile = document.querySelector(".menu-mobile");
    const menu = document.querySelector(".menu");
    const contentMenuMobile = document.querySelector(".content-menu-mobile");

    contentMenuMobile.addEventListener("click", function () {
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
            menu.style.maxHeight = "0";
            menuMobile.src = "/assets/svg/menu.svg";
        } else {
            menu.classList.add("open");
            menu.style.maxHeight = menu.scrollHeight + "px";
            menuMobile.src = "/assets/svg/close.svg";
        }
    });
}

// Chama a função de inicialização quando a página carrega
window.onload = initializeHeader;

// Função para carregar o rodapé
function loadFooter() {
    var depth = (window.location.pathname.match(/\//g) || []).length - 1;
    var pathToFooter = "../".repeat(depth) + "part/footer.html";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", pathToFooter, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("footer-container").innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Chama a função de carregar o rodapé quando a página carrega
window.onload = function () {
    initializeHeader();
    loadFooter();
};

document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector(".number-hide");
                const targetElement = entry.target.querySelector(".cont");
                const targetNumber = parseInt(numberElement.textContent.replace(/\./g, ""), 10);

                animateCount(targetElement, targetNumber);
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.number[data-target="counter"]').forEach((number) => {
        observer.observe(number);
    });
});

function animateCount(element, target) {
    let current = 0;
    const duration = 3000;
    const increment = target / (duration / 16);

    function updateCounter() {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString("pt-BR");
        } else {
            element.textContent = Math.ceil(current).toLocaleString("pt-BR");
            requestAnimationFrame(updateCounter);
        }
    }

    updateCounter();
}

window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    if (window.scrollY > 160) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", function () {
            item.classList.toggle("open");
        });
    });
});

async function enviarEmail(subject, content, toRecipients) {
    const url = "https://fn4lvdgkug.execute-api.sa-east-1.amazonaws.com/v1/send";
    const token = "16f322a6907893a1be05afbc1f858552bd3bb9b96ee42f3fcf3536706b61fa26";

    const dados = {
        subject: subject,
        content: content,
        toRecipients: toRecipients,
    };

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: {
                "x-access-token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
        });

        if (resposta.status !== 200) {
            throw new Error(`Erro na requisição: ${resposta.statusText}`);
        }

        // Redirecionar para a página de agradecimento
        window.location.href = "/obrigado.html";
    } catch (erro) {
        console.error("Erro ao enviar requisição:", erro);
    }
}

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let content = ""; // Inicializando a variável para o conteúdo do e-mail
    let subject = ""; // Inicializando a variável para o assunto do e-mail
    let toRecipients = []; // Inicializando a variável para os destinatários

    for (let [key, value] of formData.entries()) {
        if (key === "Assunto") {
            subject = value; // Definindo o assunto do e-mail

            // Definindo os destinatários com base no assunto
            if (subject === "Contato") {
                toRecipients = ["contato@saygogroup.com.br"];
            } else if (subject === "Cadastro") {
                toRecipients = ["cadastro@saygocambio.com.br"];
            } else if (subject === "Canal de Denúncia") {
                toRecipients = ["sac@saygogroup.com.br"];
            } else if (subject === "Contato Tech") {
                toRecipients = ["it@saygotech.com.br"];
            }
        } else {
            const name = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");
            content += `<p><strong>${name}:</strong> ${value}</p>`;
        }
    }

    enviarEmail(subject, content, toRecipients);
});
