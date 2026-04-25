import {useQuery} from "@tanstack/react-query";
import {useUserContext} from "../context/User/UserContextHooks.ts";
import {getChips} from "../api/chipApi.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Chip from "../components/Chip/Chip.tsx";
import {ChipModal} from "../components/Chip/ChipModal.tsx";

export default function InventoryPage() {
    const navigate = useNavigate();
    const {data, isError, error} = useQuery({
        queryKey: ["chips"],
        queryFn: getChips,
    });
    useEffect(() => {
        if (isError) {
            navigate("/error");
        }
    }, [navigate, isError, error]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return <>
        <h1>Inventory</h1>
        <button onClick={() => setIsModalOpen(true)}>Create Chip</button>
        {data &&
            <div style={styles["chip-grid"]}>
                {data.map((chip) => <Chip chip={chip}/>)}
            </div>
        }
        {isModalOpen && <ChipModal setIsModalOpen={setIsModalOpen}/>}
    </>;
}

const styles = {
    "chip-grid": {
        display: "grid",
        gridTemplateColumns: "33% 33% 33%",
        gap: "20px"
    }
};
;
;