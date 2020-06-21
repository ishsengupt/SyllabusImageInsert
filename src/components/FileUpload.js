import React, { useContext, useState } from "react";
import { Upload, message } from "antd";
import UploadedImages from "../contexts/UploadedImages";
import useAxios from "../hooks/useAxios";
import useUrlBuilder from "../hooks/useUrlBuilder";
import { SearchBar } from "../components/SearchBar";
import { VideoList } from "../components/VideoList";
import { VideoDetail } from "../components/VideoDetail";
import youtube, { KEY } from "../api/youtube";
import FirebaseContext from "../firebase/context";
import { vision } from "../env";
import axios from "axios";
import { withRouter, NavLink } from "react-router-dom";

const { Dragger } = Upload;

function FileUpload() {
  const uploaded = useContext(UploadedImages);
  const { loading, setUploadedImages } = uploaded;
  const [tesText, settesText] = useState([]);
  const [messages, setMessages] = useState([]);
  const [links, setLinks] = useState([]);
  const [realloading, setLoading] = useState(true);
  const [docTitle, setdocTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { firebase } = React.useContext(FirebaseContext);

  function handleSubmit() {
    const newTitle = messages[1].item;
    setdocTitle("Id" + newTitle);
    const newLink = {
      messages,
      newTitle: "Id" + newTitle
    };
    console.log(newTitle);
    firebase.db
      .collection("syllabus")
      .doc("Id" + newTitle)
      .set(newLink);
    console.log(newLink);
    //firebase.db.collection("links").add(newLink);
    //const voteRef = firebase.db.collection("category").doc(sub);
    /*    voteRef.get().then(doc => {
      if (doc.exists) {
         const prevNum = doc.data().numPosts;
        let newNum = prevNum + 1;
        console.log(doc.data().numPosts);
        firebase.db
          .collection("category")
          .doc(sub)
          .set(
            {
              numPosts: newNum
            },
            { merge: true }
          ); 
      }*/
  }

  const onSearchSubmit = async searchTerm => {
    const response = await youtube.get("/search", {
      params: {
        q: searchTerm,
        part: "snippet",
        maxResults: 1,
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
    return responseArr;
  };
  const [ocrState, ocrSend] = useAxios({
    url: `images:annotate`,
    method: "POST"
  });

  const fetchLinks = (endpoint, item) => {
    let searchArr = [];
    fetch(endpoint)
      .then(function(response) {
        return response.json();
      }) // convert to plain text
      .then(function(text) {
        const testItem = onSearchSubmit(item);
        let searchItem;
        testItem.then(val => {
          searchItem = {
            val,
            item,
            text
          };
          //console.log(searchItem);
          // searchArr.push(searchItem);
          // console.log(searchArr);

          setMessages(oldArray => [...oldArray, searchItem]);
        });
      });
  };

  const endpoint = "https://vision.googleapis.com/v1/images:annotate";
  const searchEndpoint =
    "https://reddit-scraper.tailgateishan.vercel.app/search/";
  const preFormat = arr => {
    return [arr[0].x, arr[0].y, arr[1].x - arr[0].x, arr[3].y - arr[0].y];
  };

  const tidyResults = raw => {
    let results = {
      texts: [],
      boundings: []
    };
    raw.map((item, index) => {
      if (index > 0) {
        results.texts.push(item.description);
        results.boundings.push(preFormat(item.boundingPoly.vertices));
      }
    });
    return results;
  };

  const messageKey = "loadingMsg";

  const onLoading = () => {
    message.loading({
      content: "Analyzing image..",
      duration: 0,
      key: messageKey
    });
  };

  const props = {
    name: "file",
    multiple: false,
    accept: ".png,.jpeg,.jpg",
    showUploadList: false,
    disabled: loading,
    beforeUpload: file => {
      onLoading(true);
      // onLoading(false)

      setUploadedImages({
        loading: true
      });
      const reader = new FileReader();

      reader.onload = e => {
        const base64 = e.target.result.toString().replace(/^data:(.*,)?/, "");
        ocrSend(
          {
            url: endpoint,
            params: {
              key: vision.api_key
            },
            data: {
              requests: [
                {
                  image: {
                    content: base64
                  },
                  features: [
                    {
                      type: "DOCUMENT_TEXT_DETECTION"
                    }
                  ]
                }
              ]
            }
          },
          res => {
            const searchVal = res.responses[0].fullTextAnnotation.text.split(
              /\s*[\r\n]+\s*/g
            );

            settesText(searchVal);

            searchVal.map((item, index) => {
              if (item == "") {
                item = "none";
              }

              fetchLinks(`${searchEndpoint}${item}`, item);
            });

            setUploadedImages({
              loading: false,
              base64,
              ocrResultsRaw: res.responses[0],
              ocrResults: tidyResults(res.responses[0].textAnnotations),
              createdAt: new Date()
            });
            console.log(new Date());
            message.success({
              content: `action done successfully.`,
              key: messageKey
            });
          },
          e => {
            console.log(e);
            setUploadedImages({
              loading: false
            });
            message.error({
              content: `Ops, Something wrong`,
              key: messageKey
            });
          }
        );
      };
      reader.readAsDataURL(file);

      // Prevent upload
      return false;
    }
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     message.success(`${info.file.name} file uploaded successfully.`);
    //   } else if (status === 'error') {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
  };
  let submitButton;
  if (videos.length > 0) {
    submitButton = (
      <div className="flex__column">
        <button className="button cda-remove" onClick={handleSubmit}>
          Submit
        </button>
        <div>
          <NavLink to="/syllabus" className="frame__demos header-margin">
            Go to syllabi
          </NavLink>
        </div>
      </div>
    );
  } else {
    submitButton = <div>No syllabus entered</div>;
  }

  return (
    <div className="flex__column__center full__width">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">Inbox</p>
        <p className="ant-upload-text">
          Click or drag image to this area to start analyze
        </p>

        <p className="ant-upload-hint">Only accept jpeg,jpg and png files.</p>
      </Dragger>
      <div className="five wide column">{tesText}</div>

      <div className="form__margin toggle__button">{submitButton}</div>
    </div>
  );
}

export default FileUpload;
