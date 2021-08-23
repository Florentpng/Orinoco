let productId
let article
main()

async function main() { /** Exécution des fonctions de la page */
    productId = getId()
    article = await getArticles()
    displayArticle(productId, article)
}

function getArticles() { /** Récupération des informations de l'article sélectionné du back-end */
    return fetch("http://localhost:3000/api/teddies/"+ productId)
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(article) {
        return article
    })
    .catch(function(error) {
        alert(error)
    })
}

function getId() { /** Récupération de l'Id passé dans l'URL */
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productId = urlParams.get('productId');
    return productId
}

function displayArticle(article, productId) { /** Remplace le code HTML */
    document.getElementById("product").innerHTML +=
    '<div class="card border-0"><h2 class="card-title my-3" id="name-bg">'+ productId.name +'</h2><h3 class="card-title my-3" id="name">'+ article.name +'</h3><div class="card-horizontal"><div class="img-square-wrapper mr-2"><img class="card-img shadow border" src="'+ productId.imageUrl +'" alt="ours"></div><div class="card-body col-12 pl-5 pt-5 shadow border" id="bg-transp"><div class="card-text mb-2" id="colors"></div><select class="mb-2" id="list" onchange=""><option value="">How many example ?</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select><p id="price" class="card-text text-success">Price: '+ productId.price/100 +'$</p><a><input class="btn btn-warning shadow-sm border-dark rounded" id="btnBasket" onclick="addBasket()" type="button" value="Add to basket"></a></div></div></div>'
    let colorsLength = productId.colors.length
    for (let i = 0; i < colorsLength; i++) {
        let realPositionLower = productId.colors[colorsLength -1].toLowerCase().replace(/ /g, "")
        let colors = document.getElementById("colors")
        colors.innerHTML +=
        '<div class="" id="'+ realPositionLower +'"><input type="radio" id="color" name="color" value="'+ realPositionLower +'" onclick=""><label class="h5 ml-3" for="'+ realPositionLower +'">'+ productId.colors[colorsLength -1] +'</label></div>'
        colorsLength--
        i--
    }
}

function addBasket() {/** Ajout de l'article dans le localStorage */
    localStorage.setItem(productId, JSON.stringify(article))
}