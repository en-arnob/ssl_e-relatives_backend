module.exports = (sequelize, DataTypes) => {
  const FileUploadType = sequelize.define("file_upload_type", {
    name: {
      type: DataTypes.STRING,
    },
    extensions: {
      type: DataTypes.STRING,
    },
    file_size: {
      type: DataTypes.INTEGER,
    },
    info: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.INTEGER,
    },
  });

  return FileUploadType;
};
