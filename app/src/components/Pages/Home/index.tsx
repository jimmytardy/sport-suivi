import { Grid2 } from "@mui/material";
import TeamList from "../Team/TeamList";
import PlayerList from "../Player/PlayerList";
import ActionTypeList from "../Action/ActionList";


export default function Home()  {
    return (
        <Grid2 container>
            <Grid2 size={{ xs: 12, sm: 5, lg: 3 }} >
                <ActionTypeList />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 5, lg: 3 }} offset={{ sm: 1}}>
                <PlayerList />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, lg: 3 }} offset={{ lg: 1}}></Grid2>
        </Grid2>
    )
}