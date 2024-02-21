const API_KEY = "3b98b139fbdd4256b21074309b347b39";

function getNews() {
    let url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    console.log("uuu",url);

    const response = fetch(url);

    console.log("rrr",response);
}

getNews();
for (let i=0; i<20; i++) {
    console.log("after",i);
}
