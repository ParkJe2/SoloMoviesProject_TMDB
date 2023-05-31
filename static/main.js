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
