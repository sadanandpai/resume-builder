export interface NavMenuPopoverProps {
  isOpen: boolean;
  anchorElement: Element | null;
  children: React.ReactNode;
  id: string;
  onClose: () => void;
}
