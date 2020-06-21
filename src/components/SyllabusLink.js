import React from "react";
import FirebaseContext from "../firebase/context";
import LinksContainer from "./LinksContainer";
import { VideoList } from "../components/VideoList";

export default function SyllabusLink(props) {
  const syllabusID = props.match.params.syllabusID;
  const { firebase } = React.useContext(FirebaseContext);
  const [link, setLink] = React.useState(null);
  const linkRef = firebase.db.collection("syllabus").doc(syllabusID);

  React.useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then(doc => {
      console.log(syllabusID);
      console.log(doc.data());
      setLink({ ...doc.data(), id: doc.id });
    });
  }
  return !link ? (
    <div>Loading...</div>
  ) : (
    <div className="flex__column full__item">
      {link.messages.map((elem, index) => (
        <div className="full__item">
          <div key={index} className="header__link">
            {elem.item}
          </div>
          <div className="flex__row">
            <LinksContainer comments={elem.text} />
            <VideoList videos={elem.val} />
          </div>
        </div>
      ))}
    </div>
  );
}
