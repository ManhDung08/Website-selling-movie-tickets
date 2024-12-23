module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: '24h',
    saltRounds: 10
};