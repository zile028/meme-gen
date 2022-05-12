import React, { useState } from "react";
import "./MemeGenerated.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";

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
    let name = url.split("/").pop();
    fetch(url)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(() => alert("An error sorry"));
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
