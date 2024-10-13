import { Route, Routes } from 'react-router'
import PlayerForm from './PlayerForm'
import PlayerList from './PlayerList'
import { Container } from '@mui/material'

export function PlayerRouter() {
    return (
        <Container>
            <Routes>
                <Route path="" index element={<PlayerList />} />
                <Route path=":playerId" element={<PlayerForm />} />
                <Route path="new" element={<PlayerForm />} />
            </Routes>
        </Container>
    )
}
