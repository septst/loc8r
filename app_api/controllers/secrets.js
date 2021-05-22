const getSecretByKey = (req, res) => {
    if (!req.params.key) {
        return res.status(300).json({ "message": "key is required" });
    } else if (process.env[req.params.key]) {
        return res.status(200).json({ "key": process.env[req.params.key] });
    } else {
        return res.status(404).json({ "message": "key not found" });
    };
};

module.exports = { getSecretByKey };