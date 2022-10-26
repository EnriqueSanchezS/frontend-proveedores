const form = document.querySelector(".get-proveedor");
const form2 = document.querySelector(".values");
const input = document.querySelector(".get-proveedor input");
const inputs = document.querySelectorAll(".values input");
const formShow = document.querySelector("#show-info");


let myAlertInfo = document.querySelector("#toast-info");
let myAlertSuccess = document.querySelector("#toast-success");
let myAlertDanger = document.querySelector("#toast-danger");
let infoAlert = new bootstrap.Toast(myAlertInfo);
let sucAlert = new bootstrap.Toast(myAlertSuccess);
let daAlert = new bootstrap.Toast(myAlertDanger);

let inputId = "";

const valuesForm = {
    title: "",
    client_id: "",
    email: "",
    name: "",
    surname: "",
    rfc: "",
    regimen_fiscal: "",
    street: "",
    country: "",
    region: "",
    city: "",
    cp: ""
};

const getProveedor = async (id = "") => {
    let url = `http://localhost:3001/api/proveedores/${id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const updateProveedor = async (id = "", data = {}) => {
    let url = `http://localhost:3001/api/proveedores/${id}`
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}


input.addEventListener("blur", event => {
    inputId = event.target.value;
});

form.addEventListener("submit", event => {
    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
    } else {
        event.preventDefault();
        event.stopPropagation();
        form.classList.remove("was-validated");
        getProveedor(inputId)
            .then(data => {
                input.value = "";
                const { data: datos } = data;
                inputs.forEach(input => {
                    input.value = datos[input.name];
                })
                formShow.classList.remove("invisible");
                formShow.classList.add("visible");
            })
            .catch(error => {
                console.log(error);
                infoAlert.show();
            })
    }
});

form2.addEventListener("submit", event => {
    if (!form2.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form2.classList.add('was-validated');
    } else {
        event.preventDefault();
        event.stopPropagation();
        form2.classList.remove("was-validated");
        inputs.forEach(input => {
            valuesForm[input.name] = input.value;
            input.value = "";
        })
        updateProveedor(inputId, valuesForm)
            .then(data => {
                sucAlert.show();
                setTimeout(() => {
                    formShow.classList.remove("visible");
                    formShow.classList.add("invisible");
                }, 1000)
            })
            .catch(error => {
                daAlert.show();
            })
    }
});
