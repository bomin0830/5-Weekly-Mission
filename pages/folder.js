import {
  Header,
  SearchBar,
  Footer,
  LinkInput,
  LinkList,
  Sorting,
  ErrorComponent,
  FolderTitle,
} from "components";
import { getData, ApiUrl } from "../utils";
import styles from "../styles/folder.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export async function getServerSideProps() {
  const user = await getData(ApiUrl.sampleUser);
  const Folders = await getData(ApiUrl.usersFolders);
  const AllLinks = await getData(ApiUrl.usersLinks);

  return {
    props: {
      user,
      Folders,
      AllLinks,
    },
  };
}

function FolderPage({ user, Folders, AllLinks }) {
  const [selectedId, setSelectedId] = useState("1");
  const [urlBySelectedId, setUrlBySelectedId] = useState("");
  const [name, setName] = useState("");
  const [links, setLinks] = useState(AllLinks.data);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  function checkArrayBlank(array) {
    return array ? array.length === 0 : true;
  }

  async function fetchData() {
    if (selectedId) {
      const newLinks = await getData(urlBySelectedId);
      setLinks(newLinks.data);
    } else setLinks(AllLinks.data);
  }

  useEffect(() => {
    const newUrl = `${ApiUrl.usersLinks}?folderId=${selectedId}`;
    setUrlBySelectedId(newUrl);
  }, [selectedId]);

  useEffect(() => {
    fetchData();
  }, [urlBySelectedId, selectedId]);

  return (
    <div>
      <Header userEmail={user.email} />
      <LinkInput folders={Folders.data} />
      <div className={cx("contents-wrapper")}>
        <SearchBar
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
        />
        <div className={cx("links-wrapper")}>
          <Sorting
            folders={Folders.data}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setUrl={setUrlBySelectedId}
            setName={setName}
            name={name}
          />
          <FolderTitle name={name} />
          {checkArrayBlank(links) ? (
            <ErrorComponent />
          ) : (
            <LinkList
              searchKeyWord={searchKeyWord}
              links={links}
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
