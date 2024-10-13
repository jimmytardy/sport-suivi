import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'
import GameList from './GameList'
import GameForm from './GameForm'

export function GameRouter() {
    return (
        <Container>
            <Routes>
                <Route path="" index element={<GameList />} />
                <Route path="/new" index element={<GameForm />} />
                <Route path=":gameId" index element={<GameForm />} />
            </Routes>
        </Container>
    )
}
