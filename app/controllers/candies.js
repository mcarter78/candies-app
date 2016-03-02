var Candy = require('../models/Candy');

// GET
function getAll(req, res) {
  Candy.find({}, function(err, candies){
    if(err) res.json({message: 'ERROR'});
    res.render('../views/layout', {candies: candies});
  });
}

// POST
function createCandy(req, res) {
  var name = req.body.name;
  var color = req.body.color;
  Candy.create({name: name, color: color}, function(err){
    if (err) res.json({message: 'ERROR:' + err});
    res.redirect('/candies');
  });
}

// GET
function getCandy(request, response) {
  var id = request.params.id;

  Candy.findById({_id: id}, function(error, candy) {
    if(error) response.json({message: 'Could not find candy b/c:' + error});

    response.render('./partials/candy/edit', {candy: candy});
  });
}

function updateCandy(request, response) {
  var id = request.params.id;

  Candy.findById({_id: id}, function(error, candy) {
    if(error) console.log(error);

    if(request.body.name) candy.name = request.body.name;
    if(request.body.color) candy.color = request.body.color;

    candy.save(function(error) {
      if(error) response.json({messsage: 'Could not update candy b/c:' + error});

      response.redirect('/candies');
    });
  });
}

function removeCandy(request, response) {
  var id = request.params.id;

  Candy.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete candy b/c:' + error});

    response.json({message: 'Candy successfully deleted'});
  });
}

module.exports = {
  getAll: getAll,
  createCandy: createCandy,
  getCandy: getCandy,
  updateCandy: updateCandy,
  removeCandy: removeCandy
};
