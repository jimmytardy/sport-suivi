import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { baseURL } from '../../../axiosClient'
import { Card, Stack } from '@mui/material'

export default function SignIn() {

    const signUpGoogle = async () => {
        window.location.href = baseURL + '/auth/sign-up/google'
    }

    return (
        <Stack direction="column" justifyContent="space-between" maxWidth={500} margin={'auto'}>
            <Card variant="outlined">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button fullWidth variant="outlined" onClick={signUpGoogle}>
                        Connectez vous avec Google
                    </Button>
                </Box>
            </Card>
        </Stack>
    )
}
