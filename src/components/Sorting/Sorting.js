import { useState } from "react";
import styles from "./Sorting.module.scss";
import { ModalLayout } from "../ModalLayout";
import classNames from "classnames/bind";
import Link from "next/link";
import { postFolder } from "../../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const cx = classNames.bind(styles);

export function Sorting({ folders, folderId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const queryClient = useQueryClient();

  const postFolderMutation = useMutation({
    mutationFn: (inputValue) => postFolder(inputValue),
  });

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleAddFolder = () => {
    postFolderMutation.mutate(inputValue);
    queryClient.invalidateQueries();
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className={cx("sorting-wrapper")}>
        <div className={cx("button-wrapper")}>
          {/* 링크 전체 */}
          <Link
            href='/folder'
            className={cx(
              "folder-name-wrapper",
              folderId ? "" : "selected-folder"
            )}
          >
            <p className={cx("sort-name")}>전체</p>
          </Link>
          {/* 폴더 모두 */}
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
        <button className={cx("folder-title-wrapper")} onClick={toggleHandler}>
          폴더추가
          <img src='/images/add.svg' alt='addbutton' />
        </button>
        {isOpen && (
          <ModalLayout toggleHandler={toggleHandler} title='폴더 추가'>
            <div className={cx("modal-contents")}>
              <input
                placeholder='내용 입력'
                value={inputValue}
                onChange={handleChange}
              />
              <button className={cx("add", "button")} onClick={handleAddFolder}>
                추가하기
              </button>
            </div>
          </ModalLayout>
        )}
      </div>
    </>
  );
}
