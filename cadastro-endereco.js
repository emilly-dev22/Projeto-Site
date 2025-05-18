document.getElementById("cadastro-endereco").addEventListener("submit", async function (event) {
    event.preventDefault();
    await cadastradoEdereco();
});


async function cadastradoEdereco() {
    let token = JSON.parse(localStorage.getItem("user"));

    let titulo = document.getElementById("titulo").value
    let cep = document.getElementById("cep").value
    let endereco = document.getElementById("endereco").value
    let numero = document.getElementById("numero").value
    let complemento = document.getElementById("complemento").value

    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "POST",
        body: JSON.stringify({
            "title": titulo,
            "cep": cep,
            "address": endereco,
            "number": numero,
            "complement": complemento
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.access_token
        }
    })

    if (api.ok) {
        let response = await api.json()
        alert("Cadastro feito com sucesso!...")
        window.location.href="listagem-endereco.html"
    } else {
        let responseError = await api.json()
        console.log(responseError)
    }

}