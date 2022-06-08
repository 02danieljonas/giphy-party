
let q = [];

let limit = 11;

let offset = 0;

let rating = "g";

let lang = "en";

let searchBar = document.querySelector("#giphy-search");

let form = document.querySelector("form");

let imgContainer = document.querySelector("#image-container");

let img;
let image;
let offsetList = [];
let random;

function parseSearch(e) {
    imgContainer.style.backgroundColor="bisque"
    imgContainer.childNodes.forEach((e) => {
        e.remove();
    });
    e.preventDefault();

    if (searchBar.value == "") {
        searchBar.value = "pizza, chicken";
    }
    let searchTerms = searchBar.value.split(", ");
    for (let i = 0; i <= limit-1; i++) {
        getGiphyData(
            searchTerms[Math.floor(Math.random() * searchTerms.length)]
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
    }&rating=${rating}&lang=${lang}`;
    let response = await fetch(link);
    let responseData = await response.json();
    responseData.data.forEach((e) => {
        img = document.createElement("img");
        image = document.createElement("div");
        console.log(image)
        image.appendChild(img);
        imgContainer.appendChild(image);
        img.src = e.images.original.url;
    });
}

window.onscroll = (e)=>{
    console.log(window.scrollY)
    console.log(document.body.scrollHeight)
}


form.addEventListener("submit", parseSearch);