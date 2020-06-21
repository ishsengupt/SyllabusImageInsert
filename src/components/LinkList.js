import React from "react";
import FirebaseContext from "../firebase/context";

import axios from "axios";
import { Link, withRouter, NavLink } from "react-router-dom";
const LINKS_PER_PAGE = 5;

function LinkList(props) {
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState([]);
  const [cursor, setCursor] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [cats, setCats] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);
  const isNewPage = props.location.pathname.includes("new");
  const isSylPage = props.location.pathname.includes("syllabus");
  const page = Number(props.match.params.page);
  const linksRef = firebase.db.collection("syllabus");

  React.useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isSylPage, page]);

  function getLinks() {
    const hasCursor = Boolean(cursor);
    setLoading(true);
    if (isSylPage) {
      return linksRef
        .orderBy("newTitle")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (page === 1) {
      return linksRef
        .orderBy("newTitle")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (hasCursor) {
      return linksRef
        .orderBy("newTitle")
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else {
      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
      axios
        .get(
          `https://us-central1-hooks-news-app-1a459.cloudfunctions.net/linksPagination?offset=${offset}`
        )
        .then(response => {
          const links = response.data;
          const lastLink = links[links.length - 1];
          setLinks(links);
          setCursor(lastLink);
          setLoading(false);
        });
      return () => {};
    }
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    const lastLink = links[links.length - 1];
    setLinks(links);
    setCursor(lastLink);
    setLoading(false);
  }

  function visitPreviousPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }

  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`);
    }
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div className="list__grid" style={{ opacity: loading ? 0.25 : 1 }}>
      <div className="main__items">
        {links.map((link, index) => (
          <Link to={`/link/${link.newTitle}`} className="no-underlines">
            {link.newTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default withRouter(LinkList);
