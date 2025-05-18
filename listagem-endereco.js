async function listagemEdereco() {
    let token = JSON.parse(localStorage.getItem("user"));
    
    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method:"GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token.access_token
         }
    })

    if (api.ok) {
        let response = await api.json()
        console.log(response); // Fazer com que o endereco retornado pela API apareça na tabela do HTML
    } else {
        let responseError = await api.json()
        console.log(responseError)
    }
    
}

listagemEdereco();