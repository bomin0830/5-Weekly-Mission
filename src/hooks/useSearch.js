import { useEffect, useState } from "react";

const linkProps = ["title", "description", "url"];

export const useSearch = (searchKeyWord, links) => {
  const [filteredLinks, setFilteredLinks] = useState(links);

  useEffect(() => {
    if (searchKeyWord) {
      let filteredLinks = linkProps
        .map((item) => {
          return links.filter((link) => {
            let linkItemByProp = link[item]?.toLowerCase() ?? null;
            return (
              linkItemByProp &&
              linkItemByProp.includes(searchKeyWord.toLowerCase())
            );
          });
        })
        .flat();
      filteredLinks = [...new Set(filteredLinks)];
      setFilteredLinks(filteredLinks);
    } else {
      setFilteredLinks(links);
    }
  }, [searchKeyWord, links]);

  return filteredLinks;
};
