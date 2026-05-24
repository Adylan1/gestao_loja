/* ======================================================
   MISSAVASTORE - APP.JS
   Sistema simples de gestão de lojas
====================================================== */

/* =========================
   CONFIGURAÇÃO DA API
========================= */

const API_URL = "../../backend/api";

/* =========================
   AUTENTICAÇÃO
========================= */

const Auth = {

    // Guardar sessão
    salvarSessao(usuario){
        sessionStorage.setItem(
            "ms_user",
            JSON.stringify(usuario)
        );
    },

    // Obter sessão
    obterSessao(){
        const user = sessionStorage.getItem("ms_user");

        return user ? JSON.parse(user) : null;
    },

    // Logout
    logout(){

        sessionStorage.removeItem("ms_user");

        window.location.href = "../login/index.html";
    },

    // Verificar login
    verificar(){

        const user = this.obterSessao();

        if(!user){

            window.location.href = "../login/index.html";
        }

        return user;
    }
};

/* =========================
   LOGIN
========================= */

const form = document.querySelector("form");

if(form){

    form.addEventListener("submit", async function(e){

        e.preventDefault();

        // Inputs
        const email = document.querySelector(
            'input[type="email"]'
        ).value;

        const senha = document.querySelector(
            'input[type="password"]'
        ).value;

        // Tipo de acesso
        const tipo = document.querySelector(
            'input[name="tipo_acesso"]:checked'
        ).parentElement.textContent.trim();

        // Dados
        const dados = {
            email,
            senha,
            tipo
        };

        try{

            const resposta = await fetch(
                `${API_URL}/login.php`,
                {
                    method: "POST",

                    headers:{
                        "Content-Type":"application/json"
                    },

                    body: JSON.stringify(dados)
                }
            );

            const resultado = await resposta.json();

            // Login correcto
            if(resultado.success){

                // Guardar sessão
                Auth.salvarSessao(resultado.usuario);

                alert("Login realizado com sucesso!");

                // Redirecionar
                if(resultado.usuario.tipo === "Administrador"){

                    window.location.href =
                    "../dashboard/admin.html";

                }else{

                    window.location.href =
                    "../dashboard/user.html";
                }

            }else{

                alert(resultado.message);
            }

        }catch(erro){

            console.log(erro);

            alert("Erro ao conectar ao servidor");
        }

    });

}

/* =========================
   UTILITÁRIOS
========================= */

// Formatar moeda
function formatarDinheiro(valor){

    return new Intl.NumberFormat(
        "pt-MZ",
        {
            style:"currency",
            currency:"MZN"
        }
    ).format(valor);
}

// Formatar data
function formatarData(data){

    return new Date(data).toLocaleDateString(
        "pt-PT"
    );
}

/* =========================
   EXPORTAR GLOBALMENTE
========================= */

window.Auth = Auth;
window.formatarDinheiro = formatarDinheiro;
window.formatarData = formatarData;