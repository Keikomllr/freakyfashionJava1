//const form = document.querySelector("#loadProducts");
const form = document.getElementById('nyaprodukter');
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const newProduct = {
      namn: formData.get("namn"),
      sku: formData.get("sku"),
      pris: formData.get("pris"),
    };

    fetch('/admin/products/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      }).then(() => {
        location.href = "/admin/products";
      });

    });