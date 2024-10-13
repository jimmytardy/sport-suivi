import React from 'react'
import { TextField } from '@mui/material'
import AppForm from '../../../utils/AppForm'
import { useFormContext } from 'react-hook-form'
import { ITeamPayload } from '../team.interface'

const TeamForm: React.FC = () => {
    return (
        <AppForm api="team" labelName="Equipe" queryParamId="teamId" redirect="/team">
            <TeamFormWorker />
        </AppForm>
    )
}

export default TeamForm

const TeamFormWorker = () => {
    const { register } = useFormContext<ITeamPayload>()

    return (
        <>
            <TextField
                label="Nom de l'équipe"
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Le nom du team est obligatoire.',
                    },
                    minLength: {
                        value: 3,
                        message: 'La taille du Nom du Team doit faire minimum 3 lettres.',
                    },
                })}
                fullWidth
                margin="normal"
            />
            <TextField label="Description" {...register('description')} fullWidth margin="normal" />
            <TextField
                label="Sport"
                {...register('sport', {
                    required: {
                        value: true,
                        message: 'Le nom du sport est obligatoire.',
                    },
                    minLength: {
                        value: 3,
                        message: 'La taille du sport doit faire minimum 3 lettres.',
                    },
                })}
                fullWidth
                margin="normal"
            />
        </>
    )
}
