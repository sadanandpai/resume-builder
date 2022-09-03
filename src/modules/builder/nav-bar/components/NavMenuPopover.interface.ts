export interface INavMenuPopoverProps {
  isOpen: boolean;
  anchorElement: Element | null;
  children: React.ReactNode;
  id: string;
  onClose: () => void;
}
