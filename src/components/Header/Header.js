import Link from "next/link";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function Header({ userEmail }) {
  return (
    <header className={cx("header")}>
      <div className={cx("header-contents")}>
        <Link href="/">
          <img src="images/logo.svg" alt="linklabrary로고" />
        </Link>
        <div className={cx("user-container")}>
          <div className={cx("icon")}>
            <img src="images/Ellipse21.svg" alt="myicon" />
            <img
              className={cx("profile")}
              src="images/myprofile.png"
              alt="myprofile"
            />
          </div>
          <p>{userEmail ?? "로그인"}</p>
        </div>
      </div>
    </header>
  );
}
