import React, { useState, useEffect } from 'react'
import { Button, List, ListItem, ListItemText, CircularProgress, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../../hooks/AuthContext'
import EditIcon from '@mui/icons-material/Edit'
import axiosClient from '../../../../axiosClient'
import StartIcon from '@mui/icons-material/Start'
import Loader from '../../../utils/Loader'
import { getFullName, IPlayer } from '../player.interface'

const PlayerList: React.FC = ({}) => {
    const { user } = useAuth()
    const [players, setPlayers] = useState<IPlayer[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axiosClient.get(`/player`)
                setPlayers(response.data)
            } catch (error) {
                console.error('Erreur lors du chargement des Players', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPlayers()
    }, [user._id])

    const handleAddPlayer = () => {
        navigate('/player/new')
    }

    const handleUpdatePlayer = (id: string) => {
        navigate(`/player/${id}`)
    }

    const handleGoPlayer = (id: string) => {
        navigate(`/${id}`)
    }

    if (!players) return <Loader />

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleAddPlayer} className="mt-5">
                Ajouter un joueur
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {players.map((player) => (
                        <ListItem
                            key={'player-' + player._id}
                            secondaryAction={[
                                <IconButton edge="end" aria-label="modifier" onClick={() => handleUpdatePlayer(player._id)}>
                                    <EditIcon />
                                </IconButton>,
                                <IconButton edge="end" aria-label="modifier" onClick={() => handleGoPlayer(player._id)}>
                                    <StartIcon />
                                </IconButton>
                            ]}
                        >
                            <ListItemText primary={getFullName(player)} secondary={player.teamsIds} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
}

export default PlayerList
