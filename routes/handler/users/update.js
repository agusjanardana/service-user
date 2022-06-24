const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const scheme = {
        name: "string|empty:false",
        email: "email|empty:false",
        password: "string|min:6",
        profession: "string|optional",
        avatar: "string|optional",
    };

    const validate = v.validate(req.body, scheme);

    if (validate.length) {
        return res.status(400).json({
            status: "error",
            message: validate,
        });
    }

    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found",
        });
    }

    const email = req.body.email;
    if (email) {
        const checkEmail = await User.findOne({ where: { email } });
        if (checkEmail && email !== user.email) {
            return res.status(409).json({
                status: "error",
                message: "email already exist",
            });
        }
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await user.update(req.body);

    delete req.body.password;

    return res.json({
        status: "success",
        data: req.body,
    });
};
