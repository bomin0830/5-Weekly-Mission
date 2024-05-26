import { useEffect, useState } from "react";
import styles from "./Sorting.module.scss";
import { ApiUrl } from "../../utils";
import { ModalLayout } from "../ModalLayout";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function Sorting({
  folders,
  selectedId,
  setName,
  setSelectedId,
  setUrl,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const onAllClick = () => {
    setUrl(ApiUrl.usersLinks);
    setName("전체");
    setSelectedId(undefined);
  };

  useEffect(() => {
    onChangeName(selectedId); // eslint-disable-next-line
  }, [selectedId]);

  const onChangeName = (id) => {
    const nameById =
      id && folders ? folders.find((item) => item.id === id)?.name : "전체";
    setName(nameById);
  };

  return (
    <>
      <div className={cx("sorting-wrapper")}>
        <div className={cx("button-wrapper")}>
          <button onClick={() => onAllClick()}>
            <p className={cx("sort-name")}>전체</p>
          </button>
          {folders &&
            folders.map((folder) => {
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedId(folder.id)}
                >
                  <p className={cx("sort-name")}>{folder.name}</p>
                </button>
              );
            })}
        </div>
        <div className={cx("folder-title-wrapper")} onClick={toggleHandler}>
          폴더추가
          <img src="images/add.svg" alt="addbutton" />
        </div>
        {isOpen && (
          <ModalLayout toggleHandler={toggleHandler} title="폴더 추가">
            <div className={cx("modal-contents")}>
              <input placeholder="내용 입력" />
              <div className={cx("add", "button")}>추가하기</div>
            </div>
          </ModalLayout>
        )}
      </div>
    </>
  );
}
