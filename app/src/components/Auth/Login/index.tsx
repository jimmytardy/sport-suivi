import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/AuthContext'
import axiosClient from '../../../axiosClient'
import { Button, Card, CardContent, CardHeader, Container, FormLabel, Grid2, TextField } from '@mui/material'

const Login = (): JSX.Element => {
    const [error, setError] = useState<string>();
    const { setToken } = useAuth();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        const submitOnEnter = (e: any) => {
            if (e.key === 'Enter') {
                handleSubmit(login)
            }
        }
        document.addEventListener('keydown', submitOnEnter)
        return () => {
            document.removeEventListener('keydown', submitOnEnter)
        }
    }, [])

    const login = async (data: any) => {
        try {
            let params = {
                email: data.email,
                password: data.password,
            }
            const response = await axiosClient.post('/auth/login', params)
            setToken(response.data.access_token);
            navigate('/home', { replace: true })
        } catch (e) {
            setError("L'email et/ou le mot de passe sont incorrects");
        }
    }

    return (
        <Container>
            <Grid2 container
                className="justify-content-center align-items-center m-auto"
                style={{ height: '100vh', maxWidth: 600 }}
            >
                <Card className="mb-3 p-0">
                    <Grid2 size={12}>
                        <CardContent>
                            <form
                                autoComplete="off"
                                onSubmit={handleSubmit(login)}
                            >
                                <div className="mb-3 mt-4">
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <TextField
                                        type="email"
                                        className="form-control shadow-none"
                                        id="exampleFormControlInput1"
                                        {...register('email', {
                                            required: 'Email is required!',
                                        })}
                                    />
                                    {errors.email && (
                                        <p
                                            className="text-danger"
                                            style={{ fontSize: 14 }}
                                        >
                                            {/* @ts-ignore */}
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <FormLabel>
                                        Mot de passe
                                    </FormLabel>
                                    <TextField
                                        type="password"
                                        className="shadow-none"
                                        id="exampleFormControlInput2"
                                        {...register('password', {
                                            required:
                                                'Password is required!',
                                        })}
                                    />
                                    {errors.password && (
                                        <p
                                            className="text-danger"
                                            style={{ fontSize: 14 }}
                                        >
                                            {/* @ts-ignore */}
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <div className="text-center mt-4">
                                    <Button
                                        variant="outlined"
                                        className="text-center shadow-none mb-3"
                                        type="submit"
                                    >
                                        Se connecter
                                    </Button>
                                    <CardContent className="pb-2">
                                        Vous n'avez pas de un compte ? <br />
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                            to={'/register'}
                                        >
                                            S'inscrire
                                        </Link>
                                    </CardContent>
                                </div>
                                {error && (
                                    <div className="mb-3 text-danger">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </CardContent>
                    </Grid2>
                </Card>
            </Grid2>
        </Container>
    )
}
export default Login
