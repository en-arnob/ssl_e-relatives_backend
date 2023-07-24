module.exports = (sequelize, DataTypes) => {

    const RolePermission = sequelize.define('role_permission', {
        role_id: {
            type: DataTypes.INTEGER
        },
        module_id: {
          type: DataTypes.INTEGER
        },
        activity_id: {
          type: DataTypes.INTEGER
        },
      }, {
        freezeTableName: true,
        tableName: 'role_permission'
    }
    );
  
  
    return RolePermission;
  
}