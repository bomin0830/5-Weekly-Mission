import { useState } from "react";
import styles from "./Sorting.module.scss";
import { ModalLayout } from "../ModalLayout";
import classNames from "classnames/bind";
import Link from "next/link";

const cx = classNames.bind(styles);

export function Sorting({ folders, folderId }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={cx("sorting-wrapper")}>
        <div className={cx("button-wrapper")}>
          <Link
            href="/folder"
            className={cx(
              "folder-name-wrapper",
              folderId ? "" : "selected-folder"
            )}
          >
            <p className={cx("sort-name")}>전체</p>
          </Link>
          {folders &&
            folders.map((folder) => {
              return (
                <Link
                  className={cx(
                    "folder-name-wrapper",
                    folder.id == folderId ? "selected-folder" : ""
                  )}
                  key={folder.id}
                  href={`/folder/${folder.id}`}
                >
                  <p className={cx("sort-name")}>{folder.name}</p>
                </Link>
              );
            })}
        </div>
        <div className={cx("folder-title-wrapper")} onClick={toggleHandler}>
          폴더추가
          <img src="/images/add.svg" alt="addbutton" />
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

// useEffect(() => {
//   onChangeName(selectedId); // eslint-disable-next-line
// }, [selectedId]);

// const onChangeName = (id) => {
//   const nameById =
//     id && folders ? folders.find((item) => item.id === id)?.name : "전체";
//   setName(nameById);
// };
