import {useToolBeltTab} from "../../../context/ToolBelt/ToolBeltHooks.ts";

export default function WordHeader() {
    const {activeWordData} = useToolBeltTab();
    return <>
        {activeWordData ? <>
                <h1>{activeWordData.word}</h1>
                <h2>{activeWordData.ipaPronunciation}</h2>
                {activeWordData.respelling ? <h2>{activeWordData.respelling}</h2> : <h2>No respelling</h2>}
                {activeWordData.audio ? <h2>{activeWordData.audio}</h2> : <h2>No audio</h2>}
                {activeWordData.profanity ? <h2>Profanity</h2> : <h2>Not profanity</h2>}
            </>
            : <h1>No words searched!</h1>}
    </>;
}