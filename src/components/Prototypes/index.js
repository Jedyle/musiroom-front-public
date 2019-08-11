import React from 'react';
import Gallery from '../Gallery';
import Logo from '../Logo';
import ActivityFeedItem from '../ActivityFeed/Item';
import ActivityFeedList from '../ActivityFeed/List';
import AlbumPopover from '../AlbumPopover';

class Prototypes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: "Gallery"
        };        
    }

    components = {
        Gallery: {
            component: Gallery,
            props: {
                images: [
                    "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg",
                    "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg",
                    "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg",
                    "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg",
                    "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg",
                    "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg",
                    "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg",
                    "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg",
                    "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg",
                    "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg",
                    "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg",
                    "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg",
                ]
            }
        },
        Logo: {
            component: Logo,
            props: {}
        },
        ActivityFeedList: {
            component: ActivityFeedList,
            props: {
                children : [(
                    <ActivityFeedItem
                      author="Bob"
                      verb="has liked"
                      object="a video"
                      date="some days ago"
                      img="https://media.ouest-france.fr/v1/pictures/09fa38b37ab9c13d4761bd716587c9d0-cinema-les-tournages-d-avatar-2-et-3-sont-boucles_0.jpg?width=1260&height=712&focuspoint=55%2C41&cropresize=1&client_id=cmsfront&sign=141e3dee1e63abd3ae002c4cda5fa783eae535f6484b57f3028dd1413d64d047"
                    />),(
                    <ActivityFeedItem
                      author="Bob"
                      verb="has commented"
                      object="an album"
                      date="21 July 2019"
                    />
                )]
            }
        },
        AlbumPopover: {
            component: AlbumPopover,
            props : {
                img: "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg" ,
                children: (<div>Hello</div>)
            }
        }
    }

    render() {
        const tag = this.state.tag;
        const TagName = this.components[tag || 'gallery'].component;
        const props = this.components[tag || 'gallery'].props;
        return (
            <div className="columns is-multiline">
              <div className="column is-2-widescreen is-12-tablet is-12-mobile">
                <h1 className="title">Components</h1>
                <div>
                  {
                      Object.keys(this.components).map((item) => (
                          <div key={item}>
                            <a
                              href="/"
                              onClick={(e) => {
                                  console.log(item);
                                  e.preventDefault();
                                  this.setState({
                                      tag: item
                                  });}} 
                            >
                              {item}
                            </a>
                          </div> 
                      ))
                  }
                </div>
              </div>
              <div className="column is-10-widescreen is-12-tablet is-12-mobile">
                <h1 className="title is-4">{tag}</h1>
                <TagName {... props}/>
              </div>
            </div>
        );
    }
    
};


export default Prototypes;
