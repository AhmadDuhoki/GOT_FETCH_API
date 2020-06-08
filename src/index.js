// document.addEventListener("DOMContentLoaded", () => {
const GOT_URL =
  "https://www.omdbapi.com/?t=Game%20of%20Thrones&Season=8&apikey=eea7a7a0";
const list = document.getElementById("list");
const sortByRateBtn = document.getElementById("sort-rate");
const sortByReleaseBtn = document.getElementById("sort-release");
let arr = [];

function fetchRender() {
  fetch(GOT_URL)
    .then(res => res.json())
    .then(data => {
      arr.push(...data["Episodes"]);
      fetchRenderShow(arr);
      sortByRateBtn.addEventListener("click", () => {
        list.innerHTML = "";
        let newArr = arr.sort((a, b) => {
          return parseFloat(b.imdbRating) - parseFloat(a.imdbRating);
        });
        fetchRenderShow(newArr);
      });
      sortByReleaseBtn.addEventListener("click", () => {
        list.innerHTML = "";
        let newArrr = arr.sort((a, b) => {
          return Date.parse(a.Released) - Date.parse(b.Released);
        });
        fetchRenderShow(newArrr);
      });
    })
    .catch(err => console.log("there is and error"));
}

function fetchRenderShow(array) {
  array.forEach(element => {
    const option = `
      <li>
        <p>Title: ${element["Title"]}</p>
        <p>Released Date: ${element["Released"]}</p>
        <p>Episode: ${element["Episode"]}</p>
        <p>imdbRating: ${element["imdbRating"]}</p>
      </li>
      <hr/>
      `;

    list.insertAdjacentHTML("beforeend", option);
  });
}

fetchRender();

// });
