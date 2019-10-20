import React, { Component } from 'react';
import Popover from 'react-tiny-popover';

const PopoverContent = (title, description) => (
    <article className="message is-small" style={{"max-width": "300px", "border": "1px solid"}}>
      <div className="message-header">
        <p>{title}</p>
      </div>
      <div className="message-body">
        {description}
      </div>
    </article>
);

class BadgeList extends Component {

    constructor(props){
        super(props);
        this.state = {
            openPopoverNumber: -1
        };
    }

    render() {
        return (
            <div>
              <h1 className="title is-size-5 has-text-centered">Badges ({this.props.badges.length})</h1>
              <div className="columns is-mobile is-multiline">
                {this.props.badges.map((element, index) => (
                    <div className="column is-one-third">
                      <Popover
                        position={"left"}
                        isOpen={(this.state.openPopoverNumber === index)}
                        onClickOutside={() => this.setState({openPopoverNumber: -1})}
                        content={PopoverContent(element.name, element.description)}
                      >
                        <figure className="image is-square has-cursor-pointer"
                                onClick={() => this.setState(
                                    {openPopoverNumber: index}
                                )}>
                          <img
                            src={element.image}
                            alt={element.title}
                            title={element.title}/>
                        </figure>
                      </Popover>
                    </div>
                ))
                }
              </div>
            </div>
        );
    };
}

export default BadgeList;
