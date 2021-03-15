const _ = require('lodash');
const models = require('../models');
const express = require('express');
const router = express.Router();
// Display only the fields that are allowed to be set by users
function postFilter(obj) {
  return _.pick(obj, ['title', 'content']);
}


router.get('/', (req, res, next) => {
  let notebookcount = 0;
  let notescount = 0;
  models.Notebook.count()
    .then(data => {
      notebookcount = data;
      models.Note.count()
        .then(notedata => {
          notescount = notedata;
          let queryOptions = {
            order: [
              ['updatedAt', 'DESC']
            ],
            limit: 1
          };
          models.Note.findAll(queryOptions)
            .then(notes => {
              // console.log(notes);
              let queryOptions = {
                order: [
                  ['createdAt', 'ASC']
                ],
                limit: 1
              };
              models.Notebook.findAll(queryOptions)
                .then(notebooks => {
                  console.log(notebooks);
                  res.json({
                    notebookCount: notebookcount,
                    noteCount: notescount,
                    oldestNotebook: notebooks[0].title,
                    recentlyUpdatedNote: notes[0].title

                  })
                })
            })
        })

    })
    .catch(err => res.status(500).json({ error: err.message }))

})

module.exports = router;