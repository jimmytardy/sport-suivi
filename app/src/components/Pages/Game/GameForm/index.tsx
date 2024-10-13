import React, { useState, useEffect, BaseSyntheticEvent } from 'react'
import { TextField } from '@mui/material'
import axiosClient from '../../../../axiosClient'
import Loader from '../../../utils/Loader'
import { IGamePayload } from '../game.interface'
import { ITeam } from '../../Team/team.interface'
import AppForm, { IAppFormProps } from '../../../utils/AppForm'
import { ControllerSelect } from '../../../utils/controllers/ControllerSelect'
import { ChangeHandler, useFormContext } from 'react-hook-form'
import { useHttpCrud } from '../../../../hooks/HttpCrud'

const GameForm: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const { findAll } = useHttpCrud<ITeam>('team')
    const [teams, setTeams] = useState<ITeam[]>()

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setTeams(await findAll())
                setLoading(false)
            } catch (error) {
                console.error('Erreur lors du chargement du game', error)
            }
        }
        fetchTeams()
    }, [])

    if (loading || !teams) return <Loader />

    const handleSubmitTransformPayload: IAppFormProps<IGamePayload>['onSubmitTransformPayload'] = (form: IGamePayload, e: BaseSyntheticEvent) => {
        if (!form.video) return form;
        if (e.target?.video?.files?.length > 0) {
            form.video = e.target?.video?.files[0]
        }
        const formData = new FormData();
        for (const key in form) {
            console.log(key, form[key])
            // @ts-ignore
            formData.append(key, form[key]);
        }
        for (let key of formData.keys()) {
            console.log('key', key)
        }
        console.log('formData', formData)
        return formData;  
    } 

    return (
        <AppForm<IGamePayload> api="game" labelName="Match" queryParamId="gameId" redirect="/game" onSubmitTransformPayload={handleSubmitTransformPayload}>
            <GameFormWorker teams={teams} />
        </AppForm>
    )
}

export default GameForm

interface IGameFormWorkerProps {
    teams: ITeam[]
}

const GameFormWorker = ({ teams }: IGameFormWorkerProps) => {
    const { register, control, watch } = useFormContext<IGamePayload>()
    const form = watch()

    const registerVideo = register('video');
    const oldOnChnage = registerVideo.onChange;
    registerVideo.onChange = (e: any) => {
        console.log(e.target.value);
        return oldOnChnage(e);
    }
    return (
        <>
            <pre>{JSON.stringify(form, null, 2)}</pre>
            {/* Prénom */}
            <TextField
                label="Nom du Match"
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Le nom du match est obligatoire.',
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
                label="Date du match"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('date', {
                    required: {
                        value: true,
                        message: 'La date est obligatoire.',
                    },
                })}
                fullWidth
                margin="normal"
            />

            {/* Identifiants des équipes */}
            <ControllerSelect<IGamePayload, 'teamId', ITeam>
                id="teamsId"
                name="teamId"
                control={control}
                label="Equipe qui as joué le match"
                params={{
                    keyId: '_id',
                    keyLabel: 'name',
                }}
                options={teams}
                selectProps={{
                    labelId: 'teamsIds'
                }}
            />
            {/* Email */}
            <TextField
                label="Vidéo du match"
                type="file"
                slotProps={{ inputLabel: { shrink: true }, htmlInput: { accept: 'video/mp4,video/x-m4v,video/*' } }}
                {...registerVideo}
                onChange={(e) => console.log(e)}
                fullWidth
                margin="normal"
            />
        </>
    )
}
