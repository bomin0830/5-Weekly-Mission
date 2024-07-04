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
import { getData } from "../../src/utils";
import styles from "src/styles/folder.module.scss";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const cx = classNames.bind(styles);

function FolderPage() {
  const [linksByQuery, setLinksByQuery] = useState([]);
  const [user, setUser] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const router = useRouter();
  const { folderId } = router.query;

  /* 받아온 배열이 비어있을 경우 체크. */
  function checkArrayBlank(array) {
    return !Array.isArray(array) || array.length === 0;
  }

  const { data: FoldersData } = useQuery({
    queryKey: ["Folders"],
    queryFn: () => getData("/folders"),
  });

  const { data: FolderNameData } = useQuery({
    queryKey: ["FolderName", folderId],
    queryFn: () => getData(`folders/${folderId}`),
    enabled: !!folderId,
  });

  const FolderName = FolderNameData ?? "";

  /* 쿼리id로 받은 링크들, 유저데이터, 선택한 폴더 이름 데이터 가져오기*/
  // async function fetchData() {
  //   const linkUrl = `/links?folderId=${folderId}`;
  //   const FolderUrl = `/folders/${folderId}`;

  //   const Folders = await getData("/folders");
  //   const linksByQuery = await getData(linkUrl);
  //   const user = await getData("/users");
  //   const name = await getData(FolderUrl);

  //   setLinksByQuery(linksByQuery.data.folder);
  //   setUser(user.data[0]);
  //   setName(name.data[0].name);
  //   setFolders(Folders.data.folder);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [folderId]);

  const Folders = FoldersData ?? [];

  return (
    <div>
      <Header userEmail={user.email} userImgUrl={user["image_source"]} />
      <LinkInput folders={Folders} />
      <div className={cx("contents-wrapper")}>
        <SearchBar
          searchKeyWord={searchKeyWord}
          setSearchKeyWord={setSearchKeyWord}
        />
        <div className={cx("links-wrapper")}>
          <Sorting folders={Folders} folderId={folderId} />
          <FolderTitle name={FolderName} folderId={folderId} />
          {checkArrayBlank(linksByQuery) ? (
            <ErrorComponent />
          ) : (
            <LinkList
              searchKeyWord={searchKeyWord}
              links={linksByQuery}
              createdTime='created_at'
              image='image_source'
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FolderPage;
