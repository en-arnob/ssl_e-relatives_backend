module.exports = (sequelize, DataTypes) => {
  const InvestigationInstrument = sequelize.define(
    "investigation_to_instruments",
    {
      investigation_id: {
        type: DataTypes.INTEGER,
      },
      instrument_id: {
        type: DataTypes.INTEGER,
      },
      qty: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      tableName: "investigation_to_instruments",
    }
  );

  return InvestigationInstrument;
};
