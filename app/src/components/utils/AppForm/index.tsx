import { BaseSyntheticEvent, PropsWithChildren, useEffect, useState } from 'react'
import { DefaultValues, FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import axiosClient from '../../../axiosClient'
import { toast } from 'react-toastify'
import { Box, Button, Typography } from '@mui/material'
import Loader from '../Loader'
import { AxiosRequestConfig } from 'axios'

export interface IAppFormProps<T extends object> extends PropsWithChildren {
    queryParamId: string
    api: string
    redirect: string
    labelName: string;
    defaultValues?: DefaultValues<T>;
    onSubmitTransformPayload?: (data: T, e: BaseSyntheticEvent) => T | FormData;
}

const AppForm = <T extends object,>({ queryParamId, api, labelName, redirect, children, defaultValues, onSubmitTransformPayload }: IAppFormProps<T>) => {
    const paramId = useParams()[queryParamId]

    const navigate = useNavigate()
    const methods = useForm<T>({
        defaultValues
    });
    const {
        reset,
        handleSubmit,
        formState: { errors, submitCount },
    } = methods
    const [loading, setLoading] = useState(Boolean(paramId))

    useEffect(() => {
        if (paramId) {
            // Si un paramId est fourni, récupérer les détails
            const fetchData = async () => {
                try {
                    const response = await axiosClient.get(`${api}/${paramId}`)
                    reset(response.data)
                    setLoading(false)
                } catch (error) {
                    console.error('Erreur lors du chargement', error)
                }
            }

            fetchData()
        }
    }, [paramId])

    useEffect(() => {
        for (const value of Object.values(errors)) {
            if (value?.message) {
                toast(value?.message)
            } else {
                toast("Un champs du formulaire n'est pas valide")
            }
        }
    }, [errors, submitCount])
    const submitData = async (data: T, e: any) => {
        try {
            const axiosConfig: AxiosRequestConfig = {};
            let dataTransformed: FormData | T = data;
            if (onSubmitTransformPayload) dataTransformed = onSubmitTransformPayload(data, e);
            if (dataTransformed instanceof FormData) {
                axiosConfig.headers = {
                    'Content-Type': 'multipart/form-data'
                }
            }

            if (paramId) {
                await axiosClient.put(`/${api}/${paramId}`, dataTransformed, axiosConfig) // Modifier
                toast(`[${labelName}] a été modifié avec succès`)
            } else {
                await axiosClient.post(`/${api}`, dataTransformed, axiosConfig) // Créer
                toast(`[${labelName}] a été crée avec succès`)
            }
            navigate(redirect)
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire', error)
        }
    }

    const handleDelete = async () => {
        if (confirm(`Êtes-vous sur de vouloir supprimer [${labelName}] ?`)) {
            await axiosClient.delete(`/${api}/${paramId}`) // Supprime Le joueur
            toast(`Le joueur a été supprimée avec succès`)
            navigate('/')
        }
    }

    if (loading) return <Loader />

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitData)}>
                <Typography variant="h6">{paramId ? 'Modifier ' : 'Ajouter '} [{labelName}]</Typography>
                {children}
                <Box display={'flex'} justifyContent={'space-between'} flexWrap={'nowrap'} sx={{ marginTop: 5 }}>
                    <Button variant="contained" color="primary" type="submit" sx={{ minWidth: 250, margin: '7px auto 7px' }}>
                        {paramId ? 'Sauvegarder' : 'Ajouter'}
                    </Button>
                    {paramId && (
                        <Button variant="contained" sx={{ minWidth: 250, margin: '7px auto 7px' }} color="error" type="button" onClick={handleDelete}>
                            Supprimer
                        </Button>
                    )}
                    <Button variant="contained" color="inherit" type="button" sx={{ minWidth: 250, margin: '7px auto' }} onClick={() => navigate(redirect)}>
                        Annuler
                    </Button>
                </Box>
            </form>
        </FormProvider>
    )
}

export default AppForm
