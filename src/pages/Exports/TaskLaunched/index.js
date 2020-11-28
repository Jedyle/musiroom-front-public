import React from 'react';
import HeadLine from 'components/Utils/HeadLine';

const ExportTaskLaunched = (props) => (
    <HeadLine
      title={"Vos notes sont en cours de récupération !"}
      titleClasses="is-size-1"
      subtitle={"Cette tâche peut être assez longue (plusieures heures). Vous recevrez une notification lorsqu'elle sera terminée. Si vous ne recevez rien dans les 24h, signalez le aux administrateurs."}
    />
);

export default ExportTaskLaunched;
