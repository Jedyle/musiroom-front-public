import React from 'react';
import Gallery from '../Gallery';
import Logo from '../Logo';
import ActivityFeedItem from '../ActivityFeed/Item';
import ActivityFeedList from '../ActivityFeed/List';
import AlbumPopover from '../AlbumPopover';
import StarRatings from '../StarRatings';
import ProfileSidebar from '../Profile/Sidebar';
import AlbumItem from '../AlbumList/AlbumItem';

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
                      object={<a href="https://google.com">a video</a>}
                      date="some days ago"
                      img="https://media.ouest-france.fr/v1/pictures/09fa38b37ab9c13d4761bd716587c9d0-cinema-les-tournages-d-avatar-2-et-3-sont-boucles_0.jpg?width=1260&height=712&focuspoint=55%2C41&cropresize=1&client_id=cmsfront&sign=141e3dee1e63abd3ae002c4cda5fa783eae535f6484b57f3028dd1413d64d047"
                    />),(
                    <ActivityFeedItem
                      author="Bob"
                      verb="has commented"
                      object="an album"
                      date="21 July 2019"
                      img="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                )]
            }
        },
        AlbumPopover: {
            component: AlbumPopover,
            props : {
                button: (<a className="button" href="https://google.com">Hover Me</a>),
                img: "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg" ,
                children: (<div>Hello</div>)
            }
        },
        StarRatings: {
            component: StarRatings,
            props: {
                rating: 6
            }
        },
        ProfileSidebar: {
            component: ProfileSidebar,
            props: {
                img: "https://lamusitheque.com/media/avatars/user_1/maxresdefault_WhhSswd_QHKlJqP_kXlqJMP_btWhBu3_0JDcb2I_EyY7T4s_J4owVz1_mxm_pwum8OJ.jpg",
                pseudo: "Risitas",
                first_name: "Jérémy",
                gender: "Homme",
                activity_status: "Connecté",
                inscription_date: "2 Septembre 2019 (3 jours)",
                chg_profile_link: "/prototypes",
                settings_link: "/prototypes"
            }
        },
        AlbumItem: {
            component: AlbumItem,
            props: {
                img: "https://lamusitheque.com/media/avatars/user_1/maxresdefault_WhhSswd_QHKlJqP_kXlqJMP_btWhBu3_0JDcb2I_EyY7T4s_J4owVz1_mxm_pwum8OJ.jpg",
                title: "Bath",
                description: (<span>Album de <a href="https://www.google.com">Maudlin of the Well</a></span>),
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor dolor at volutpat posuere. Mauris fermentum lorem sit amet mauris malesuada, quis tempor nibh porta. Donec eget orci fermentum, dignissim orci eu, ultrices ex. Nunc ac condimentum ex. Suspendisse ullamcorper metus vel faucibus egestas. Suspendisse sit amet nisi ut sapien luctus sollicitudin. Donec euismod est est, sit amet suscipit risus euismod ut.",
                user_rating: '-',
                followees_rating: "8.1",
                avg_rating: '4.6'               
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
              <div className="column is-6-widescreen is-12-tablet is-12-mobile">
                <h1 className="title is-4">{tag}</h1>
                <TagName {... props}/>
              </div>
            </div>
        );
    }
    
};


export default Prototypes;
