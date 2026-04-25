import type {ChipType} from "../../api/types/chip.ts";
import {deleteChip} from "../../api/chipApi.ts";
import {useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

export default function Chip({chip}: { chip: ChipType }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function deleteChipHandler() {
        try {
            await deleteChip(chip.id);
            await queryClient.invalidateQueries({queryKey: ["chips"]});
        } catch (error: any) {
            navigate("/error");
        }
    }

    return <>
        <div style={{
            display: "inline-flex",
            flexDirection: "column",
            backgroundColor: `${chip.color}`,
            width: "400px",
        }}>
            <div style={{display: "flex", justifyContent: "space-evenly"}}>
                <h3>{chip.category}</h3>
                <h3>{chip.label}</h3>
            </div>
            <p>{chip.createdAt}</p>
            {chip.userId !== null && <button onClick={deleteChipHandler}>Delete</button>}
        </div>
    </>;
};