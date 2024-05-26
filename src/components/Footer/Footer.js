import styles from "./Footer.module.scss";
import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function Footer() {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-info")}>
        <p>@codeit-2023</p>
        <div className={cx("middle")}>
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>
        <div className={cx("social-wrapper")}>
          <a href="https://www.facebook.com">
            <img
              src="images/akar-icons_facebook-fill.svg"
              alt="facebook-icon"
            />{" "}
          </a>
          <a href="https://www.twitter.com">
            <img src="images/akar-icons_twitter-fill.svg" alt="twitter-icon" />{" "}
          </a>
          <a href="https://www.youtube.com">
            <img src="images/akar-icons_youtube-fill.svg" alt="youtube-icon" />
          </a>
          <a href="https://www.instagram.com">
            <img
              src="images/ant-design_instagram-filled.svg"
              alt="instagram-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
