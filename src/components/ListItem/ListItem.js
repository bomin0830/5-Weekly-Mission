import { calculatePastTime } from "../../utils";
import { useState } from "react";
import { ModalLayout } from "../ModalLayout";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "../LinkList/LinkList.module.scss";

const cx = classNames.bind(styles);

const base_image = "/images/card-default.png";

export function LinkItem({ url, createdAt, imageSource, description, title }) {
  const [isOpen, setIsOpen] = useState({
    open: false,
    add: false,
    delete: false,
  });

  const toggleHandler = (state) => {
    setIsOpen((prev) => ({
      ...prev,
      [state]: !prev[state],
    }));
  };

  const linkImage = imageSource ?? base_image;
  return (
    <div className={cx("linkItem-wrapper")}>
      <a href={url}>
        <div className={cx("Link-card")}>
          <div className={cx("Link-image-wrapper")}>
            <Image
              className={cx("Link-image")}
              src={linkImage}
              alt="링크이미지"
              fill
            />
          </div>
          <div className={cx("Link-info")}>
            <div className={cx("kebab-wrapper")}>
              <p className={cx("creation-time")}>
                {calculatePastTime(createdAt)}
              </p>
            </div>
            <p className={cx("link-description")}>{description}</p>
            <p>2023. 3. 15</p>
          </div>
        </div>
      </a>
      <div className={cx("kebab-button")}>
        <img
          src="images/kebab.svg"
          alt="kebab-button"
          onClick={() => toggleHandler("open")}
        />
        {isOpen.open && (
          <div className={cx("popup-wrapper")}>
            <div
              className={cx("popup-button")}
              onClick={() => toggleHandler("delete")}
            >
              삭제하기
            </div>
            <div
              className={cx("popup-button")}
              onClick={() => toggleHandler("add")}
            >
              폴더에 추가
            </div>
          </div>
        )}
      </div>
      {isOpen.delete && (
        <ModalLayout
          title="링크삭제"
          description={title}
          toggleHandler={() => toggleHandler("delete")}
        >
          <div className={cx("button delete")}>삭제하기</div>
        </ModalLayout>
      )}
      {isOpen.add && (
        <ModalLayout
          title="폴더에 추가"
          description={url}
          toggleHandler={() => toggleHandler("add")}
        >
          <div className={cx("button")}>추가하기</div>
        </ModalLayout>
      )}
    </div>
  );
}
