define(['dojo/topic'],
  function(topic) {
    require(['maptiks'], function(mapWrapper) {
      topic.subscribe('map-loaded', function(response) {
        if (response.hasOwnProperty('map')) { // if response is a map
          var appSettings = app.data.appItem.data.values.settings;
          var container = response.map.container; // the current map div
          var mapIndex = $('.map').index(container) + 1;
          if (appSettings.maptiks) { // maptiks have been entered in builder
            var maptiksTrackcode = appSettings.maptiks.trackcode;
            var maptiksId = appSettings.maptiks.id;
            var maptiksMapOptions = {
              maptiks_trackcode: maptiksTrackcode,
              maptiks_id: maptiksId + ':map' + mapIndex
            };
            mapWrapper(container, maptiksMapOptions, response.map);
          }
          topic.publish('maptiks-ready', mapWrapper, response, mapIndex);  
        }
      });
    });
  }
);