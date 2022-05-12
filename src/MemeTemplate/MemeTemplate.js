import React from "react";

function MemeTemplate({ mem, selectedMeme, memeId }) {
  return (
    <div
      onClick={() => {
        selectedMeme(memeId);
      }}
    >
      <img src={mem.url} alt="" />
      <h3>{mem.name}</h3>
      <p>Number text label: {mem.box_count}</p>
    </div>
  );
}

export default MemeTemplate;
