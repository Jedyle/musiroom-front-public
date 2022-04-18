import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toHumanDate } from 'utils/date';
import { getExportUrl } from 'pages/urls';
import { listExports } from 'services/Exports';
import HeadLine from 'components/Utils/HeadLine';
import Title from 'components/Utils/Title';

export default class ExportsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }

    componentDidMount(){
        listExports().then((response) => {
            this.setState({
                results: response.data
            });
        });
    }
    
    render() {
        let { results } = this.state;
        return (
            <div className="columns is-mobile is-multiline ml-0 mr-0">
              <Title title="My exports"/>
              <div className="column is-12">
                <HeadLine
                  heroClasses="has-background-white-ter"
                  title="Mes Exports"
                />
              </div>
              <div className="column is-12-mobile is-8-tablet is-offset-2-tablet is-6-desktop is-offset-3-desktop">
                <div className="list">
                  {results.map((exportItem) => (
                      <div className="list-item has-text-centered">
                        <Link to={getExportUrl(exportItem.id)}>
                          Export du {toHumanDate(exportItem.created_at)}
                        </Link>
                      </div>
                  ))}
                </div>
              </div>
            </div>
        );
    }
}
