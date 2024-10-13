import React, { useState, useEffect } from 'react'
import { Button, List, ListItem, ListItemText, CircularProgress, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router'
import { useAuth } from '../../../../hooks/AuthContext'
import EditIcon from '@mui/icons-material/Edit'
import StartIcon from '@mui/icons-material/Start'
import Loader from '../../../utils/Loader'
import { useHttpCrud } from '../../../../hooks/HttpCrud'
import QueryStatsIcon from '@mui/icons-material/QueryStats';

interface IGame {
    _id: string
    name: string
    phase: string
}

const GameList: React.FC = ({}) => {
    const { user } = useAuth();
    const { findAll } = useHttpCrud<IGame>('game' )
    const [games, setGame] = useState<IGame[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const data = await findAll()
                setGame(data)
            } catch (error) {
                console.error('Erreur lors du chargement des Game', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGame()
    }, [user._id])

    const handleAddGame = () => {
        navigate('/game/new')
    }

    const handleUpdateGame = (id: string) => {
        navigate(`/game/${id}`)
    }

    const handleGoGame = (id: string) => {
        navigate(`/${id}`)
    }

    if (!games) return <Loader />

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleAddGame} className="mt-5">
                Créer un match
            </Button>
            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {games.map((game) => (
                        <ListItem
                            key={'games-' + game._id}
                            secondaryAction={[
                                <IconButton key={'games-' + game._id + 'icon-1'} edge="end" aria-label="Analyser" onClick={() => handleUpdateGame(game._id)}>
                                    <QueryStatsIcon />
                                </IconButton>,
                                <IconButton key={'games-' + game._id + 'icon-1'} edge="end" aria-label="modifier" onClick={() => handleUpdateGame(game._id)}>
                                    <EditIcon />
                                </IconButton>,
                                <IconButton key={'games-' + game._id + 'icon-3'} edge="end" aria-label="modifier" onClick={() => handleGoGame(game._id)}>
                                    <StartIcon />
                                </IconButton>
                            ]}
                        >
                            <ListItemText primary={game.name} secondary={game.phase} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
}

export default GameList
