
const cadastro = document.getElementById("cadastro");
const campos = [
    "nome", 
    "telefone", 
    "email", 
    "cep",
    "endereco",
    "numeroEndereco",
    "bairro",
    "cidade",
    "estado",
];

document.getElementById("cep").addEventListener("blur", (evento)=> { 
    const elemento = evento.target;
    const cepInformado = elemento.value;

    if(!(cepInformado.length === 8))
        return;

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                document.getElementById("endereco").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;
            } else {
                alert("CEP não encontrado")
            }
        })
        .catch(erro => console.error("Erro ao buscar o CEP: ",erro));
})

cadastro.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Processando cadastro...");
    console.log("Cadastro realizado");

    const dadosFormulario = {};

    campos.forEach((campo) => {
        dadosFormulario[campo] = document.getElementById(campo).value;        
    });

    localStorage.setItem("cadastro", JSON.stringify(dadosFormulario));
    alert("Cadastro finalizado com sucesso");
    
});


window.addEventListener("DOMContentLoaded", () => {
    const dadosSalvos = localStorage.getItem("cadastro");

    if(dadosSalvos){
        const dados = JSON.parse(dadosSalvos);
        campos.forEach((campo) => {
            if(dados[campo]) {
                document.getElementById(campo).value = dados[campo];
            }
        });
    }
})

document.getElementById("limpar").addEventListener('click', () => {
    if (confirm("Deseja iniciar um novo cadastro? Todos os dados serão apagados."))
    {
        cadastro.reset();
        localStorage.removeItem("cadastro");
        alert("Cadastro reiniciado com sucesso");
    }
})

