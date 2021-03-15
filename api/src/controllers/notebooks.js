const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

/* *** TODO: Fill in the API endpoints for notebooks *** */




function postFilter(obj) {
  return _.pick(obj, ['title']);
}


//Create
router.post('/', (req, res) => {
//Create a new post record in the database
models.Notebook.create(postFilter(req.body))
  .then(notebook => res.json(notebook))
  .catch(eer => res.status(422).json({ error: err.message}));
});

//show
router.get('/:notebookId', (req, res) => {
  //return the specifies post record from the database
models.Notebook.findById(req.params.notebookId)
  .then(notebook => res.json(notebook))
  .catch(eer => res.status(500).json({ error: err.message}))
});
router.get('/:notebookId/notes', (req,res) => {
//Return the specifies post record from the database
models.Note.findAll({where: {notebookId: req.params.notebookId}})
  .then(notes => res.json(notes))
  .catch(err => res.status(500).json({ error: err.message}));
});

//Destroy
router.delete('/:notebookId', (req, res) => {
//Delete the specifies post record from the database
models.Notebook.destroy({ where: {id: req.params.notebookId}})
  .then(() => res.json({}))
  .catch(err => res.status(500).json({ error: err.message}));
});

//update
router.put('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
  .then(notebook => notebook.update(postFilter(req.body)))
  .then(notebook => res.json(notebook))
});

module.exports = router;