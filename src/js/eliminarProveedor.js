
const form = document.querySelector(".delete-supplier");
const input = document.querySelector(".delete-supplier input");

const valuesForm = { idProveedor: "" };

const sendForm = async (url = "", data = {}) => {

    const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

input.addEventListener("blur", event => {
    valuesForm[event.target.name] = event.target.value;
});

form.addEventListener("submit", event => {
    event.preventDefault();
    event.stopPropagation();
    sendForm("", valuesForm)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
});