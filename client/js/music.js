//일본 노래 웹스크래핑
const jaURL = "http://localhost:3000/api/ja";

// 네이버 검색 결과 페이지에서 ul을 추출하고 동적으로 생성하는 함수
async function createJAfromNaver() {
  try {
    // 네이버 검색 결과 페이지에서 HTML 가져오기
    const response = await fetch(jaURL);
    const html = await response.text();

    // HTML에서 원하는 div 부분 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const divElement = doc.querySelector("#songList");

    if (!divElement) {
      console.error("div element not found.");
      return;
    }

    // 동적으로 생성한 div를 표시할 div 요소 찾기
    const resultDIVContainer = document.getElementById("resultJA");

    // 동적으로 생성한 div 표시
    resultDIVContainer.appendChild(divElement);
  } catch (error) {
    console.error("Error:", error);
  }
}

//중국 노래 웹스크래핑
const chinaURL = "http://localhost:3000/api/china";

// 네이버 검색 결과 페이지에서 ul을 추출하고 동적으로 생성하는 함수
async function createCHINAfromNaver() {
  try {
    // 네이버 검색 결과 페이지에서 HTML 가져오기
    const response = await fetch(chinaURL);
    const html = await response.text();

    // HTML에서 원하는 div 부분 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const divElement = doc.querySelector("#songList");

    if (!divElement) {
      console.error("div element not found.");
      return;
    }

    // 동적으로 생성한 div를 표시할 div 요소 찾기
    const resultDIVContainer = document.getElementById("resultCHINA");

    // 동적으로 생성한 div 표시
    resultDIVContainer.appendChild(divElement);
  } catch (error) {
    console.error("Error:", error);
  }
}

//미국 노래 웹스크래핑
const usaURL = "http://localhost:3000/api/usa";

// 네이버 검색 결과 페이지에서 div을 추출하고 동적으로 생성하는 함수
async function createUSAfromNaver() {
  try {
    // 네이버 검색 결과 페이지에서 HTML 가져오기
    const response = await fetch(usaURL);
    const html = await response.text();

    // HTML에서 원하는 div 부분 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const divElement = doc.querySelector("#songList");

    if (!divElement) {
      console.error("div element not found.");
      return;
    }

    // 동적으로 생성한 div를 표시할 div 요소 찾기
    const resultDIVContainer = document.getElementById("resultUSA");

    // 동적으로 생성한 div 표시
    resultDIVContainer.appendChild(divElement);
  } catch (error) {
    console.error("Error:", error);
  }
}

window.onload = function () {
  createJAfromNaver();
  createCHINAfromNaver();
  createUSAfromNaver();
};
