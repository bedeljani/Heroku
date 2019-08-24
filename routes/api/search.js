const Dorm = require('../../models/Dorm')

exports.searchDorm = function(req, res) {
    const searchQuery={};
          query = {$regex: req.params.query, $options: 'i'};
    switch(req.params.searchby){
      case "city" : searchQuery.city = query;break;
      case "room" : searchQuery.room = query;break;
      case "type" : searchQuery.type = query;break;
      case "price" : searchQuery.price = query;break;
    }
    console.log(searchQuery);
    Dorm.find(searchQuery, function(err, ads) {
      if (err)
        res.send(err);
      res.json(ads);
    });
  };
  