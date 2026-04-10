import "./ToolBelt.css";
import {TOOL_BELT_STRIP_WIDTH_VW} from "./ToolBeltConstants.ts";
import {useToolBeltUI} from "../../context/ToolBelt/ToolBeltHooks.ts";
import ToolBeltStrip from "./ToolBeltStrip.tsx";
import {useRef} from "react";
import ToolBeltContent from "./ToolBeltContent.tsx";

export default function ToolBeltPane() {
    const {isOpen, size} = useToolBeltUI();
    const paneRef = useRef<HTMLDivElement>(null);
    return <>
        <div
            ref={paneRef}
            className="pane"
            style={{
                width: `calc(${size}px + ${TOOL_BELT_STRIP_WIDTH_VW}vw)`,
                transform: isOpen ? "translateX(0)" : `translateX(${size}px)`,
                transition: "transform 0.3s ease, width 0.3s ease"
            }}>
            <ToolBeltStrip paneRef={paneRef}></ToolBeltStrip>
            <ToolBeltContent></ToolBeltContent>
        </div>
    </>;
}
