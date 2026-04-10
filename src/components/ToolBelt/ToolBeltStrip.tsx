import "./ToolBelt.css";
import {useToolBeltActions, useToolBeltUI} from "../../context/ToolBelt/ToolBeltHooks.ts";
import {
    TOOL_BELT_STRIP_WIDTH_VW,
    TOOL_BELT_MAX_SIZE,
    TOOL_BELT_MIN_SIZE
} from "./ToolBeltConstants.ts";
import * as React from "react";

interface ToolBeltStripProps {
    paneRef: React.RefObject<HTMLDivElement | null>;
}

export default function ToolBeltStrip({paneRef}: ToolBeltStripProps) {
    const {isOpen} = useToolBeltUI();
    const {resizeBelt, toggleBelt} = useToolBeltActions();

    const handleMouseDown = () => {
        if (paneRef.current) paneRef.current.style.transition = "none";
        const handleMouseMove = (e: MouseEvent) => {
            const newSize = Math.max(window.innerWidth - (TOOL_BELT_STRIP_WIDTH_VW + e.clientX), TOOL_BELT_MIN_SIZE());
            resizeBelt(Math.min(TOOL_BELT_MAX_SIZE(), newSize));
        };
        const handleMouseUp = () => {
            if (paneRef.current) paneRef.current.style.transition = "transform 0.3s ease, width 0.3s ease";
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div className={`strip ${isOpen ? "strip-toggle-draggable" : ""}`}
             style={{width: `${TOOL_BELT_STRIP_WIDTH_VW}vw`}}
             onMouseDown={isOpen ? handleMouseDown : undefined}
        >
            <button className="strip-toggle-button" onClick={toggleBelt}>
                {isOpen ? ">" : "<"}
            </button>
            {isOpen && <button className="strip-toggle-button"
                               onClick={() => resizeBelt(TOOL_BELT_MAX_SIZE())}>[]</button>}
            {isOpen && <button className="strip-toggle-button"
                               onClick={() => resizeBelt(TOOL_BELT_MIN_SIZE())}>-</button>}
        </div>
    );
}