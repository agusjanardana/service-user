const { User } = require('../../../models/');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = async (req, res, next) => {
    const schema = {
        name: { type: 'string', min: 3, max: 30, empty: false },
        email: { type: 'email', empty: false },
        password: { type: 'string', min: 6, max: 30, empty: false },
        profession: { type: 'string', min: 3, max: 30, empty: true },
    }

    const validate = v.validate(req.body, schema);
    if(validate.length) {
        return res.status(400).json({
            message: 'Invalid data',
            errors: validate
        });
    }

    const user = await User.findOne({
        where: { email: req.body.email }
    })

    if (user) {
        return res.status(409).json({
            message: 'Email already exists'
        });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const data = {
        name: req.body.name,
        email: req.body.email,
        password,
        profession: req.body.profession,
        role: 'student'
    }

    const createUser = await User.create(data);

    return res.status(201).json({
        message: 'User created',
        data: {
            id: createUser.id,
        },
    });
}