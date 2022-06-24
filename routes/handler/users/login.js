const { User } = require('../../../models/');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');

const v = new Validator();


module.exports = async (req, res) => {
    const schema = {
        email: { type: 'email', empty: false },
        password: { type: 'string', empty: false },
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) { 
        return res.status(400).json({
            message: 'Invalid data',
            errors: validate
        });
    }

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user) { 
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) { 
        return res.status(401).json({
            status: 'error',
            message: 'Invalid password'
        });
    }

    return res.status(200).json({
        status: 'success',
        message: 'User logged in',
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            profession: user.profession,
        },
    })
}