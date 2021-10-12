import React, { useEffect } from "react";
import { Button } from "antd";
import { useIntro } from "../../stores/data.store";

export function PrintSettings() {
  const intro = useIntro((state: any) => state.intro);

  function onPrintHandler() {
    window.print();
  }

  useEffect(() => {
    window.addEventListener("beforeprint", () => {
      window.document.title =
        `Resume_${intro.name}_${intro.role}_${intro.experience[1]?.years}`
          .split(" ")
          .join("_");
    });

    window.addEventListener("afterprint", () => {
      window.document.title = "Single Page Resume Builder";
    });
  }, [intro]);

  return (
    <Button type="primary" onClick={onPrintHandler}>
      Print
    </Button>
  );
}
