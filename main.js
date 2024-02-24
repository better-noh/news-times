// apiKey 를 넣는 변수
const API_KEY = `3b98b139fbdd4256b21074309b347b39`;
// news 를 전역변수로 선언
let newsList = [];
// 1. 버튼 메뉴 전부 다 들고오기
const menus = document.querySelectorAll(".menus button");
// 2. 각 버튼들에 클릭 이벤트 주기
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

// 실습용 url
// let url = new URL(
//   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
// );
// 제출용 url
let url = new URL(`https://resilient-lebkuchen-c3be7b.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page",page); // &page=page 와 같은 의미.
    url.searchParams.set("pageSize",pageSize); 
    const response = await fetch(url);
    
    const data = await response.json();
    console.log("ddd", data);
    // 정상적인 상황인 경우
    if (response.status === 200) {
      // 검색했으나 결과가 없는 경우 에러 메시지 출력
      if (data.articles.length === 0) {
        throw new Error("No Result for this search!");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("error", error.message);
    errorRender(error.message);
  }
};

// 뉴스를 가져오기 위한 함수
const getLatestNews = async () => {
  // url 주소를 넣는 변수 : URL 인스턴스 활용
  // 제출용 url
  url = new URL(
      `https://resilient-lebkuchen-c3be7b.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`
      );
  // 실습용 url
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  // url 호출
  getNews();
};

// 메뉴 버튼 클릭 이벤트 함수
const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  // console.log("category", category);
  // 실습용 url
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  // );
  // 제출용 url
  url = new URL(
    `https://resilient-lebkuchen-c3be7b.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );

  // 3. 뉴스 보여주기
  getNews();
};

// 키워드로 뉴스 검색하는 함수
const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  // 실습용 url
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  // );
  // 제출용 url
  url = new URL(
    `https://resilient-lebkuchen-c3be7b.netlify.app/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
    );

  getNews();
};

// 이미지 에러 처리
const imgError = (image) => {
  image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
  image.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render = () => {
  // UI 내용
  const newsHTML = newsList
    .map(
      (news) => `<!-- 뉴스 -->
    <div class="row news">
        <!-- 이미지 -->
        <div class="col-lg-4">
            <img class="news-img-size" src="${
              news.urlToImage
            }" alt="뉴스 이미지" onerror="imgError(this)"/>
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

// 에러 메시지를 보여주는 render 함수
const errorRender = (errorMessage) => {
  // 부트스트랩에서 가져온 Alert 코드 변형
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  // totalResult : 전체 데이터가 몇 개 있는지 -> 주어진 값,
  // page : 내가 현재 보고 있는 페이지 -> 정하는 값,
  // pageSize : 한 번에 받는 데이터의 수, 기본값은 20 -> 정하는 값,
  // groupSize : 페이지를 몇 개씩 끊어서 보여줄 것인지 -> 정하는 값,

  // totalPage : 필요한 페이지의 총 수,
  const totalPage = Math.ceil(totalResults / pageSize);
  // pageGroup : 내가 속해 있는 페이지 그룹,
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage : 그룹의 마지막 페이지,
  let lastPage = pageGroup * groupSize;
  // 마지막 페이지그룹이 그룹사이즈보다 작다? lastPage = totalPage
  if (lastPage > totalPage){
    lastPage = totalPage;
  }
  
  // firstPage : 그룹의 첫 번째 페이지
  const firstPage = lastPage - (groupSize - 1) <= 0? 1:lastPage - (groupSize - 1);

  // 페이지네이션 그려주기
  let paginationHTML = ``

  for (let i=firstPage; i<=lastPage; i++) {
    paginationHTML += `<li class="page-item ${i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML

  // <nav aria-label="Page navigation example">
  //   <ul class="pagination">
  //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //     <li class="page-item"><a class="page-link" href="#">1</a></li>
  //     <li class="page-item"><a class="page-link" href="#">2</a></li>
  //     <li class="page-item"><a class="page-link" href="#">3</a></li>
  //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //   </ul>
  // </nav>;
};

const moveToPage = (pageNum) => {
  console.log("movetopage", pageNum);
  page = pageNum;
  getNews();
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

// 1. 버튼들에 클릭이벤트 주기.
// 2. 카테고리별 뉴스 가져오기.
// 3. 그 뉴스를 보여주기 (render)
