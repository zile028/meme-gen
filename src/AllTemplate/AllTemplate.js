import React from "react";
import MemeTemplate from "../MemeTemplate/MemeTemplate";

function AllTemplate({ memes, selectedMeme }) {
  let template = memes.map((mem) => {
    return (
      <MemeTemplate
        mem={mem}
        key={mem.id}
        selectedMeme={selectedMeme}
        memeId={mem.id}
      />
    );
  });
  return template;
}

export default AllTemplate;
