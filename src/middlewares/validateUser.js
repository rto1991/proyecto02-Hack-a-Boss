'use estrict';

const validateUser = (req, res, next) => {
    try {
        console.log(req.headders);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    validateUser,
}