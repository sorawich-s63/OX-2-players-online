const db = require("../models");
const xo = db.xo;

exports.findOne = (req, res) => {
  const id = 1;

  xo.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + 1
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
      where: { id: 1}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "XO was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update xo with id=${1}. Maybe xo was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating xo with id=" + 1
        });
      });
  };