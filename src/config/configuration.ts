import { resolve } from "path";

export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        uri: process.env.DATABASE_URI,
        port: parseInt(process.env.DATABASE_PORT, 10) || 27017
    },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    jwtSecret: process.env.JWT_SECRET,
    stripeSecret: process.env.STRIPE_SECRET,
    baseUrl: process.env.BASE_URL,
    homepageUrl: process.env.HOMEPAGE_URL,
    storage: process.env.STORAGE || resolve(__dirname, '..', '..', 'storage')
});
