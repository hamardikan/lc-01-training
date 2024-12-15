const { verifyToken } = require("../helpers/jwt.js");
const { User, Grocery, UserGrocery } = require("../models")

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) throw { name: "InvalidToken" };

        const token = authorization.split(' ')[1];
        if (!token) throw { name: "InvalidToken" };

        const payload = verifyToken(token);

        const user = await User.findByPk(payload.id);
        if (!user) throw { name: "InvalidToken" };

        req.user = {
            id: user.id,
            emai: user.email
        };

        next();
    } catch (err) {
        next(err);
    }
}

const authorization = async (req, res, next) => {
    try {
        const { id } = req.params;

        const grocery = await Grocery.findByPk(id);

        if (!grocery) throw { name: "NotFound" };

        const userGrocery = await UserGrocery.findOne({
            where: {
                UserId: req.user.id,
                GrceryId: id
            }
        })

        if (!userGrocery) throw { name: "Forbidden" };

        next();

    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, authorization };