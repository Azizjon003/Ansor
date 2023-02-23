const users = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telegramId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      allowNull: false,
      defaultValue: "user",
    },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "inactive"],
    },
    questions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    job: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subjob: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return users;
};
module.exports = users;
