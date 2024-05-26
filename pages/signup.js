import Link from "next/link";
import styles from "../src/styles/sign.module.scss";
import classNames from "classnames/bind";
import { SocialLogin, SignUpForm } from "../src/components";

const cx = classNames.bind(styles);

function signUpPage() {
  return (
    <div className={cx("page-container")}>
      <div className={cx("contents")}>
        <div className={cx("title")}>
          <Link href="/">
            <img className={cx("logo")} src="/images/logo.svg" alt="로고" />
          </Link>
          <h2>
            이미 회원이신가요?
            <Link className={cx("signIn-link")} href="./signin">
              로그인하기
            </Link>
          </h2>
        </div>
        <SignUpForm />
        <SocialLogin />
      </div>
    </div>
  );
}

export default signUpPage;
