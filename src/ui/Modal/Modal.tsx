import {type ReactNode, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import "./Modal.css";
import {useFocusTrap} from "./useFocusTrap.ts";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    ariaLabelledBy: string;
}

/**
 * Modal dialog with backdrop and container wrapper for child components.
 *
 * Handles focus management (traps Tab, restores on close), scroll lock, and ARIA semantics automatically.
 *
 * Modal exits on backdrop click, esc key, X button, and back arrow (optional).
 *
 * Pair together with useUrlBoolean to support browser back button functionality.
 *
 * @param isOpen whether the modal is currently opened
 * @param onClose called when the user requests to close
 * @param children content rendered in modal
 * @param ariaLabelledBy id of the element that labels this dialog (for screen readers)
 *
 * @example
 * const [isOpen, setIsOpen] = useUrlBoolean("ModalIsOpen")
 * <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} ariaLabelledBy="modal-title">
 *      <h2 id="modal-title">Confirm Delete</h2>
 *      <Button>Click Me!</Button>
 * </Modal>
 */
export function Modal({isOpen, onClose, children, ariaLabelledBy}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef, isOpen);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        if (!isOpen) return;
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const fallBackRef = document.activeElement;
        modalRef.current?.focus();
        return () => {
            if (fallBackRef instanceof HTMLElement) fallBackRef.focus();
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (isOpen) document.body.style.overflow = "hidden";
        return () => {
            document.body.style.removeProperty("overflow");
        };
    }, [isOpen]);

    return createPortal(
        <div
            className="modal-backdrop"
            data-state={isOpen ? "open" : "closed"}
            inert={!isOpen}
            onClick={onClose}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={ariaLabelledBy}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {children}
                <button onClick={onClose}>Close Button</button>
            </div>
        </div>,
        document.body
    );
}