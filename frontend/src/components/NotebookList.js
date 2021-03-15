const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');
const MarkdownEditor = require('./MarkdownEditor');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {

  constructor() {
    super();
    this.state = {
      add: false,
      title: '',
      addingNote: '',
      noteTitle: '',
      noteContent: '',
      viewContent: [],
      viewClicked: false,
      viewNotesId: '',
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    this.props.loadAllNoteBooks();
  }

  onchange(a) {
    this.setState({ title: a.target.value });
  }

  onChangeNote(a) {
    this.setState({ noteContent: a.target.value });
  }

  onchangeNoteTitle(a) {
    this.setState({ noteTitle: a.target.value });
  }

  toggleDisplay(id) {
    let content = this.state.viewContent;
    const index = content.indexOf(id);
    if (index >= 0) {
      content.splice(index, 1);
      this.setState({ viewContent: content });
    }
    else {
      content.push(id);
      this.setState({ viewContent: content });
    }
  }

  componentDidUpdate(prevProps) {
    //to reload notes if the notebook where view notes clicked is deleted
    if (this.props.notebooks.notebooks !== prevProps.notebooks.notebooks)
      this.props.getNotesById(this.state.viewNotesId);
  }

  render() {

    const createNotebookListItem = (notebook) => {
      return (
        <li key={notebook.id}>
          <div>
            {notebook.title}
            <button className="btn btn-primary"
              onClick={() => this.setState({ addingNote: notebook.id, viewClicked: false })}>+</button>
            <button className="btn btn-primary"
             onClick={() => { this.setState({ viewClicked: true, addingNote: '', viewNotesId: notebook.id }); this.props.getNotesById(notebook.id) }}>View Notes</button>
            <button className="btn btn-primary"
            onClick={() => this.props.deleteNotebookById(notebook.id)}>X</button>
          </div>
        </li>
      )
    }

    return (

      <div className="container-fluid">
        <h2>Notebooks</h2>
        <button className="btn btn-primary" onClick={() => this.setState({ add: true })}>+ New NoteBook</button>
        {this.state.add &&
          <div>
            <input type="text" onChange={this.onchange.bind(this)} />
            <button onClick={() => { this.props.CreateNotebook({ title: this.state.title }); this.setState({ add: false }) }}>
              Save</button>
          </div>}
        <ul>
          {this.props.notebooks.notebooks.map(createNotebookListItem)}
        </ul>

        {this.state.addingNote && !this.state.viewClicked &&
          <div>
            <input type="text" onChange={this.onchangeNoteTitle.bind(this)} placeholder="Note Title" />
            <MarkdownEditor type="text" onChange={this.onChangeNote.bind(this)} />
            {this.state.noteTitle && this.state.noteContent &&
              <button className="btn btn-primary" onClick={() => {
                this.props.getNotesById(this.state.addingNote);
                this.props.CreateNote({ notebookId: this.state.addingNote, title: this.state.noteTitle, content: this.state.noteContent });
                this.setState({ addingNote: false })
              }}>Save</button>
            }
          </div>
        }

        {this.props.notes.notes && this.props.notes.notes.map((item, i) => (
          <div key={i}>
            <a onClick={() => this.toggleDisplay(item.id)}>{item.title}</a>
            <button className="btn btn-primary" onClick={() => this.props.deleteNoteById(item.id)}>X</button>
            {(this.state.viewContent.indexOf(item.id)) >= 0 ? <h5>{item.content}</h5> : ''}
          </div>
        ))}
      </div>
    );
  }
}


const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks,
    notes: state.notes,
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
