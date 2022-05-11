import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Meme.css";

function Meme() {
  // STATE
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);
  const navigate = useNavigate();

  // EFFECT
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => {
        setMemes(randomize(res.data.memes));
      });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  // UTILITI FUNCTION

  const generateMem = () => {
    const currentMeme = memes[memeIndex];
    const fd = new FormData();

    fd.append("username", "zilemem");
    fd.append("password", "zile1234");
    fd.append("template_id", currentMeme.id);
    captions.forEach((c, index) => fd.append(`boxes[${index}][text]`, c));

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/generated?url=" + res.data.url);
      });
  };

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const randomize = (arr) => {
    let arrCopy = [].concat(arr);
    let radndomizeArr = [];
    for (let i = 0; i < arr.length; i++) {
      let rand = Math.floor(Math.random() * arrCopy.length);
      radndomizeArr.push(arrCopy[rand]);
      arrCopy.splice(rand, 1);
    }
    return radndomizeArr;
  };

  //   RETURN TO RENDER
  return memes.length ? (
    <div className="container">
      <button className="generate" onClick={generateMem}>
        Generate
      </button>
      <button
        className="skip"
        onClick={() => {
          setMemeIndex(memeIndex + 1);
        }}
      >
        Skip
      </button>

      {captions.map((c, index) => (
        <input
          type="text"
          key={index}
          onInput={(e) => {
            updateCaption(e, index);
          }}
        />
      ))}

      <img src={memes[memeIndex].url} alt="" />
    </div>
  ) : (
    <></>
  );
}

export default Meme;
