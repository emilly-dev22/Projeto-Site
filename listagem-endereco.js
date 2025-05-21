async function listagemEdereco() {
    let token = JSON.parse(localStorage.getItem("user"));

    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token.access_token
        }


    })

    if (api.ok) {
        let response = await api.json()
        let tbody = document.getElementById("listagem");

        tbody.innerHTML = "";

        response.data.forEach(element => {
            let el = `
            <tr>
                <td>${element.title}</td>
                <td>${element.cep}</td>
                <td>${element.address}</td>
                <td>${element.number}</td>
                <td>
                    <a href="#"><button>Atualizar</button></a>
                    <a href="#"><button>Deletar</button></a> 
                </td>
            </tr>
        `;
            tbody.innerHTML += el;
        });

    } else {
        let responseError = await api.json()
        console.log(responseError)
    }



}

listagemEdereco();