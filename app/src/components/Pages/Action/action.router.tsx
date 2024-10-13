import { Route, Routes } from 'react-router'
import { Container } from '@mui/material'
import ActionTypeForm from './ActionForm'
import ActionTypeList from './ActionList'

export function ActionTypeRouter() {
    return (
        <Container>
            <Routes>
                <Route path="" index element={<ActionTypeList />} />
                <Route path=":actionTypeId" element={<ActionTypeForm />} />
                <Route path="new" element={<ActionTypeForm />} />
            </Routes>
        </Container>
    )
}
