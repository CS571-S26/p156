import {useEffect} from "react";
import {type RefObject} from "react";

/**
 * Traps Tab key focus within container.
 *
 * Tab moves selection forward. Holding Shift + Tab moves selection backwards.
 *
 * Used by Modal.
 *
 * @param ref ref to the container element to trap focus within
 * @param isActive whether the trap is active or not
 */
export function useFocusTrap(ref: RefObject<HTMLDivElement | null>, isActive: boolean): void {
    useEffect(() => {
        if (!isActive) return;
        const FOCUSABLE_SELECTOR = `
            button:not([disabled]),
            [href],
            input:not([disabled]),
            select:not([disabled]),
            textarea:not([disabled]),
            [tabindex]:not([tabindex='-1'])`;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key !== "Tab") return;
            e.preventDefault();
            if (ref.current === null) return;
            const focusables = ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
            const current = document.activeElement;
            const currentIndex = Array.from(focusables).findIndex(el => el === current);
            let nextIndex;
            if (currentIndex === undefined) {
                nextIndex = 0;
            } else {
                if (e.shiftKey) {
                    nextIndex = currentIndex - 1;
                    if (nextIndex < 0) {
                        nextIndex = focusables.length - 1;
                    }
                } else {
                    nextIndex = currentIndex + 1;
                    if (nextIndex >= focusables.length) {
                        nextIndex = 0;
                    }
                }
            }
            focusables.item(nextIndex).focus();
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [ref, isActive]);
}