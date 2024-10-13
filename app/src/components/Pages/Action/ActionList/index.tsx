import React, { useState, useEffect } from 'react'
import { Button, List, ListItem, ListItemText, CircularProgress, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../../hooks/AuthContext'
import EditIcon from '@mui/icons-material/Edit'
import axiosClient from '../../../../axiosClient'
import StartIcon from '@mui/icons-material/Start'
import Loader from '../../../utils/Loader'
import { useHttpCrud } from '../../../../hooks/HttpCrud'

interface IActionType {
    _id: string
    name: string
    phase: string
}

const ActionTypeList: React.FC = ({}) => {
    const { user } = useAuth();
    const { findAll } = useHttpCrud<IActionType>('actionType' )
    const [actionTypes, setActionType] = useState<IActionType[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchActionType = async () => {
            try {
                const data = await findAll()
                setActionType(data)
            } catch (error) {
                console.error('Erreur lors du chargement des ActionType', error)
            } finally {
                setLoading(false)
            }
        }

        fetchActionType()
    }, [user._id])

    const handleAddActionType = () => {
        navigate('/actionType/new')
    }

    const handleUpdateActionType = (id: string) => {
        navigate(`/actionType/${id}`)
    }

    const handleGoActionType = (id: string) => {
        navigate(`/${id}`)
    }

    if (!actionTypes) return <Loader />

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleAddActionType} className="mt-5">
                Définir un type d'action (tir, plaquage...)
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {actionTypes.map((actionType) => (
                        <ListItem
                            key={'actionTypes-' + actionType._id}
                            secondaryAction={[
                                <IconButton key={'actionTypes-' + actionType._id + 'icon-1'} edge="end" aria-label="modifier" onClick={() => handleUpdateActionType(actionType._id)}>
                                    <EditIcon />
                                </IconButton>,
                                <IconButton key={'actionTypes-' + actionType._id + 'icon-2'} edge="end" aria-label="modifier" onClick={() => handleGoActionType(actionType._id)}>
                                    <StartIcon />
                                </IconButton>
                            ]}
                        >
                            <ListItemText primary={actionType.name} secondary={actionType.phase} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
}

export default ActionTypeList
