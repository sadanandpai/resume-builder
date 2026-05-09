import { create } from 'zustand';
import { GetState, SetState } from './store.interface';

/** Minimum zoom for fitting the A4 preview on narrow viewports (builder only; print uses scale 1). */
export const ZOOM_MIN = 0.35;

interface IZoomStore {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setZoom: (zoom: number) => void;
}

const handleZoomIn = (get: GetState<IZoomStore>) => () => get().setZoom(get().zoom * 1.1);

const handleZoomOut = (get: GetState<IZoomStore>) => () => get().setZoom(get().zoom / 1.1);

const handleSetZoom = (set: SetState<IZoomStore>) => (zoom: number) =>
  set(() => {
    if (zoom > 1.5) return { zoom: 1.5 };
    if (zoom < ZOOM_MIN) return { zoom: ZOOM_MIN };
    return { zoom: +zoom.toFixed(2) };
  });

const handleResetZoom = (set: SetState<IZoomStore>) => () => {
  set(() => {
    return { zoom: 1 };
  });
};

export const useZoom = create<IZoomStore>((set, get) => ({
  zoom: 1,
  setZoom: handleSetZoom(set),
  zoomIn: handleZoomIn(get),
  resetZoom: handleResetZoom(set),
  zoomOut: handleZoomOut(get),
}));
