import styles from "./ModalLayout.module.scss";
import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function ModalLayout({
  children,
  toggleHandler,
  title,
  description = null,
}) {
  return (
    <>
      <div className={cx("modal-container")}>
        <button className={cx("close-button")} onClick={toggleHandler}>
          X
        </button>
        <div>
          <p className={cx("title")}>{title}</p>
          {description && <p className='description'>{description}</p>}
        </div>
        {children}
      </div>
      <div className={cx("modal-background")}></div>
    </>
  );
}
