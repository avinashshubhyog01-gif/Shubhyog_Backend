import fetch from "node-fetch";

let cachedToken = null;
let tokenExpiry = 0;

export async function getProkeralaToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.PROKERALA_CLIENT_ID}:${process.env.PROKERALA_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;

  return cachedToken;
}

export async function fetchMarriageMuhurat(date) {
  const token = await getProkeralaToken();

  const res = await fetch(
    `https://api.prokerala.com/v2/astrology/muhurta?ayanamsa=1&datetime=${date}T00:00:00&coordinates=23.3441,85.3096`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
}
