import { Sequelize, BuildOptions, DataTypes, Model } from "sequelize"

export interface UserAttributes {
    ID_User? : number;
    Email : string;
    Password : string;
    Salt : string;
    ConfirmEmail? : boolean
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
    new (values? : object, options? : BuildOptions) : UserModel;
}
export function UserFactory (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("Users", {
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
    });
}
