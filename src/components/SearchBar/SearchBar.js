import { useState } from "react";
import styles from "./SearchBar.module.scss";
import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export function SearchBar({ searchKeyWord, setSearchKeyWord }) {
  const [value, setValue] = useState("");

  const handleInputValue = (e) => {
    if (e.key === "Enter") {
      setSearchKeyWord(e.target.value);
    }
  };

  const handleEmptyValue = () => {
    setSearchKeyWord(null);
    setValue("");
  };

  return (
    <>
      <div className={cx("search-box")}>
        <div>
          <img src="./images/Search.svg" alt="searcher" />
          <input
            placeholder="링크를 검색해보세요"
            onKeyDown={handleInputValue}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <img
          src="/images/_close.png"
          alt="닫기 버튼"
          onClick={handleEmptyValue}
        />
      </div>
      {searchKeyWord && (
        <p className={cx("search-result-text")}>
          <span>{searchKeyWord}</span>으로 검색한 결과입니다.
        </p>
      )}
    </>
  );
}
