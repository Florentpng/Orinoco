// Création des tableaux/variables et appel de la fonction principale
clientProducts = []
let products = []
let totalPrice = 0
let orderId
main()

// Exécution des fonctions de la page avec des boucles
function main() { 
    for (let i = 0; i < localStorage.length; i++) {
        getClientProducts(i)
    }
    for (product of clientProducts) {
        product = JSON.parse(product)
        displayProduct(product)
        totalPrice += product.price/100
        products.push(product._id)
    }
}

// Ajout des articles du localStorage dans un tableau
function getClientProducts(i) { 
    clientProducts.push(localStorage.getItem(localStorage.key(i)));
}

// Modification du code HTML pour afficher les articles
function displayProduct(product) { 
    document.getElementById("products").innerHTML +=
    '<div class="row my-3 border-right rounded" id="product"><img class="col-2 mx-0" id="product-img" src="'+ product.imageUrl +'" alt="ours"></img><div class="col-9 border-right-0" id="name">'+ product.name +'</div><a href="#" class=" col-1 text-danger" id="btn-delete">Delete</a></div>'
}

document.getElementById("price").innerText = 'Total price: '+ totalPrice +'$'

// Envoie du formulaire au back-end et récupération de l'orderId
function send(e) { 
    e.preventDefault();
    fetch("https://orinocoflo.herokuapp.com/api/teddies/order", {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "contact": {
                "firstName" : document.getElementById("fname").value,
                "lastName" : document.getElementById("lname").value,
                "address" : document.getElementById("address").value,
                "city" : document.getElementById("city").value,
                "email" : document.getElementById("email").value,
            },
            "products": products
        })
    })
    .then(res => res.json())

    .then(res => idStock(res))

    .catch(function(error) {
        alert(error)
    })
}

document.getElementById("form").addEventListener("submit", send)

// Ajout de l'orderId et du prix total
function idStock(res) { 
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice))
    localStorage.setItem("orderId", res.orderId)
    window.location.href = "../html/confirm.html"
}