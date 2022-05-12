import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllTemplate from "../AllTemplate/AllTemplate";

import "./Meme.css";

function Meme() {
  // STATE
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [previewMem, setPreviewMem] = useState("");
  const [captionValid, setCaptionValid] = useState(false);
  const navigate = useNavigate();
  const inputText = useRef();

  // EFFECT
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => {
        setMemes(res.data.memes);
      });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  useEffect(() => {
    setCaptionValid(captions.some((el) => el.length > 0));
  }, [captions]);

  // UTILITI FUNCTION

  const generateMem = () => {
    const currentMeme = memes[memeIndex];
    const fd = new FormData();
    fd.append("username", "zilemem");
    fd.append("password", "zile1234");
    fd.append("template_id", currentMeme.id);

    captions.forEach((c, index) => fd.append(`boxes[${index}][text]`, c));

    captionValid &&
      fetch("https://api.imgflip.com/caption_image", {
        method: "POST",
        body: fd,
      })
        .then((res) => res.json())
        .then((res) => {
          navigate("/generated?url=" + res.data.url);
        });
  };

  const previewTemplateMem = (index) => {
    const currentMeme = memes[index];
    const fd = new FormData();
    fd.append("username", "zilemem");
    fd.append("password", "zile1234");
    fd.append("template_id", currentMeme.id);

    // captions.forEach((c, index) => fd.append(`boxes[${index}][text]`, c))

    for (let i = 0; i < currentMeme.box_count; i++) {
      fd.append(`boxes[${i}][text]`, "Text " + i);
    }

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((res) => setPreviewMem(res.data.url));
  };

  const updateCaption = (e, index) => {
    const text = e.target.value;
    if (text.length > 0) {
      setCaptions(
        captions.map((c, i) => {
          if (index === i) {
            return text;
          } else {
            return c;
          }
        })
      );
    }
  };

  const getMemesTemplate = (e) => {
    const term = e.target.value;
    if (term.length > 3) {
      let rg = new RegExp(term, "gi");
      let filterized = memes.filter((mem) => {
        return rg.test(mem.name);
      });
      setFilteredMemes(filterized);
    } else if (term.length === 0) {
      setFilteredMemes([]);
      setPreviewMem("");
    }
  };

  const selectedMeme = (id) => {
    memes.forEach((meme, index) => {
      if (meme.id === id) {
        setMemeIndex(index);
        previewTemplateMem(index);
      }
    });
    inputText.current.scrollIntoView();
  };

  //   RETURN TO RENDER

  return memes.length ? (
    <div className="container">
      <div className="meme-control">
        <div className="input-holder" ref={inputText}>
          <button className="generate" onClick={generateMem}>
            {captionValid ? "Generate" : "Populate any input text"}
          </button>

          <input
            type="text"
            placeholder="Input Meme template name"
            onInput={getMemesTemplate}
          />

          {previewMem &&
            captions.map((c, index) => (
              <input
                type="text"
                key={index}
                placeholder={"Text " + index}
                onInput={(e) => {
                  updateCaption(e, index);
                }}
              />
            ))}
        </div>

        <div className="meme-preview">
          {previewMem && <img src={previewMem} alt="" />}
        </div>
      </div>

      <div className="memes-holder">
        {filteredMemes.length ? (
          <AllTemplate memes={filteredMemes} selectedMeme={selectedMeme} />
        ) : (
          <AllTemplate memes={memes} selectedMeme={selectedMeme} />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Meme;
