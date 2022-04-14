import login from "./pages/home/login.js";
import cadastro from "./pages/home/cadastro.js"
import home from "./pages/home/mainHome.js"

const main = document.querySelector("#main")

const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML="";
        switch (window.location.hash) {
            case " ":
                main.appendChild(home());
                break;
            case "#login":
                main.appendChild(login());
                break;
            case "#cadastro":
                main.appendChild(cadastro());
                break;
            default:
                main.appendChild(home());
        }
    })
}

window.addEventListener("load", () => {
    main.appendChild(home())
    init()
})