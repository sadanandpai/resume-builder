import React from "react";
import { Switch } from "antd";
import { Popover, Button } from "antd";
import { useItems } from "../../stores/settings.store";

export function ItemSettings() {
  const isPhotoDisplayed = useItems((state: any) => state.isPhotoDisplayed);
  const setIsPhotoDisplayed = useItems((state: any) => state.setIsPhotoDisplayed);

  const content = (
    <div>
      Photo <Switch checked={isPhotoDisplayed} onChange={setIsPhotoDisplayed} size="small" />
    </div>
  );

  return (
    <Popover content={content} title="Items" trigger="click">
      <Button>Items</Button>
    </Popover>
  );
}
