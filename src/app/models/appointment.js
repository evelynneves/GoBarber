module.exports = (sequelize, DataTypes) => {
  const appointment = sequelize.define('appointment', {
    date: DataTypes.DATE
  })

  appointment.associate = models => {
    appointment.belongsTo(models.User, { foreignKey: 'user_id' })
    appointment.belongsTo(models.User, { foreignKey: 'provider_id' })
  }

  return appointment
}
