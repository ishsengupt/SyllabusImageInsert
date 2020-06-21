import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import youtube, { KEY } from "./api/youtube";
import { Layout, Menu, Breadcrumb } from "antd";
import UploadFile from "./UploadFile";
import LinkList from "./components/LinkList";
import SyllabusLink from "./components/SyllabusLink";
import firebase, { FirebaseContext } from "./firebase";
import Header from "./Header";

const { Content, Footer } = Layout;

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const onSearchSubmit = async searchTerm => {
    const response = await youtube.get("/search", {
      params: {
        q: searchTerm,
        part: "snippet",
        maxResults: 11,
        key: KEY
      }
    });
    const responseArr = response.data.items;
    const firstVideo =
      responseArr[0].id.kind !== "youtube#channel"
        ? responseArr[0]
        : responseArr[1];
    setVideos(responseArr);
    setSelectedVideo(firstVideo);
  };
  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ firebase }}>
        <Header />
        <div className="route-container flex__column__center">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/upload" />} />
            <Route path="/upload" component={UploadFile} />
            <Route path="/syllabus" component={LinkList} />
            <Route path="/link/:syllabusID" component={SyllabusLink} />
          </Switch>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
