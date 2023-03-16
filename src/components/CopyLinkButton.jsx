import React, { useState } from "react";
import { Button } from ".";

import { copyToClipboard } from "../utils/browser";

const CopyLinkButton = ({ ...buttonProps }) => {
  const [isLinkCopied, setLinkCopied] = useState(false);

  const handleLinkCopy = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    copyToClipboard(window.location.href);
  };

  return (
    <div>
      
    </div>
  );
};

export default CopyLinkButton;
