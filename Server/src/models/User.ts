import { Sequelize, DataTypes } from "sequelize"

// const sequelize = new Sequelize(process.env.DATABASE_STRING_CONNECTION, { define: { timestamps: false } });
//postgres://postgres:29012001@localhost:5432/VTBHack
const sequelize = new Sequelize("VTBHack", "postgres", "29012001", {
    dialect: "postgres",
    host: "localhost",
    logging: false,
    define: {
        
        timestamps: false
    }
});

export const User = sequelize.define("User", {
    ID_User: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue : DataTypes.UUIDV4
    },
    Email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    Password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Salt: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ConfirmEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
})


// sequelize.sync({ force: true }).then(result => {
//     console.log("User model created");
// })
//     .catch(err => console.log(err));