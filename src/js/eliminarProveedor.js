const form = document.querySelector(".get-proveedor");
const input = document.querySelector(".get-proveedor input");
const inputs = document.querySelectorAll(".values input");
const formShow = document.querySelector("#show-info");

let myAlertWarning = document.querySelector("#toast-warning");
let myAlertDanger = document.querySelector("#toast-danger");
let myAlertInfo = document.querySelector("#toast-info");
let waAlert = new bootstrap.Toast(myAlertWarning);
let daAlert = new bootstrap.Toast(myAlertDanger);
let infoAlert = new bootstrap.Toast(myAlertInfo);

let inputId = "";

const getProveedor = async (id) => {
    let url = `http://localhost:3001/api/proveedores/${id}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const deleteProveedor = async (id) => {
    let url = `http://localhost:3001/api/proveedores/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
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

                deleteProveedor(inputId)
                    .then(data => {
                        input.value = "";
                        waAlert.show();
                        setTimeout(() => {
                            formShow.classList.remove("visible");
                            formShow.classList.add("invisible");
                        }, 3000)
                    })
                    .catch(error => {
                        input.value = "";
                        daAlert.show();
                    })
            })
            .catch(error => {
                infoAlert.show();
            })

    }
});