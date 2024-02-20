// apiKey 를 넣는 변수
const API_KEY = `3b98b139fbdd4256b21074309b347b39`;
// news 를 전역변수로 선언
let news = [];

// 뉴스를 가져오기 위한 함수
const getLatestNews = async ()=> {
    // url 주소를 넣는 변수 : URL 인스턴스 활용
    const url = new URL(
        `https://resilient-lebkuchen-c3be7b.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
        );
    // url 호출
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("news:",news);
};

getLatestNews();