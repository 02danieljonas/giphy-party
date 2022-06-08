const API_KEY = "";

let q = [];

let limit = 11;

let offset = 0;

let rating = "PG";

let lang = "en";

let searchBar = document.querySelector("#giphy-search");

let form = document.querySelector("form");

let loadButton = document.querySelector("#loadButton");

let imgContainer = document.querySelector("#image-container");

let img;
let image;
let offsetList = [];
let random;
let searchTerms;

function parseSearch(e) {
    e.preventDefault();
    if (searchBar.value == "") {
        return
    }
    imgContainer.style.backgroundColor="bisque"
    loadButton.style.display="revert"
    imgContainer.childNodes.forEach((element) => {
        element.childNodes[0].remove()
        element.remove();
    });

    searchTerms = searchBar.value.split(", ");
    for (let i = 0; i <= limit-1; i++) {
        let j = Math.floor(Math.random() * searchTerms.length)
        console.log(searchTerms[j])
        getGiphyData(
            searchTerms[j]
        );
    }
}

function loadMore(){
    limit+=11
    for (let i = 0; i <= limit-1; i++) {
        let j = Math.floor(Math.random() * searchTerms.length)
        console.log(searchTerms[j])
        getGiphyData(
            searchTerms[j]
        );
    }
}

async function getGiphyData(whatToSearch) {
    do {
        random = Math.floor(Math.random() * 5000);
    } while (random in offsetList);
    offsetList.push(random);
    let link = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${whatToSearch}&limit=1&offset=${
        offsetList[offsetList.length - 1]
    }`;
    let response = await fetch(link);
    let responseData = await response.json();
    responseData.data.forEach((e) => {
        img = document.createElement("img");
        image = document.createElement("div");
        image.appendChild(img);
        imgContainer.appendChild(image);
        img.src = e.images.original.url;
    });
}

form.addEventListener("submit", parseSearch);
loadButton.addEventListener("click", loadMore);