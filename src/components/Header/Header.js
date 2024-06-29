import Link from "next/link";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(styles);

export function Header({ userEmail, userImgUrl }) {
  return (
    <header className={cx("header")}>
      <div className={cx("header-contents")}>
        <Link href="/">
          <img src="/images/logo.svg" alt="linklabrary로고" />
        </Link>
        <div className={cx("user-container")}>
          <div className={cx("icon")}>
            <Image fill src={userImgUrl} alt="myicon" />
          </div>
          <p>{userEmail ?? "로그인"}</p>
        </div>
      </div>
    </header>
  );
}
