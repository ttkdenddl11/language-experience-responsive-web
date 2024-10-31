const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//일본어 번역 앤드포인트
app.post("/translate/ja", async (req, res) => {
  const { text } = req.body;
  const clientId = "9ljWgWQDh8wydwsCK1yR"; // 여기에 발급받은 클라이언트 아이디를 넣어주세요.
  const clientSecret = "pnb82zY9oZ"; // 여기에 발급받은 클라이언트 시크릿을 넣어주세요.
  const papagoUrl = "https://openapi.naver.com/v1/papago/n2mt";

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Naver-Client-Id": clientId,
    "X-Naver-Client-Secret": clientSecret,
  };

  const data = new URLSearchParams({
    source: "ko", // 원본 언어 코드
    target: "ja", // 번역 언어 코드
    text: text,
  });

  try {
    const response = await fetch(papagoUrl, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error("API 호출이 실패했습니다.");
    }

    const result = await response.json();
    const translatedText = result.message.result.translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error("번역 오류:", error);
    res.status(500).json({ error: "번역 오류가 발생했습니다." });
  }
});

//중국어 번역 앤드포인트
app.post("/translate/china", async (req, res) => {
  const { text } = req.body;
  const clientId = "9ljWgWQDh8wydwsCK1yR"; // 여기에 발급받은 클라이언트 아이디를 넣어주세요.
  const clientSecret = "pnb82zY9oZ"; // 여기에 발급받은 클라이언트 시크릿을 넣어주세요.
  const papagoUrl = "https://openapi.naver.com/v1/papago/n2mt";

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Naver-Client-Id": clientId,
    "X-Naver-Client-Secret": clientSecret,
  };

  const data = new URLSearchParams({
    source: "ko", // 원본 언어 코드
    target: "zh-CN", // 번역 언어 코드
    text: text,
  });

  try {
    const response = await fetch(papagoUrl, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error("API 호출이 실패했습니다.");
    }

    const result = await response.json();
    const translatedText = result.message.result.translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error("번역 오류:", error);
    res.status(500).json({ error: "번역 오류가 발생했습니다." });
  }
});

//영어 번역 앤드포인트
app.post("/translate/usa", async (req, res) => {
  const { text } = req.body;
  const clientId = "9ljWgWQDh8wydwsCK1yR"; // 여기에 발급받은 클라이언트 아이디를 넣어주세요.
  const clientSecret = "pnb82zY9oZ"; // 여기에 발급받은 클라이언트 시크릿을 넣어주세요.
  const papagoUrl = "https://openapi.naver.com/v1/papago/n2mt";

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Naver-Client-Id": clientId,
    "X-Naver-Client-Secret": clientSecret,
  };

  const data = new URLSearchParams({
    source: "ko", // 원본 언어 코드
    target: "en", // 번역 언어 코드
    text: text,
  });

  try {
    const response = await fetch(papagoUrl, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error("API 호출이 실패했습니다.");
    }

    const result = await response.json();
    const translatedText = result.message.result.translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error("번역 오류:", error);
    res.status(500).json({ error: "번역 오류가 발생했습니다." });
  }
});

// 네이버 사전 검색 API 호출 엔드포인트
const client_id = "9ljWgWQDh8wydwsCK1yR"; // 여기에 네이버 API 클라이언트 ID를 넣어주세요.
const client_secret = "pnb82zY9oZ"; // 여기에 네이버 API 클라이언트 시크릿을 넣어주세요.

app.get("/search/dictionary", async (req, res) => {
  const query = req.query.query;

  if (!query) {
    res.status(400).json({ error: "검색어를 입력하세요." });
    return;
  }

  const api_url = `https://openapi.naver.com/v1/search/encyc.json?query=${encodeURIComponent(
    query
  )}`;

  const headers = {
    "X-Naver-Client-Id": client_id,
    "X-Naver-Client-Secret": client_secret,
  };

  try {
    const response = await fetch(api_url, { headers });

    if (!response.ok) {
      throw new Error(`API 호출이 실패했습니다.: ${response.status}`);
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("API 호출이 실패했습니다.", error);
    res.status(500).json({ error: "API 호출이 실패했습니다." });
  }
});

// 일본 노래 추천 웹스크래핑 api
app.get("/api/ja", async (req, res) => {
  try {
    const searchURL =
      "https://www.melon.com/genre/song_list.htm?gnrCode=GN1900";

    const response = await axios.get(searchURL);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 중국 노래 추천 웹스크래핑 api
app.get("/api/china", async (req, res) => {
  try {
    const searchURL =
      "https://www.melon.com/genre/song_list.htm?gnrCode=GN2000&dtlGnrCode=GN2004";

    const response = await axios.get(searchURL);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 미국 노래 추천 웹스크래핑 api
app.get("/api/usa", async (req, res) => {
  try {
    const searchURL =
      "https://www.melon.com/genre/song_list.htm?gnrCode=GN2000";

    const response = await axios.get(searchURL);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
