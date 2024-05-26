import { useState } from "react";
import { ModalLayout } from "../ModalLayout";
import Image from "next/image";
import styles from "./FolderTitle.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function FolderTitle({ name }) {
  const [isOpen, setIsOpen] = useState({
    share: false,
    delete: false,
    nameChange: false,
  });

  const toggleHandler = (state) => {
    setIsOpen((prev) => ({
      ...prev,
      [state]: !prev[state],
    }));
  };

  return (
    <>
      <div className={cx("folderTitle-wrapper")}>
        <div className={cx("folder-name")}>{name}</div>
        <div className={cx("title-button-wrapper")}>
          <p onClick={() => toggleHandler("share")}>
            <img src="/images/share.svg" alt="share-button" />
            공유
          </p>
          <p onClick={() => toggleHandler("nameChange")}>
            <img src="/images/pen.svg" alt="nameChange-button" />
            이름 변경
          </p>
          <p onClick={() => toggleHandler("delete")}>
            <img src="/images/Group 36.svg" alt="delete-button" />
            삭제
          </p>
        </div>
      </div>
      {isOpen.share && (
        <ModalLayout
          title="폴더 공유"
          description={name}
          toggleHandler={() => toggleHandler("share")}
        >
          폴더 공유
        </ModalLayout>
      )}
      {isOpen.delete && (
        <ModalLayout
          title="폴더 삭제"
          description={name}
          toggleHandler={() => toggleHandler("delete")}
        >
          <div className={cx("button delete")}>삭제하기</div>
        </ModalLayout>
      )}
      {isOpen.nameChange && (
        <ModalLayout
          title="폴더 이름 변경"
          toggleHandler={() => toggleHandler("nameChange")}
        >
          <div className={cx("modal-contents")}>
            <input></input>
            <div className={cx("add button")}>변경하기</div>
          </div>
        </ModalLayout>
      )}
    </>
  );
}
