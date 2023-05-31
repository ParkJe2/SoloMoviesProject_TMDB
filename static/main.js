const searchIp = document.querySelector("#searchIp");
const searchBtn = document.querySelector("#searchBtn");
const movieList = document.querySelector("#movieList");
const upBtn = document.querySelector("#upBtn");

window.addEventListener("load", async () => {
  const api = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTk2ZGJlN2Y4M2EyOTlhNDNkYTY1OTU3Y2U3YzFkYyIsInN1YiI6IjY0NzBiYjAwNzI2ZmIxMDE0NGU2MjgwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xX1FH_36KZ8QkDBdbs8u5Bl3YZt32lyDNMGaNLcVz5E",
    },
  }); // 요청
  const { results } = await api.json(); // 응답
  // { results } {} 사용 시 변수 이름 사용과 동시에 서버에서 받아온 api.json 결과에 results라는 키 값을 가져온다.

  results.forEach((result) => {
    movieList.innerHTML += `<div onclick="alert('영화 ID : ${result.id}')" class="movie-box">
        <div class="card h-100 cards">
        <img src="https://image.tmdb.org/t/p/original/${result["poster_path"]}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${result.title}</h5>
          <p>Rating : ${result["vote_average"]}</p>
          <p class="card-text">${result.overview}</p>
        </div>
  </div>
    `;
  });
});

searchBtn.addEventListener("click", async () => {
  if (!searchIp.value) return alert("영화 제목을 입력해주세요");
  // 빈 값인 상태에서 검색 버튼 클릭 시 알럿 노출

  const api = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYTk2ZGJlN2Y4M2EyOTlhNDNkYTY1OTU3Y2U3YzFkYyIsInN1YiI6IjY0NzBiYjAwNzI2ZmIxMDE0NGU2MjgwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xX1FH_36KZ8QkDBdbs8u5Bl3YZt32lyDNMGaNLcVz5E",
    },
  });
  const { results } = await api.json();
  const searchResult = results.filter((val) => val["title"].toUpperCase().indexOf(searchIp.value.toUpperCase()) !== -1);
  /* 영화 제목 데이터(대문자 변환)에 검색창에 입력된 값(대문자 변환)이 포함되어 있는지 확인하고, 포함되어 있을 경우 true가 반환되어 해당 요소는 필터링된 배열에 포함
       포함되지 않았을 경우 flse를 반환하고 요소는 필터링된 배열에서 제외됨 */
  if (searchResult.lenghth == 0) return alert("검색어에 일치하는 영화가 없습니다.");
  /* 검색어에 일치하는 영화가 없을 경우 알럿 노출 */

  movieList.innerHTML = "";
  searchResult.forEach((result) => {
    movieList.innerHTML += `<div onclick="alert('영화 ID : ${result.id}')" class="movie-box">
    <div class="card h-100 cards">
    <img src="https://image.tmdb.org/t/p/original/${result["poster_path"]}" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">${result.title}</h5>
      <p>Rating : ${result["vote_average"]}</p>
      <p class="card-text">${result.overview}</p>
    </div>
</div>
    `;
  });
});
// onclick="alert() : 클릭 시 알럿 노출

searchIp.addEventListener("keyup", async (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    await searchBtn.click();
  }
});
// searchIp에서 Enter키 클릭 시 searchBtn 클릭 동작 이벤트
// preventDefault() : 이벤트 실행 시 창 새로고침 되지 않게 막기

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
// topBtn 클릭 시 상단 이동
// window.scrollTo() : 문서를 지정된 위치로 스크롤
// behavior: "smooth" 부드럽게 움직이기
