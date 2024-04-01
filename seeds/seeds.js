const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

const seed = async () => {
    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        console.log('Database seeded successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed();
