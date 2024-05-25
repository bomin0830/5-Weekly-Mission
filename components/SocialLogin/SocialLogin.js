import styles from "./SocialLogin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function SocialLogin() {
  return (
    <div className={cx("social-login")}>
      <p>소셜 로그인</p>
      <div className={cx("social-icon")}>
        <div className={cx("google-icon")}>
          <a href="http://www.google.com">
            <img src="images/google.png" alt="구글 아이콘" />
          </a>
        </div>
        <div className={cx("kakao-icon")}>
          <a href="http://www.kakao.com">
            <img src="images/99FE484C5C3451F218 1.svg" alt="카카오 아이콘" />
          </a>
        </div>
      </div>
    </div>
  );
}
