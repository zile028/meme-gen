import React, { useState } from "react";
import "./MemeGenerated.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";
import fileDownload from "js-file-download";

function MemeGenerated() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const copyClipboard = useClipboard();
  const url = new URLSearchParams(location.search).get("url");

  const copyLink = () => {
    copyClipboard.copy(url);
    setCopied(true);
  };

  const downloadMeme = () => {
    const fileName = url.split("/").pop();

    fetch(url).then((res) => {
      fileDownload(res.data, fileName);
    });
  };

  return (
    <div className="container">
      <button
        className="home"
        onClick={() => {
          navigate("/");
        }}
      >
        Make new Memes
      </button>
      {url && <img src={url} alt="" />}
      <button className="copyLink" onClick={copyLink}>
        {copied ? "Link is copied!" : "Copy link"}
      </button>
      <button className="copyLink" onClick={downloadMeme}>
        Download
      </button>
    </div>
  );
}

export default MemeGenerated;
