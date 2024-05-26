import { useState } from "react";
import styles from "./LinkInput.module.scss";
import { ModalLayout } from "../ModalLayout";
import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function LinkInput({ folders }) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const getValue = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className={cx("LinkInput-wrapper")}>
      <div className={cx("LinkInput")}>
        <div className={cx("input-icon-wrapper")}>
          <img src="./images/link.svg" alt="link img" />
          <input placeholder="링크를 추가해보세요" onChange={getValue} />
        </div>
        <div className={cx("add-url-button")} onClick={toggleHandler}>
          추가하기
        </div>
      </div>
      {isOpen && (
        <ModalLayout
          toggleHandler={toggleHandler}
          title="폴더 추가"
          description={url}
        >
          <div className={cx("folder-select-wrapper")}>
            {folders.map((item, i) => {
              return (
                <div key={i}>
                  <input
                    type="radio"
                    value={item.name}
                    id={i}
                    checked={selectedFolder === item.name}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor={i}>
                    <div
                      className={cx({
                        "folder-select": true,
                        background: selectedFolder === item.name,
                      })}
                    >
                      <div className={cx("text-wrapper")}>
                        <p>{item.name}</p>
                        <p className={cx("link-text")}>
                          {item.link.count}개 링크
                        </p>
                      </div>
                      {selectedFolder === item.name && (
                        <Image src="images/check.svg" alt="selected img" />
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
          <div className={cx("add button")}>추가하기</div>
        </ModalLayout>
      )}
    </div>
  );
}
