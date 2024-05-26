import { ApiUrl } from "./url";

export async function postIdPwd(url, inputData, setError, tokenName) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (!res.ok) {
      throw new Error("bad request");
    }

    const result = await res.json();
    const accessToken = result.data.accessToken;
    saveAccessTokenToLocalStorage(accessToken, tokenName);
    location.href = "folder";
  } catch {
    setError("password", {
      type: "server",
      message: "비밀번호를 확인해 주세요",
    });
    setError("email", {
      type: "server",
      message: "이메일을 확인해 주세요",
    });
  }
}

export async function checkDuplicateEmail(value) {
  const emailData = {
    email: value,
  };

  try {
    const res = await fetch(ApiUrl.checkEmail, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!res.ok) {
      throw new Error("bad request");
    }

    return (result = await res.json());
  } catch {
    return false;
  }
}

export async function getLinkList() {
  const response = await fetch(
    "https://bootcamp-api.codeit.kr/api/sample/folder"
  );
  const body = await response.json();
  return body.folder;
}

export async function getData(url) {
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

export function saveAccessTokenToLocalStorage(accessToken, accessTokenName) {
  localStorage.setItem(accessTokenName, accessToken);
}

export function checkAccessToken(accessToken) {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(accessToken);
    if (token) {
      location.href = "folder";
    }
  }
}
