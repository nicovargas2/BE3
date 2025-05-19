const pathHandler = (req, res) => {
    const error = 'Path not found';
    const { method, originalURL } = req;
    return res.status(404).json({ error, method, originalURL })
};

export default pathHandler;

