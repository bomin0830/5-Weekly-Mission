import styles from "src/styles/SharedPage.module.scss";
import classNames from "classnames/bind";
import {
  Header,
  FolderInfo,
  SearchBar,
  LinkList,
  Footer,
} from "../../src/components";
import { getLinkList, getData, ApiUrl } from "../../src/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);

function SharedPage() {
  const [linksByQuery, setLinksByQuery] = useState([]);
  const [folder, setFolder] = useState([]);
  const [user, setUser] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const router = useRouter();
  const { folderId } = router.query;

  async function fetchData() {
    const linkUrl = `/links?folderId=${folderId}`;
    const FolderUrl = `/folders/${folderId}`;

    const linksByQuery = await getData(linkUrl);
    const user = await getData(`/users/${userId}`);
    const folder = await getData(FolderUrl);

    setLinksByQuery(linksByQuery.data.folder);
    setUser(user.data[0]);
    setFolder(folder);
  }

  useEffect(() => {
    fetchData();
  }, [folderId]);

  console.log("!!!");

  console.log(folder);
  return (
    <>
      <Header userEmail={user.email} userImgUrl={user["image_source"]} />
      <FolderInfo userName={user.name} folderName={folder.name} />
      <div className={cx("contents-wrapper")}>
        <SearchBar
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
        />
        <LinkList
          searchKeyWord={searchKeyWord}
          links={linksByQuery}
          createdTime='createdAt'
          image='imageSource'
        />
      </div>
      <Footer />
    </>
  );
}

export default SharedPage;
