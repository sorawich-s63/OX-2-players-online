const db = require("../models");
const xo = db.xo;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a todo
    const xo = {
      history: [],
      stepnumber: 0,
      xisnext: 1
    };
  
    // Save todo in the database
    xo.create(xo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Todo."
        });
      });
  };

exports.findAll = (req, res) => {
    xo.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving xo."
        });
      });
  };

exports.deleteAll = (req, res) => {
    xo.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} XO were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all xo."
        });
      });
  };

exports.update = (req, res) => {
  
    xo.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "XO was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update xo with id=${id}. Maybe xo was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating xo with id=" + id
        });
      });
  };