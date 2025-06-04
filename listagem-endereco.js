async function listagemEndereco() {
    let token = JSON.parse(localStorage.getItem("user"));

    let api = await fetch("https://go-wash-api.onrender.com/api/auth/address", {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": "Bearer " + token.access_token  
        }
    });

    if (api.ok) {
        let response = await api.json(); 
        let tbody = document.getElementById("listagem"); 
        tbody.innerHTML = ""; 

        response.data.forEach(element => {
            let idDoEndereco = element._id || element.id; 

            let el = ` 
            <tr>
                <td>${element.title}</td>
                <td>${element.cep}</td>
                <td>${element.address}</td>
                <td>${element.number}</td>
                <td>
                    <button onclick="atualizar('${idDoEndereco}')">Atualizar</button>
                    <button onclick="deletar('${idDoEndereco}')">Deletar</button>
                </td>
            </tr>
            `;
            tbody.innerHTML += el; 
        });

    } else {
        let responseError = await api.json();
        console.error(responseError);
        alert("Erro ao carregar a lista de endereços.");
    }
}

async function atualizar(id) {
    let token = JSON.parse(localStorage.getItem("user"));

    let api = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token.access_token
        }
    });

    if(api.ok){
        let endereco = await api.json();

        let novoTitulo = prompt("Editar título:", endereco.data.title);
        if (novoTitulo === null) return;

        let novoCep = prompt("Editar CEP:", endereco.data.cep);
        if (novoCep === null) return;

        let novoEndereco = prompt("Editar Endereço:", endereco.data.address);
        if (novoEndereco === null) return;

        let novoNumero = prompt("Editar Número:", endereco.data.number);
        if (novoNumero === null) return;

        let novoComplemento = prompt("Editar Complemento:", endereco.data.complement);
        if (novoComplemento === null) return;

        let updateApi = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.access_token
            },
            body: JSON.stringify({
                title: novoTitulo,
                cep: novoCep,
                address: novoEndereco,
                number: novoNumero,
                complement: novoComplemento
            })
        });

        if(updateApi.ok){
            alert("Endereço atualizado com sucesso!");
            listagemEndereco(); 
        } else {
            let err = await updateApi.json();
            alert("Erro ao atualizar: " + (err.message || "Erro desconhecido"));
        }

    } else {
        let err = await api.json();
        alert("Erro ao buscar dados: " + (err.message || "Erro desconhecido"));
    }
}

async function deletar(id) {
    if (!confirm("Tem certeza que deseja deletar este endereço?")) return;

    let token = JSON.parse(localStorage.getItem("user"));

    let api = await fetch(`https://go-wash-api.onrender.com/api/auth/address/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token.access_token
        }
    });

    if(api.ok){
        alert("Endereço deletado com sucesso!");
        listagemEndereco();
    } else {
        let err = await api.json();
        alert("Erro ao deletar: " + (err.message || "Erro desconhecido"));
    }
}

listagemEndereco();

window.atualizar = atualizar;
window.deletar = deletar;
