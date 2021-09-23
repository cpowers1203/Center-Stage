'use strict';
module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define('WatchList', {
    userId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    concertId: DataTypes.INTEGER
  }, {});
  WatchList.associate = function(models) {
    // associations can be defined here
    WatchList.belongsTo(models.Artist, { foreignKey: "artistId" })
    WatchList.belongsTo(models.Venue, { foreignKey: "venueId" })
    WatchList.belongsTo(models.User, {foreignKey: "userId"})
  };
  return WatchList;
};