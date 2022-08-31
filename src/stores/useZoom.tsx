import create, { SetState, GetState } from 'zustand';

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
    if (zoom < 0.9) return { zoom: 0.9 };
    return { zoom: +zoom.toFixed(1) };
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
