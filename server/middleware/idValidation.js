const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: 'Invalid ID parameter',
            errors: ['ID must be a positive integer']
        });
    }

    req.params.id = id;
    next();
};

export default validateId;