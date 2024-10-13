import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import axiosClient from '../../../../axiosClient'
import { useFormContext } from 'react-hook-form'
import Loader from '../../../utils/Loader'
import { IPlayerPayload } from '../player.interface'
import { ITeam } from '../../Team/team.interface'
import AppForm from '../../../utils/AppForm'
import { ControllerSelect } from '../../../utils/controllers/ControllerSelect'

const PlayerForm: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [teams, setTeams] = useState<ITeam[]>()

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axiosClient.get(`/team`)
                setTeams(response.data || [])
                setLoading(false)
            } catch (error) {
                console.error('Erreur lors du chargement du player', error)
            }
        }
        fetchTeams()
    }, [])

    if (loading || !teams) return <Loader />

    return (
        <AppForm<IPlayerPayload> api="player" labelName="Joueur" queryParamId="playerId" redirect="/player" defaultValues={{ teamsIds: [] }}>
            <PlayerFormWorker teams={teams} />
        </AppForm>
    )
}

export default PlayerForm

interface IPlayerFormWorkerProps {
    teams: ITeam[]
}

const PlayerFormWorker = ({ teams }: IPlayerFormWorkerProps) => {
    const { register, control } = useFormContext<IPlayerPayload>()
    return (
        <>
            {/* Prénom */}
            <TextField
                label="Prénom"
                {...register('firstname', {
                    required: {
                        value: true,
                        message: 'Le prénom est obligatoire.',
                    },
                    minLength: {
                        value: 2,
                        message: 'La taille du prénom doit faire minimum 2 lettres.',
                    },
                })}
                fullWidth
                margin="normal"
            />

            {/* Nom de famille */}
            <TextField
                label="Nom de famille"
                {...register('lastname', {
                    required: {
                        value: true,
                        message: 'Le nom de famille est obligatoire.',
                    },
                    minLength: {
                        value: 2,
                        message: 'La taille du nom de famille doit faire minimum 2 lettres.',
                    },
                })}
                fullWidth
                margin="normal"
            />

            {/* Date de naissance (facultatif) */}
            <TextField slotProps={{ inputLabel: { shrink: true } }} label="Date de naissance" type="date" {...register('birthday')} fullWidth margin="normal" />

            {/* Identifiants des équipes */}
            <ControllerSelect<IPlayerPayload, 'teamsIds', ITeam>
                id="teamsIds"
                name="teamsIds"
                control={control}
                label="Club associés au joueur"
                params={{
                    keyId: '_id',
                    keyLabel: 'name',
                }}
                multiple
                options={teams}
                selectProps={{
                    labelId: 'teamsIds',
                }}
            />
            {/* Email */}
            <TextField
                label="Email"
                type="email"
                {...register('email', {
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Format d'email invalide.",
                    },
                })}
                fullWidth
                margin="normal"
            />
        </>
    )
}
