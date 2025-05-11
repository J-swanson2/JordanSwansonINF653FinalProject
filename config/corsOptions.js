//const whitelist = ['localhost:3500', 'https://fluffy-ancient-peace.glitch.me'];

const corsOptions = {
    origin: (origin, callback) => {
        if (true) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;