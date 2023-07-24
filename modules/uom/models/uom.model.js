module.exports = (sequelize, DataTypes) => {

    const UOM = sequelize.define('uom', {
        name: {
            type: DataTypes.STRING
          },
          symbol: {
            type: DataTypes.STRING
          },
          info: {
            type: DataTypes.TEXT
          },
          status: {
            type: DataTypes.INTEGER
          }
    }, {
        freezeTableName: true,
        tableName: 'uom'
    });
  
  
    return UOM;
  
}