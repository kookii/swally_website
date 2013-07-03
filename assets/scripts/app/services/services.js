// Generated by CoffeeScript 1.6.3
(function() {
  window.myApp.factory('Stats', [
    '$resource', function($resource) {
      return $resource('https://api.mongolab.com/api/1/databases/heroku_app12577889/collections/Stat?apiKey=6Utcl_PXWwHq64dribp2m8XA2pOAlLnG');
    }
  ]);

  window.myApp.factory('StatsShared', [
    '$resource', 'Stats', function($resource, Stats) {
      var statsShared;
      statsShared = {};
      statsShared.ranking_tab = [];
      statsShared.allStatsByCity = {};
      statsShared.getStats = function(callback, refresh) {
        if (refresh == null) {
          refresh = false;
        }
        if (statsShared.ranking_tab.length === 0 || refresh) {
          return statsShared.allStats = Stats.query(function() {
            var city, k, stat, _ref, _ref1;
            _ref = statsShared.allStats;
            for (k in _ref) {
              stat = _ref[k];
              if (statsShared.allStatsByCity[stat.city]) {
                statsShared.allStatsByCity[stat.city]['swallow'] += stat.swallow;
              } else {
                statsShared.allStatsByCity[stat.city] = {
                  location: {
                    lat: stat.lat,
                    long: stat.long
                  },
                  city: stat.city,
                  swallow: stat.swallow
                };
              }
            }
            _ref1 = statsShared.allStatsByCity;
            for (city in _ref1) {
              stat = _ref1[city];
              statsShared.ranking_tab.push(stat);
            }
            statsShared.ranking_tab.sort(function(a, b) {
              if (a.swallow > b.swallow) {
                return 1;
              }
              if (a.swallow < b.swallow) {
                return -1;
              }
              return 0;
            });
            return callback();
          });
        } else {
          return callback();
        }
      };
      return statsShared;
    }
  ]);

}).call(this);
