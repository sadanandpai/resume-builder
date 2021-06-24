import React from "react";
import { useItems } from "../stores/settings.store";

export function PhotoElement({ children }: any) {
  const isPhotoDisplayed = useItems((state: any) => state.isPhotoDisplayed);

  return isPhotoDisplayed && children;
}
