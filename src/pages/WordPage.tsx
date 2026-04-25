import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getWord} from "../api/dictionaryApi.ts";

export default function WordPage() {
    const {word} = useParams();
    const {data} = useQuery({
        queryKey: ["dictionary", word],
        queryFn: () => getWord(word!),
        enabled: !!word
    });
    return <>
        {data ? <>
                <h1>{data.word}</h1>
                <h2>{data.ipaPronunciation}</h2>
                {data.respelling ? <h2>{data.respelling}</h2> : <h2>No respelling</h2>}
                {data.audio ? <h2>{data.audio}</h2> : <h2>No audio</h2>}
                {data.profanity ? <h2>Profanity</h2> : <h2>Not profanity</h2>}
            </>
            : <h1>Sorry, this word doesn't exist in our dictionary!</h1>}
    </>;
}