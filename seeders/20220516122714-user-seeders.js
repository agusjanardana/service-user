'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert(
        'users',
        [
            {
                name: 'John Doe',
                profession: 'Admin Micro',
                role: 'admin',
                email: 'bjanardana@gmail.com',
                password: await bcrypt.hash('123456', 10),
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'Yehn',
                profession: 'Admin Makro',
                role: 'student',
                email: 'bjanardana@ymail.com',
                password: await bcrypt.hash('123456', 10),
                created_at: new Date(),
                updated_at: new Date(),
            },
        ],
        {}
    );
  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
