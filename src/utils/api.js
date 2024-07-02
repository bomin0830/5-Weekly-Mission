import { ApiUrl, baseUrl } from "./url";
import axiosInstance from "./axios";

export async function postSignUp(inputData) {
  try {
    const res = await fetch(ApiUrl.signUp, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(inputData),
    });

    if (!res.ok) {
      throw new Error("bad request");
    }
    await postSignin(inputData);
  } catch (error) {
    console.log(error);
  }
}

export async function postSignin(inputData, setError = "") {
  try {
    const res = await fetch(ApiUrl.signIn, {
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
    console.log(result.accessToken);
    const accessToken = result.accessToken;
    saveAccessTokenToLocalStorage(accessToken, "signInToken");
    location.href = "folder";
  } catch (error) {
    console.error("SignIn Error:", error);
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
    return true;
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
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function postFolder(inputName) {
  try {
    const response = await axiosInstance.post(`${baseUrl}folders`, {
      name: inputName,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function saveAccessTokenToLocalStorage(accessToken, accessTokenName) {
  localStorage.setItem(accessTokenName, accessToken);
}

export function checkAccessToken(accessToken) {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(accessToken);
    if (token) {
      return true;
    } else false;
  }
}
