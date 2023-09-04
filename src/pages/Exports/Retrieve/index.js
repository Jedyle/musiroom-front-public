import React, { Component } from 'react';

import { getExport, getExportNew, getExportConflicts, getExportNotFound } from 'services/Exports';

import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';
import { toHumanDate } from 'utils/date';

import ExportStats from './stats';
import { NewRatings, Conflicts, NotFound } from './reports';


export default class ExportRetrieve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exportItem: null,
            newRatings: [],
            conflicts: [],
            notFound: []
        };
    }
    componentDidMount(){
        let { id } = this.props;
        getExport(id).then((response) => {
            this.setState({
                exportItem: response.data
            });
            this.getReportDetails();
        });
    }

    getReportDetails(){
        let { id } = this.props;
        getExportNew(id).then((response) => {
            this.setState({
                newRatings: response.data.new_ratings
            });
        });
        getExportConflicts(id).then((response) => {
            this.setState({
                conflicts: response.data.conflicts
            });
        });
        getExportNotFound(id).then((response) => {
            this.setState({
                notFound: response.data.not_found
            });
        });
    }

    render() {
        let { exportItem, newRatings, conflicts, notFound } = this.state;
        return (exportItem &&
                <div className="columns is-mobile is-multiline ml-0 mr-0">
                  <Title title={`Export du ${toHumanDate(exportItem.created_at)}`}/>
                  <div className="column">
                    <HeadLine
                      title={`Export du ${toHumanDate(exportItem.created_at)}`}
                      titleClasses="is-size-1"
                    />
                    <br/>
                    <br/>
                    <div className="columns is-mobile is-multiline">
                      <div className="column is-12-mobile is-3-tablet is-2-desktop">
                        <ExportStats
                          stats={exportItem.stats}
                        />
                      </div>
                      <div className="column is-12-mobile is-9-tablet is-10-desktop">
                        <div className="columns is-mobile is-multiline">
                          <div className="column is-12-mobile is-one-third-desktop has-background-success-light">
                            <NewRatings results={newRatings} stats={exportItem.stats}/>
                          </div>
                          <div className="column is-12-mobile is-one-third-desktop has-background-warning-light">
                            <Conflicts results={conflicts} stats={exportItem.stats}/>
                          </div>
                          <div className="column is-12-mobile is-one-third-desktop has-background-danger-light">
                            <NotFound results={notFound} stats={exportItem.stats}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               );
    }
}
