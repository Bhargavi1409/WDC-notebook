const React = require('react');
const ReactRedux = require('react-redux');

const createActionDispatchers = require('../helpers/createActionDispatchers');
const statsActionCreators = require('../reducers/stats');
/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class Statistics extends React.Component {

    componentDidMount() {
        this.props.getStats();
    }

    render() {

        return (
            <div className="container">

                <div className="row">

                    <div className="col-sm-3">
                        <div>
                            <h3>Statistics&nbsp;&nbsp;<button  className="btn btn-primary" className="fa fa-refresh" onClick={() => this.props.getStats()} button/>
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="row">

                            <div className="col-sm-3">
                                <div className="card">
                                    <h3 className="card-header">Note Count</h3>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {this.props.statistics && this.props.statistics.stats ? this.props.statistics.stats.noteCount : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card">
                                    <h3 className="card-header">Notebook Count</h3>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {this.props.statistics && this.props.statistics.stats ? this.props.statistics.stats.notebookCount : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card">
                                    <h3 className="card-header">Oldest Notebook</h3>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {this.props.statistics && this.props.statistics.stats ? this.props.statistics.stats.oldestNotebook : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card">
                                    <h3 className="card-header">Recently Updated Note</h3>
                                    <div className="card-body">
                                        <p className="card-text">
                                            {this.props.statistics && this.props.statistics.stats ? this.props.statistics.stats.recentlyUpdatedNote : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const StatisticsContainer = ReactRedux.connect(
    state => ({
        statistics: state.statistics,
    }),
    createActionDispatchers(statsActionCreators)
)(Statistics);

module.exports = StatisticsContainer;
