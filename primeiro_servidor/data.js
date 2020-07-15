module.exports = {
    menu: [
        { name: "Ínicio", href: "/" },
        { name: "Comunidade", href: "https://discordapp.com/invite/gCRAFhc" },
        { name: "Email", href: "mailto:oi@rocketseat.com.br" },
        { name: "Telefone", href: "tel:+5547992078767" },
        { name: "Sobre", href: "/about" },
        { name: "Conteúdo", href: "/content" }
    ],

    about: {
        name: "Rocketseat",
        introduction: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
        tecnologies: ["HTML", "CSS", "JavaScript"],
        socialMidias: [
            {
                name: "Github",
                src: "https://github.com/Rocketseat"
            },
            {
                name: "Instagram",
                src: "https://www.instagram.com/rocketseat_oficial"
            },
            {
                name: "Facebook",
                src: "https://www.facebook.com/rocketseat"
            }
        ]
    },

    courses: [
        {
            id: "starter",
            src: "https://app.rocketseat.com.br/static/media/Starter.64c237cc.svg",
            href: "starter",
            modules: "5 módulos",
            price: "free"
        },

        {
            id: "launchbase",
            src: "https://app.rocketseat.com.br/static/media/LaunchBase.08285320.svg",
            href: "launchbase",
            modules: "15 módulos",
            price: "R$1,000.00"
        },

        {
            id: "gostack",
            src: "https://app.rocketseat.com.br/static/media/GoStack.83a178a0.svg",
            href: "gostack",
            modules: "20 módulos",
            price: "R$2,000.00"
        }
    ]
}

