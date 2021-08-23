let orderId
let totalPrice
main()

function main() { /** Exécution des fonctions de la page avec des boucles */
    getValues()
    displayValues()
}

function getValues() { /** Récupération de l'orderId et du prix total */
    orderId = localStorage.getItem("orderId")
    totalPrice = localStorage.getItem("totalPrice")
}

function displayValues() { /** Modification du code HTML pour afficher l'orderId et le prix total */
    document.getElementById("card-footer").innerHTML =
    '<p>Your order number is '+ orderId +' and the total price is '+ totalPrice +'$'
}

localStorage.clear()