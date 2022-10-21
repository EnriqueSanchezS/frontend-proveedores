
const inputs = document.querySelectorAll(".needs-validation input");
const form =  document.querySelectorAll(".needs-validation");

const valuesForm = {title: "", 
                    idClient: "", 
                    email: "", 
                    nameA: "", 
                    surName: "", 
                    rfc: "", 
                    fiscal: "", 
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
            sendForm("", valuesForm)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    });
});