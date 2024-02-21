// apiKey 를 넣는 변수
const API_KEY = `3b98b139fbdd4256b21074309b347b39`;
// news 를 전역변수로 선언
let newsList = [];

// let menus = document.querySelectorAll("#menu-list button");
// menus.forEach((menu) =>
//   menu.addEventListener("click", (e) => getNewsByTopic(e))
// );

// 뉴스를 가져오기 위한 함수
const getLatestNews = async () => {
  // url 주소를 넣는 변수 : URL 인스턴스 활용
  // 제출용 url
  const url = new URL(
      `https://resilient-lebkuchen-c3be7b.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
      );
  // 실습용 url
//   const url = new URL(
//     `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
//   );
  // url 호출
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("news:", newsList);
};

const render = () => {
  // UI 내용
  const newsHTML = newsList
    .map((news) => `<!-- 뉴스 -->
    <div class="row news">
        <!-- 이미지 -->
        <div class="col-lg-4">
            <img class="news-img-size" src="${
              news.urlToImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }"/>
        </div>
        <!-- 텍스트 -->
        <div class="col-lg-8">
            <!-- 타이틀 -->
            <h2>${news.title}</h2>
            <!-- 내용 -->
            <p>${
              news.description == null || news.description == ""
                ? "내용없음"
                : news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
            }</p>
            <!-- 일반 설명 -->
            <div>${news.source.name || "no source"}  ${moment(
                news.publishedAt
             ).fromNow()}</div>
        </div>
    </div>`
    )
    .join("");

  // newsHTML 확인
  console.log("html", newsHTML);

  // "news-board" 에 붙여서 newsHTML 을 보여준다.
  document.getElementById("news-board").innerHTML = newsHTML;
};
getLatestNews();

// 사이드 메뉴 만들기
const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

// 검색창 보이고 숨기기
const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
