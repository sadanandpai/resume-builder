import { useItems } from 'src/stores/settings.store';

export function PhotoElement({ children }: any) {
  const isPhotoDisplayed = useItems((state: any) => state.isPhotoDisplayed);

  return isPhotoDisplayed && children;
}
