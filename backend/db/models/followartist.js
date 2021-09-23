'use strict';
module.exports = (sequelize, DataTypes) => {
  const FollowArtist = sequelize.define('FollowArtist', {
    artistId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  FollowArtist.associate = function(models) {
    // associations can be defined here
    
  };
  return FollowArtist;
};