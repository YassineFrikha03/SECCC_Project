const jwt = require('jsonwebtoken');

const verifierToken = (req, res, next) => {
    // On cherche le badge dans l'en-tête de la requête
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        // Le token est souvent envoyé sous la forme "Bearer LE_TOKEN"
        const tokenPropre = token.split(" ")[1];
        const verifie = jwt.verify(tokenPropre, process.env.JWT_SECRET);
        req.user = verifie;
        next(); // Le badge est valide, on laisse passer vers la route (GET, PUT ou DELETE)
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré." });
    }
};

module.exports = verifierToken;