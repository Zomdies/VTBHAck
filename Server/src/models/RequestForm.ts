import { Sequelize, BuildOptions, DataTypes, Model } from "sequelize"

export interface RequestFormAttributes {
    ID_RequestForm? : string;
    ID_User: string;
    Recipient : string;
    Sum : number;
    Comment : string;
}
export interface RequestFormModel extends Model<RequestFormAttributes>, RequestFormAttributes {}
export class RequestForm extends Model<RequestFormModel, RequestFormAttributes> {}

export type RequestFormStatic = typeof Model & {
    new (values? : object, options? : BuildOptions) : RequestFormModel;
}
export function RequestFormFactory (sequelize: Sequelize): RequestFormStatic {
    return <RequestFormStatic>sequelize.define("RequestForms", {
        ID_User: {
            type: DataTypes.UUID,
            allowNull : false
        },
        ID_RequestForm : {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue : DataTypes.UUIDV4
        },
        Recipient: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Sum: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    });
}
