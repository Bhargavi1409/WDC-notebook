const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

/* *** TODO: Fill in the API endpoints for notes *** */







function postFilter(obj) {
  return _.pick(obj, ['title','content','notebookId']);
}
//index


router.get('/', (req, res) => {
  models.Note.findAll({ order: [['createdAt', 'DESC']] })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

//Create a new note record in the database

router.post('/',(req,res) => {
  models.Note.create(postFilter(req.body))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({error:err.message}));
});

///test
// router.post('/', (req, res) => {
// // Create a new post record in the database
// models.Note.create(postFilter(req.body))
//   .then(note => res.json(note))
//   .catch(err => res.status(422).json({ error: err.message }));
// });


// Show
router.get('/:noteId', (req, res) => {
// Return the specified post record from the database
models.Note.findById(req.params.noteId)
  .then(note => res.json(note))
  .catch(err => res.status(500).json({ error: err.message }));
});

//destroy

router.delete('/:noteId', (req,res) => {
  models.Note.destroy({ where: { id:req.params.noteId }})
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error:err.message }));
});
//test

// router.delete('/:noteId', (req, res) => {
// // Delete the specified post record from the database
//   models.Note.destroy({ where: { id: req.params.noteId } })
//     .then(() => res.json({}))
//     .catch(err => res.status(500).json({ error: err.message }));
// });

//update
router.put('/:noteId',(req, res) => {
  models.Note.findById(req.params.noteId)
  .then(note => note.update(postFilter(req.body)))
  .then(note => res.json(note))

});
module.exports = router;
