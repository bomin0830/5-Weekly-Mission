import styles from "./ErrorComponent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function ErrorComponent() {
  return (
    <div className={cx("Error-block")}>
      <p>리액트 정말 쉽지 않다.</p>
    </div>
  );
}
