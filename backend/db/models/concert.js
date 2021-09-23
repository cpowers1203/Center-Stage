'use strict';
module.exports = (sequelize, DataTypes) => {
  const Concert = sequelize.define('Concert', {
    artistId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  Concert.associate = function(models) {
    // associations can be defined here
    Concert.belongsTo(models.Venue, { foreignKey: "venueId" })
    Concert.belongsTo(models.Artist, {foreignKey: "artistId"})
  };
  return Concert;
};