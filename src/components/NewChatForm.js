
import React from "react";

import { icons } from "./IconSet";

function NewChatForm({ onNewChat }) {
  return (
    <button onClick={onNewChat} style={{ marginBottom: "20px" }}>
      {icons.plus} Nový chat
    </button>
  );
}

export default NewChatForm;
