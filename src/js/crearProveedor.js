
const inputs = document.querySelectorAll(".needs-validation input");
const form =  document.querySelectorAll(".needs-validation");

let myAlertSuccess = document.querySelector("#toast-success");
let myAlertDanger = document.querySelector("#toast-danger");
let sucAlert = new bootstrap.Toast(myAlertSuccess);
let daAlert = new bootstrap.Toast(myAlertDanger); 

const valuesForm = {title: "", 
                    client_id: "", 
                    email: "", 
                    name: "", 
                    surname: "", 
                    rfc: "", 
                    regimen_fiscal: "", 
                    street:"", 
                    country: "", 
                    region: "", 
                    city: "", 
                    cp: ""
                   };

const sendForm = async (url = "", data = {}) => {
    
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
          }
    });

    return response.json();
}

inputs.forEach(input => {
    input.addEventListener("blur", event => {
        valuesForm[event.target.name] = event.target.value; 
        if (!input.checkValidity()) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });

    input.addEventListener("keyup", event => {
        valuesForm[event.target.name] = event.target.value; 
        if (!input.checkValidity()) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        } else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });
}); 

form.forEach(form => {
    form.addEventListener("submit", event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation(); 
          form.classList.add("was-validated");
        } else {
            event.preventDefault();
            event.stopPropagation();
            form.classList.remove("was-validated");
            sendForm("http://localhost:3001/api/proveedores", valuesForm)
            .then(data => {
                inputs.forEach(input => {
                    input.value = "";
                    input.classList.remove("is-valid");
                });
                sucAlert.show();
            })
            .catch(error => {
                inputs.forEach(input => {
                    input.value = "";
                    input.classList.remove("is-valid");
                });
                daAlert.show(); 
            })
        }
    });
});