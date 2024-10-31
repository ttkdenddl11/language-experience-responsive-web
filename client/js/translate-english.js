// translate-english.js
async function translateText(translatorNumber) {
  const inputTextArea = document.getElementById(`inputText${translatorNumber}`);
  const translatedTextDiv = document.getElementById(
    `translatedText${translatorNumber}`
  );
  const textToTranslate = inputTextArea.value;

  try {
    const response = await fetch("http://localhost:3000/translate/usa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textToTranslate, target: "en" }),
    });

    if (!response.ok) {
      throw new Error("번역 서버 호출이 실패했습니다.");
    }

    const result = await response.json();
    const translatedText = result.translatedText;

    // Exclude "번역 결과:" and only display the translated text in the textarea
    inputTextArea.value = translatedText;
  } catch (error) {
    console.error("번역 오류:", error);
  }
}

// 네이버 사전 검색 API 호출 함수
async function searchNaverDictionary(query) {
  const api_url = `http://localhost:3000/search/dictionary?query=${encodeURIComponent(
    query
  )}`;
  try {
    const response = await fetch(api_url);

    if (!response.ok) {
      throw new Error(`검색 실패: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API 호출 중 오류:", error.message);
    throw error;
  }
}

// askQuestion() 함수 수정
async function askQuestion() {
  const inputTextArea1 = document.getElementById("inputText1");
  const inputTextArea2 = document.getElementById("inputText2");

  // inputText1의 텍스트 가져오기
  const searchText = inputTextArea1.value.trim();

  if (searchText) {
    try {
      // 네이버 사전 검색 API 호출
      const searchResult = await searchNaverDictionary(searchText);

      // API 결과를 inputText2에 표시
      inputTextArea2.value = JSON.stringify(searchResult, null, 2);
    } catch (error) {
      console.error("검색 오류:", error);
    }
  } else {
    console.log("텍스트를 입력하세요.");
  }
}

// 음성 출력 함수
function speakTranslatedText(translatorNumber) {
  const inputTextArea = document.getElementById(`inputText${translatorNumber}`);
  const translatedTextDiv = document.getElementById(
    `translatedText${translatorNumber}`
  );
  const textToTranslate = inputTextArea.value;

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(textToTranslate);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  } else {
    console.error("음성 출력이 지원되지 않는 브라우저입니다.");
  }
}
