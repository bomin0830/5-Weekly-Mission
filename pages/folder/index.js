import {
  Header,
  SearchBar,
  Footer,
  LinkInput,
  LinkList,
  Sorting,
  ErrorComponent,
  FolderTitle,
} from "../../src/components";
import { checkAccessToken, getData } from "../../src/utils";
import styles from "src/styles/folder.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function FolderPage() {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [user, setUser] = useState("");
  const [Folders, setFolders] = useState("");
  const [AllLinks, setAllLinks] = useState("");

  function checkArrayBlank(array) {
    return array.length && array.length !== 0 ? false : true;
  }

  async function fetchData() {
    const user = await getData("/users");
    const Folders = await getData("/folders");
    const AllLinks = await getData("/links");

    setUser(user.data[0]);
    setFolders(Folders.data.folder);
    setAllLinks(AllLinks.data.folder);
  }

  useEffect(() => {
    /* AccessToken없으면 signin페이지로 이동*/
    if (!checkAccessToken("signInToken")) {
      location.href = "signin";
    }
    fetchData();
  }, []);

  return (
    <div>
      <Header userEmail={user.email} />
      <LinkInput folders={Folders} />
      <div className={cx("contents-wrapper")}>
        <SearchBar
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
        />
        <div className={cx("links-wrapper")}>
          <Sorting folders={Folders} />
          <FolderTitle name={"전체"} />
          {checkArrayBlank(AllLinks) ? (
            <ErrorComponent />
          ) : (
            <LinkList
              searchKeyWord={searchKeyWord}
              links={AllLinks}
              createdTime="created_at"
              image="image_source"
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FolderPage;
