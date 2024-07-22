import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

interface ModalProps {
  title: string;
  actions: React.ReactNode;
}

interface ModalRef {
  open: () => void;
  close: () => void;
}

const CartModal = forwardRef<ModalRef, ModalProps>(function Modal(
  { title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
      close: () => {
        if (dialog.current) {
          dialog.current.close();
        }
      }
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal') as HTMLElement
  );
});

export default CartModal;
