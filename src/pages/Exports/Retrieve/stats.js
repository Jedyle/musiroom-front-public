import React from 'react';

const ExportStats = ({stats}) => (
    <div className="has-background-light pr-2 pl-2 pb-2">
      <h3 className="title is-4 mb-1 pt-1">Stats</h3>
      <div className="list">
        <div className="list-item">
          Origin : {stats.site}
        </div>
        <div className="list-item">
          Exported : {Object.keys(stats.data_to_export).filter(key => stats.data_to_export[key]).join(', ')}
        </div>
        <div className="list-item">
          New ratings : <strong className="has-text-success">{stats.new_ratings}</strong>
        </div>
        <div className="list-item">
          Conflicts : <strong>{stats.conflicts}</strong>
        </div>
        <div className="list-item">
          Albums not found : <strong className="has-text-danger">{stats.not_found}</strong>
        </div>
      </div>
    </div>
);

export default ExportStats;
