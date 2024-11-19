import { PropsWithChildren } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/core/ui';

type DialogWrapperProps = {
  openElement: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
} & PropsWithChildren;

const DialogWrapper = ({ children, openElement, isOpen, onOpenChange }: DialogWrapperProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger>{openElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{children}</DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
