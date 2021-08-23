main()

function main() {
    const articles = getArticles()
    displayArticles(articles)
}

function getArticles() {
    fetch("http://localhost:3000/api/teddies/")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(articles) {
        console.log(articles)
    })
}

function displayArticles() {
    let 
}