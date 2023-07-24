module.exports = (sequelize, DataTypes) => {

    const AccountHead = sequelize.define('account_head', {
        head_type_id: {
            type: DataTypes.INTEGER
        },
        code: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        initial_balance: {
            type: DataTypes.INTEGER
        },
        info: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.INTEGER
        },
        created_by: {
            type: DataTypes.INTEGER,
        },
        updated_by: {
            type: DataTypes.INTEGER,
        }
      },
      {
        freezeTableName: true
      },
    );

  
  
    return AccountHead;
  
}