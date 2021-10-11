import { Button } from "antd";
import React, { memo } from "react";
import { AppContext } from "../../../App";

const DownloadPdf: React.FC = memo(() => {
  const appContext = React.useContext(AppContext);
  return <Button onClick={appContext?.exportPdfFn}>Download Pdf</Button>;
});

export { DownloadPdf };
