/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

const React = require('react');

const NotebookList = require('./NotebookList');
const Statistics = require('./Statistics');

/*
  *** TODO: Start building the frontend from here ***
  You should remove the placeholder text and modify the component as you see
  fit while working on the assignment.
*/
const Home = () => (
  <div className="container-fluid home-container">
    <div className="container">
      <div className="header">
        <div>
          <h1 className="title mg0">NEVERWROTE</h1>
          <p>
            <blockquote>Never say "I never wrote that down" ever again!</blockquote>
            </p>


        </div>

      </div>
      <Statistics />
      <NotebookList />
    </div>
  </div>
);

module.exports = Home;
