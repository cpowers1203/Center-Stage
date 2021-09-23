'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: DataTypes.STRING,
    pictureUrl: DataTypes.TEXT
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
    Artist.hasMany(models.Concert, { foreignKey: "artistId" })
    Artist.hasMany(models.WatchList, { foreignKey: "artistId" })
    Artist.hasMany(models.FollowArtist, { foreignKey: "artistId" })
  };
  return Artist;
};