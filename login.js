document.getElementById("login").addEventListener("submit", async function (event) {
    event.preventDefault();
    await login();
});


async function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let url = "https://go-wash-api.onrender.com/api/login"
    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
            "user_type_id": 1
        }),
        headers: { "Content-Type": "application/json" },
    })

    if (api.ok) {
        let response = await api.json()
        localStorage.setItem("user", JSON.stringify(response))
        alert("login com sucesso")
        window.location.href="listagem-endereco.html"
    } else {
        let responseError = await api.json()
        alert(responseError.data.errors)
    }
}