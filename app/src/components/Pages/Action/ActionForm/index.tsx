import React from 'react'
import { TextField } from '@mui/material'
import AppForm from '../../../utils/AppForm'
import { useFormContext } from 'react-hook-form'
import { IActionTypePayload } from '../actionType.interface'

const ActionTypeForm: React.FC = () => {
    return (
        <AppForm api="actionType" labelName="Action" queryParamId="actionTypeId" redirect="/actionType">
            <ActionTypeFormWorker />
        </AppForm>
    )
}

export default ActionTypeForm

const ActionTypeFormWorker = () => {
    const { register } = useFormContext<IActionTypePayload>()

    return (
        <>
            <TextField
                label="Nom de l'action (plaquage, tir, ...)"
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Le nom du actionType est obligatoire.',
                    },
                    minLength: {
                        value: 3,
                        message: 'La taille du Nom du ActionType doit faire minimum 3 lettres.',
                    },
                })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Phase (Offensif, Defensif, ...)"
                {...register('phase', {
                    required: {
                        value: true,
                        message: 'Le nom de la phase est obligatoire.',
                    },
                    minLength: {
                        value: 3,
                        message: 'La taille de la phase doit faire minimum 3 lettres.',
                    },
                })}
                fullWidth
                margin="normal"
            />
        </>
    )
}
