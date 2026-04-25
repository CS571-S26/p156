import {TOOL_BELT_STRIP_WIDTH_VW} from "./ToolBeltConstants.ts";
import WordHeader from "./WordView/WordHeader.tsx";
import WordEntry from "./WordView/WordEntry.tsx";
import {useToolBeltTab} from "../../context/ToolBelt/ToolBeltHooks.ts";
import {useNavigate} from "react-router-dom";

export default function ToolBeltContent() {
    const {activeWordData} = useToolBeltTab();
    const dictionaryWordEntries = activeWordData?.dictionaryWordEntries ?? null;
    const navigate = useNavigate();
    return <>
        <div className="container-fluid content pe-5" style={{left: `${TOOL_BELT_STRIP_WIDTH_VW}vw`}}>
            <WordHeader></WordHeader>
            <button onClick={() => navigate(`/dictionary/${activeWordData?.word}`)}>View Full Page</button>
            {dictionaryWordEntries && <div style={{display: "flex", flexDirection: "column", gap: "2vw"}}>
                {dictionaryWordEntries.map((entry => {
                    return <WordEntry entry={entry}></WordEntry>;
                }))}
            </div>
            }
        </div>
    </>;
}