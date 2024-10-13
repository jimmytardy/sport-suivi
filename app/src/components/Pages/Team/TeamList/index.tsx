import React, { useState, useEffect } from 'react'
import { Button, List, ListItem, ListItemText, CircularProgress, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../../hooks/AuthContext'
import EditIcon from '@mui/icons-material/Edit'
import axiosClient from '../../../../axiosClient'
import StartIcon from '@mui/icons-material/Start'
import Loader from '../../../utils/Loader'

interface Team {
    _id: string
    name: string
    description: string
    sport: string
}

const TeamList: React.FC = ({}) => {
    const { user } = useAuth()
    const [teams, setTeams] = useState<Team[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axiosClient.get(`/team`)
                setTeams(response.data)
            } catch (error) {
                console.error('Erreur lors du chargement des Teams', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTeams()
    }, [user._id])

    const handleAddTeam = () => {
        navigate('/team/new')
    }

    const handleUpdateTeam = (id: string) => {
        navigate(`/team/${id}`)
    }

    const handleGoTeam = (id: string) => {
        navigate(`/${id}`)
    }

    if (!teams) return <Loader />

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleAddTeam} className="mt-5">
                Ajouter une équipe
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {teams.map((team) => (
                        <ListItem
                            key={'teams-' + team._id}
                            secondaryAction={[
                                <IconButton key={'teams-' + team._id + 'icon-1'} edge="end" aria-label="modifier" onClick={() => handleUpdateTeam(team._id)}>
                                    <EditIcon />
                                </IconButton>,
                                <IconButton key={'teams-' + team._id + 'icon-2'} edge="end" aria-label="modifier" onClick={() => handleGoTeam(team._id)}>
                                    <StartIcon />
                                </IconButton>
                            ]}
                        >
                            <ListItemText primary={team.name} secondary={team.sport} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
}

export default TeamList
