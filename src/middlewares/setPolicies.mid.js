//depende de un helper para verificar el token
import { verifyToken } from "../helpers/token.helper.js";


// Se encarga de si la ruta es pública o para usuarios o para admin,
// y si el token es correcto o no
const setupPolicies = (policies) => async (req, res, next) => {
    try {
        if (policies.includes("PUBLIC")) return next();
        // prueba token
        //const token = req?.cookies?.token;
        let token = req?.cookies?.token;
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }
        if (!token) return res.json401("Token no proporcionado");
        // fin prueba

        const data = verifyToken(token);
        const { role, user_id } = data;
        if (!role || !user_id) return res.json401();
        const roles = {
            USER: policies.includes("USER"),
            ADMIN: policies.includes("ADMIN"),
        };
        if (roles[role]) {
            req.user = data;
            return next();
        } else {
            res.json(403);
        }
    } catch (error) {
        next(error)
    }
};

export default setupPolicies;
