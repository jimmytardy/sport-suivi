export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        uri: process.env.DATABASE_URI,
        port: parseInt(process.env.DATABASE_PORT, 10) || 27017
    },
    jwtSecret: process.env.JWT_SECRET,
    stripeSecret: process.env.STRIPE_SECRET,
});