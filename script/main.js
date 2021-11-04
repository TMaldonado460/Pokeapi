console.log("hola mundo")


function generateArticle() {
    let article = document.createElement("article");
    article.classList.add("skeleton");
    article.innerHTML = `<h2></h2><img src="." alt=""><p></p>`
    return article;
}

function insertIntoArticle(data, article) {
    article.querySelector("h2").innerHTML = data.name;
    article.querySelector("img").src = data.sprites.front_default;
    article.querySelector("p").innerHTML = data.types.map(type => type.type.name).join(", ");
    fetch(data.species.url)
        .then(response => response.json())
        .then(data => {
            article.style.backgroundColor = data.color.name;
        })
        .then(() => {
            article.classList.remove("skeleton");
        })
}

function getOffsetLimit(offset, limit) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then( response => response.json() )
    .then( data => {
        let articles = document.querySelector("#articles");
        articles.innerHTML = "";
        data.results.forEach(element => {
            let article = generateArticle();
            articles.appendChild(article);
            fetch(element.url)
            .then( response => response.json() )
            .then( data => {
                insertIntoArticle(data, article)
            } )
        });
    })
}
    


document.forms[0].addEventListener("submit", function(event) {
    event.preventDefault();
    let input = document.querySelector("input");
    let value = parseInt(input.value);
    if (isNaN(value)) {
        alert("El valor introducido no es un número");
        return;
    }
    getOffsetLimit(0, value);
    input.value = "";
})
