import React from "react";
import { Button } from "antd";
import { useThemes } from "../../stores/theme.store";

export function ThemeSettings() {
  const setTheme = useThemes((state: any) => state.setTheme);

  return (
    <>
      <Button onClick={() => setTheme(0)}>0</Button>
      <Button onClick={() => setTheme(1)}>1</Button>
      <Button onClick={() => setTheme(2)}>2</Button>
      <Button onClick={() => setTheme(3)}>3</Button>
    </>
  );
}
