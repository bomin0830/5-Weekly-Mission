import axios from "axios";

// 자동으로 request헤더에 acesstoken 넣어줄 수 있게 하는 로직이얌

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api",
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 signInToken 가져오기
    const token = localStorage.getItem("signInToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
