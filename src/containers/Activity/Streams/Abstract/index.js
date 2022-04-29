import React from 'react';

import ActivityItem from 'components/Activity/Item';
import ActionObject from 'containers/Activity/Utils/ActionObject';
import ActionTarget from 'containers/Activity/Utils/ActionTarget';
import ActivityStatement from 'components/Activity/Statement';
import Avatar from 'components/Profile/Avatar';
import { UserLink } from 'containers/Links';


function StreamList({results}){
    return (
        <div>
          {results.map((result) => (
              <ActivityItem
                activityMedia={
                    <Avatar
                      avatar={result.actor.avatar}
                      size="is-32x32"
                      alt={`User ${result.actor.name}`}
                    />}
                activityStatement={
                    <ActivityStatement
                      actorComponent={
                          <UserLink username={result.actor.name}/>
                      }
                      verb={result.verb}
                      actionObjectComponent={
                          <ActionObject
                            contentType={result.action_object_content_type}
                            object={result.action_object}
                          />
                      }
                      targetComponent={
                          <ActionTarget
                            contentType={result.target_content_type}
                            object={result.target}
                          />
                      }
                    />
                }
                timestamp={result.timestamp}
              />
          ))}
        </div>
    );
}


export default StreamList;
