import * as sequelize from 'sequelize'
import {UserFactory} from './User'
import * as dotenv from "dotenv"
dotenv.config();

export const dbConfig = new sequelize.Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER_NAME,
    process.env.DATABASE_USER_PASSWORD,
    {
        port: Number(process.env.DATABASE_PORT),
        host: process.env.DATABASE_HOST,
        dialect: "postgres",
        define: {
            timestamps: false
        },
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
    }
);

export const User = UserFactory(dbConfig);

// Users have skills them lets create that relationship

// User.hasMay(Skills);

// // or instead of that, maybe many users have many skills
// Skills.belongsToMany(Users, { through: "users_have_skills" });