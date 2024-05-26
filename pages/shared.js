import styles from "src/styles/SharedPage.module.scss";
import classNames from "classnames/bind";
import {
  Header,
  FolderInfo,
  SearchBar,
  LinkList,
  Footer,
} from "../src/components";
import { getLinkList, getData, ApiUrl } from "../src/utils";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function SharedPage() {
  const [links, setLinks] = useState([]);
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    const { links } = await getLinkList();
    const user = await getData(ApiUrl.sampleUser);
    setLinks(links);
    setUser(user);
  };

  useEffect(() => {
    getUserData;
  });

  return (
    <>
      <Header user={user} />
      <FolderInfo user={user} />
      <div className={cx("contents-wrapper")}>
        <SearchBar />
        <LinkList links={links} />
      </div>
      <Footer />
    </>
  );
}

export default SharedPage;
