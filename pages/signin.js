import Link from "next/link";
import styles from "src/styles/sign.module.scss";
import classNames from "classnames/bind";
import { SignInForm, SocialLogin } from "../src/components";

const cx = classNames.bind(styles);

function singInPage() {
  return (
    <div className={cx("page-container")}>
      <div className={cx("contents")}>
        <div className={cx("title")}>
          <Link href="/">
            <img className={cx("logo")} src="/images/logo.svg" alt="로고" />
          </Link>
          <h2>
            회원이 아니신가요?
            <Link className={cx("singIn-link")} href="./signup">
              회원가입하기
            </Link>
          </h2>
        </div>
        <SignInForm />
        <SocialLogin />
      </div>
    </div>
  );
}

export default singInPage;
