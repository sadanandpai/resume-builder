import React, { useState } from "react";
import { Popover, Button } from "antd";
import { useTemplates } from "../../stores/settings.store";

export function TemplateSettings() {
  const setTemplate = useTemplates((state: any) => state.setTemplate);

  const content = (
    <div>
      <Button onClick={() => setTemplate(0)}>0</Button>
      <Button onClick={() => setTemplate(1)}>1</Button>
    </div>
  );

  return (
    <Popover content={content} title="Templates" trigger="click">
      <Button>Templates</Button>
    </Popover>
  );
}
