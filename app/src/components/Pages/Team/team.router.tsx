import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'
import TeamList from './TeamList'
import TeamForm from './TeamForm'

export function TeamRouter() {
    return (
        <Container>
            <Routes>
                <Route path="" index element={<TeamList />} />
                <Route path=":teamId" element={<TeamForm />} />
                <Route path="new" element={<TeamForm />} />
            </Routes>
        </Container>
    )
}
