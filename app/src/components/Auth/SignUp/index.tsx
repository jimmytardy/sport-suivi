import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { IUserPayload } from '../../../interfaces/user.interface'
import axiosClient from '../../../axiosClient'
import { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardHeader, Container, FormControl, FormGroup, FormLabel, Grid2, TextField, Typography } from '@mui/material'

const SignUp = () => {
    let [searchParams] = useSearchParams()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IUserPayload>({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            bitget: {
                api_key: '',
                api_secret_key: '',
                api_pass: '',
            },
        },
    })
    const [referrer, setReferrer] = useState<{ firstname: string; lastname: string }>()
    const [error, setError] = useState<string>()

    const navigate = useNavigate()

    const initReferrer = async () => {
        if (searchParams.get('referralCode')) {
            try {
                const response = await axiosClient.get(`/user/referral/${searchParams.get('referralCode')}`)
                setReferrer(response.data)
            } catch (e) {
                console.error(e)
            }
        }
    }

    useEffect(() => {
        const submitOnEnter = (e: any) => {
            if (e.key === 'Enter') {
                handleSubmit(submitData)
            }
        }
        document.addEventListener('keydown', submitOnEnter)
        initReferrer()
        return () => {
            document.removeEventListener('keydown', submitOnEnter)
        }
    }, [])

    const submitData = async (data: IUserPayload) => {
        let params: any = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            bitget: data.bitget,
        }
        if (searchParams.get('referralCode') && referrer) {
            params.referralCode = searchParams.get('referralCode')
        }
        try {
            const response = await axiosClient.post('/auth/signup', params)
            reset()
            localStorage.setItem('token', response.data.access_token)
            navigate('/', { replace: true })
        } catch (e: any) {
            setError(e.response.data.message)
        }
    }
    return (
        <Container>
            <Grid2 container className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card className="mb-3 mt-3 rounded p-0" style={{ maxWidth: '500px' }}>
                    <Grid2 size={12}>
                        <CardContent>
                            <CardHeader className="text-center text-secondary mt-3 mb-3">Inscription</CardHeader>
                            <form autoComplete="off" onSubmit={handleSubmit(submitData)}>
                                <FormGroup>
                                    <Grid2 container>
                                        <Grid2 size={6}>
                                            <FormLabel>Prénom</FormLabel>
                                            <TextField
                                                {...register('firstname', {
                                                    required: 'Le prénom est obligatoire !',
                                                })}
                                            />
                                            {errors.firstname && (
                                                <p className="text-danger" style={{ fontSize: 14 }}>
                                                    {/* @ts-ignore */}
                                                    {errors.firstname.message}
                                                </p>
                                            )}
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <FormLabel>Nom</FormLabel>
                                            <TextField
                                                type="text"
                                                {...register('lastname', {
                                                    required: 'Le nom  est obligatoire !',
                                                })}
                                            />
                                            {errors.lastname && (
                                                <p className="text-danger" style={{ fontSize: 14 }}>
                                                    {/* @ts-ignore */}
                                                    {errors.lastname.message}
                                                </p>
                                            )}
                                        </Grid2>
                                    </Grid2>
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <FormLabel>Email</FormLabel>
                                    <TextField
                                        type="email"
                                        {...register('email', {
                                            required: 'Email is required!',
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-danger" style={{ fontSize: 14 }}>
                                            {/* @ts-ignore */}
                                            {errors.email.message}
                                        </p>
                                    )}
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <FormLabel>Mot de passe</FormLabel>
                                    <TextField
                                        label="Mot de passe"
                                        type="password"
                                        {...register('password', {
                                            required: 'Mot de passe est obligatoire !',
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-danger" style={{ fontSize: 14 }}>
                                            {/* @ts-ignore */}
                                            {errors.password.message}
                                        </p>
                                    )}
                                </FormGroup>
                                <Grid2 className="mt-4">
                                    <Typography color='error'>{error}</Typography>
                                </Grid2>
                                <div className="text-center mt-4">
                                    <Button variant="outlined" className="text-center shadow-none mb-3" type="submit">
                                        S'inscrire
                                    </Button>
                                    <CardContent>
                                        Vous avez déjà un compte <br />
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                            }}
                                            to={'/login'}
                                        >
                                            Connectez-vous
                                        </Link>
                                    </CardContent>
                                </div>
                            </form>
                        </CardContent>
                    </Grid2>
                </Card>
            </Grid2>
        </Container>
    )
}

export default SignUp
