main()

async function main() { /** Exécution des fonctions de la page */
    const articles = await getArticles()
    for (article of articles) {
        displayArticle(article)
    }
}

function getArticles() { /** Récupération des articles du back-end */
    return fetch("http://localhost:3000/api/teddies/")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(error) {
        alert(error)
    })
}

function displayArticle(article) { /** Modification du code HTML pour afficher les articles */
    document.getElementById("card-list").innerHTML += 
    '<div class="row"><div class="col"><div class="card my-3 shadow"><img class="card-img-top" src="'+ article.imageUrl +'" alt="ours"></img><div class="card-footer" id="card-footer"><h4 class="card-title">'+ article.name +'</h4><div class="h5 card-subtitle mb-2 text-muted">'+ article.colors +'</div><p class="card-text">'+ article.description +'</p><h7 class="col-12 mx-5 h4 card-subtitle text-success"><small>Price: '+ article.price/100 +'$</small></h7><a href="../html/product.html?productId='+ article._id +'" class="btn btn-warning shadow-sm border-dark rounded" id="button">Personalize</a></div></div></div></div>'
}