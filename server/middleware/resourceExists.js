const resourceExists = (Model) => {
    return async (req, res, next) => {
        try {
            const id = req.params.id;
            const resource = await Model.getById(id);
            const resourceName = Model.name;

            if (!resource) {
                return res.status(404).json({
                    message: `${resourceName} with id ${id} not found`
                });
            }

            req.resource = resource; // Attach to request
            next();
        } catch (error) {
            console.error(`Error checking ${resourceName} existence:`, error.message);
            res.status(500).json({ message: `Server error while checking ${resourceName} existence` });
        }
    };
};

export default resourceExists;