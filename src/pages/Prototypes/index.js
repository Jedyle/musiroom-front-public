import React from 'react';
import Gallery from 'components/Gallery';
import Logo from 'components/Logo';
import ActivityFeedItem from 'components/ActivityFeed/Item';
import ActivityFeedList from 'components/ActivityFeed/List';
import AlbumPopover from 'components/AlbumPopover';
import StarRatings from 'components/StarRatings';
import ProfileSidebar from 'components/Profile/Sidebar';
import AlbumItem from 'components/AlbumList/AlbumItem';
import BadgeList from 'components/Profile/Badges';
import FavoriteAlbums from 'components/Profile/FavoriteAlbums';
import DiscussionsList from 'components/Profile/Discussions/DiscussionsList';
import {Link} from 'react-router-dom';
import ContactGallery from 'components/Profile/Contacts/ContactGallery';
import ProfileTabs from 'components/Profile/Tabs';
import DiscussionListItem from 'components/Discussions/List/ListItem';
import AlbumSidebar from 'components/AlbumDetails/Sidebar';
import TrackList from 'components/AlbumDetails/TrackList';

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
                avatar: "https://lamusitheque.com/media/avatars/user_1/maxresdefault_WhhSswd_QHKlJqP_kXlqJMP_btWhBu3_0JDcb2I_EyY7T4s_J4owVz1_mxm_pwum8OJ.jpg",
                user: "Risitas",
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
        },
        BadgeList: {
            component: BadgeList,
            props: {
                badges: [
                    {
                        image: "https://lamusitheque.com/static/images/badges/Pionnier.png",
                        name: "Pionnier",
                        description: "Ce membre a dégainé sa plume électronique pour écrire sa première critique. C'est un début prometteur."
                    },
                    {
                        image: "https://lamusitheque.com/static/images/badges/ContributeurGold.png",
                        name: "Pionnier",
                        description: "Ce membre a dégainé sa plume électronique pour écrire sa première critique. C'est un début prometteur."
                    },
                    {
                        image: "https://lamusitheque.com/static/images/badges/Pionnier.png",
                        name: "Pionnier",
                        description: "Ce membre a dégainé sa plume électronique pour écrire sa première critique. C'est un début prometteur. !"
                    },
                    {
                        image: "https://lamusitheque.com/static/images/badges/Pionnier.png",
                        name: "Pionnier",
                        description: "Loule"
                    }
                ]
            }
        },
        FavoriteAlbums: {
            component: FavoriteAlbums,
            props: {
                albums: [
                    {
                        cover: "https://lamusitheque.com/media/avatars/user_1/maxresdefault_WhhSswd_QHKlJqP_kXlqJMP_btWhBu3_0JDcb2I_EyY7T4s_J4owVz1_mxm_4CRiAhb.jpg",
                        content: (<a href="https://google.com">Maudlin of The Well, Bath</a>),
                        title: "Maudlin of the Well, Bath"
                    },
                    {
                        cover: "https://ia800802.us.archive.org/13/items/mbid-1834eae1-741b-3c03-9ca5-0df3decb43ea/mbid-1834eae1-741b-3c03-9ca5-0df3decb43ea-18174904878_thumb250.jpg",
                        content: "OK Computer de Radiohead",
                        title: "OK Computer"
                    },
                    {
                        cover: "https://ia800802.us.archive.org/13/items/mbid-1834eae1-741b-3c03-9ca5-0df3decb43ea/mbid-1834eae1-741b-3c03-9ca5-0df3decb43ea-18174904878_thumb250.jpg",
                        content: "OK Computer de Radiohead",
                        title: "OK Computer"
                    },
                    {
                        cover: "https://ia800802.us.archive.org/13/items/mbid-1834eae1-741b-3c03-9ca5-0df3decb43ea/mbid-1834eae1-741b-3c03-9ca5-0df3decb43ea-18174904878_thumb250.jpg",
                        content: "OK Computer de Radiohead",
                        title: "OK Computer"
                    }
                ]
            },
            screenSize: 'is-3-widescreen'
        },
        DiscussionList: {
            component: DiscussionsList,
            props: {
                discussions : [
                    (
                        <span>
                          <Link to="/prototypes">
                            Ca roule ? 
                          </Link> (discussion générale)
                        </span>
                    ),
                    (
                        <span>
                          <Link to="/prototypes">
                            Le meilleur ? 
                          </Link> (sur Radiohead)
                        </span>
                    ),
                    (
                        <span>
                          <Link to="/prototypes">
                            Ca gaz ? 
                          </Link> (discussion générale)
                        </span>
                    ),
                    (
                        <span>
                          <Link to="/prototypes">
                            MDR
                          </Link> (sur Maudlin)
                        </span>
                    )
                ]
            }
        },
        ProfileTabs: {
            component: ProfileTabs,
            props: {
                tabs : [
                      (<a>
                        <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                        <span>Videos</span>
                       </a>),
                      (<a>
                         <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                        <span>Videos</span>
                       </a>),
                      (<a>
                        <span className="icon is-small"><i className="fas fa-film" aria-hidden="true"></i></span>
                        <span>Videos</span>
                       </a>)
                ],
                active_index: 1
            }
        },
        ContactGallery: {
            component: ContactGallery,
            props: {
                contacts : [
                    {
                        avatar: "https://lamusitheque.com/media/avatars/user_26/received_10209264488968374_9d6PifV_SPjy5dV_5FVZPaz_lycLFUt_NXeOGuz_twewU_5hCw7UP.jpg",
                        username: "Armadeon",
                        profile_url: "/"
                    },
                    {
                        avatar: "https://lamusitheque.com/media/avatars/user_93/5fc739de38839337943c7d00438eaa80_csH4oFK_7keOVHs_DRLeIe8_8UqroIW_tRXH9z9_qaND2FD.jpg",
                        username: "Brock3",
                        profile_url: "/",
                        following_status: "follows_you"
                    },
                    {
                        avatar: "https://lamusitheque.com/media/avatars/user_26/received_10209264488968374_9d6PifV_SPjy5dV_5FVZPaz_lycLFUt_NXeOGuz_twewU_5hCw7UP.jpg",
                        username: "Armadeon3",
                        profile_url: "/",
                        following_status: "is_yourself"
                    },
                    {
                        avatar: "https://lamusitheque.com/media/avatars/user_93/5fc739de38839337943c7d00438eaa80_csH4oFK_7keOVHs_DRLeIe8_8UqroIW_tRXH9z9_qaND2FD.jpg",
                        username: "Brock2",
                        profile_url : "/"
                    },
                    {
                        avatar: "https://lamusitheque.com/media/avatars/user_26/received_10209264488968374_9d6PifV_SPjy5dV_5FVZPaz_lycLFUt_NXeOGuz_twewU_5hCw7UP.jpg",
                        username: "Armadeon2",
                        profile_url : "/"
                    },
                    {
                        avatar: "https://lamusitheque.com/media/avatars/user_93/5fc739de38839337943c7d00438eaa80_csH4oFK_7keOVHs_DRLeIe8_8UqroIW_tRXH9z9_qaND2FD.jpg",
                        username: "Brock",
                        profile_url: "/"
                    }
                ]
            }
        },
        DiscussionItem: {
            component: DiscussionListItem,
            props : {
                numVotes: 2,
                loggedUserVote: 'up',
                avatar: "https://lamusitheque.com/media/avatars/user_93/5fc739de38839337943c7d00438eaa80_csH4oFK_7keOVHs_DRLeIe8_8UqroIW_tRXH9z9_qaND2FD.jpg",
                timeSincePost: "il y a 2 jours",
                discussionType: 'Discussion générale',
                discussionTypeLink: "/",
                discussionLink: "/",
                title: "A propos des nouveautés sur le site",
                numComments: 10
            }
        },
        AlbumSidebar: {
            component: AlbumSidebar,
            props: {
                "tracks": {
                    "track_list": [
                        {
                            "medium_title": "",
                            "tracks": [
                                {
                                    "title": "In Mist She Was Standing",
                                    "duration": "14:10"
                                },
                                {
                                    "title": "Under the Weeping Moon",
                                    "duration": "9:53"
                                },
                                {
                                    "title": "Silhouette",
                                    "duration": "3:08"
                                },
                                {
                                    "title": "Forest of October",
                                    "duration": "13:05"
                                },
                                {
                                    "title": "The Twilight Is My Robe",
                                    "duration": "11:02"
                                }
                            ]
                        }
                    ]
                },
                "artists": [
                    {
                        "mbid": "c14b4180-dc87-481e-b17a-64e4150f90f6",
                        "name": "Opeth",
                        "photo": "https://lastfm-img2.akamaized.net/i/u/300x300/0535aee2661d40ca97185152b9024999.png"
                    }
                ],
                "cover": "https://coverartarchive.org/release/5666e777-3dd7-4d0f-aa74-33f40ba6d0a8/2324310061-250.jpg",
                "rating": {
                    "id": 1,
                    "count": 3,
                    "total": 15,
                    "average": "5.000"
                },
                "genres": [],
                "mbid": "1e8e4ce8-f334-3ec7-af9a-d7babbdb2fd2",
                "title": "Orchid",
                "release_date": "1995-05-15",
                "album_type": "LP"
            },
            screenSize: "is-3-widescreen"
        },
        TrackList: {
            component: TrackList,
            props : {
                tracks: [
                    {
                        "medium_title": "",
                        "tracks": [
                            {
                                "title": "14h58 - Casseurs Flowters Opening",
                                "duration": "1:44"
                            },
                            {
                                "title": "15h02 - Regarde comme il fait beau (dehors)",
                                "duration": "3:24"
                            },
                            {
                                "title": "15h45 - Stupide ¡ Stupide ¡ Stupide ¡",
                                "duration": "4:16"
                            },
                            {
                                "title": "16h00 - Tu m'dois d'l'oseille",
                                "duration": "2:18"
                            },
                            {
                                "title": "16h22 - Deux connards dans un abribus",
                                "duration": "4:34"
                            },
                            {
                                "title": "17h04 - Prends des pièces",
                                "duration": "3:44"
                            },
                            {
                                "title": "18h30 - Bloqué",
                                "duration": "3:49"
                            },
                            {
                                "title": "19h26 - La Mort du disque",
                                "duration": "2:43"
                            },
                            {
                                "title": "20h08 - Dans la place pour être",
                                "duration": "3:25"
                            },
                            {
                                "title": "20h13 - La Nouvelle Paire",
                                "duration": "5:29"
                            },
                            {
                                "title": "22h31 - Fais les backs",
                                "duration": "3:04"
                            },
                            {
                                "title": "01h16 - Les putes et moi",
                                "duration": "6:19"
                            },
                            {
                                "title": "01h25 - Johnny Galoche",
                                "duration": "1:56"
                            },
                            {
                                "title": "01h47 - Change de pote",
                                "duration": "3:10"
                            },
                            {
                                "title": "03h53 - Manger c'est tricher",
                                "duration": "4:24"
                            },
                            {
                                "title": "04h41 - Greenje et Orselane",
                                "duration": "3:33"
                            },
                            {
                                "title": "06h16 - Des histoires à raconter",
                                "duration": "6:16"
                            }
                        ]
                    }
                ]
            }
        }
    }


    render() {
        const tag = this.state.tag;
        const TagName = this.components[tag || 'gallery'].component;
        const props = this.components[tag || 'gallery'].props;
        const screenSize = this.components[tag || 'gallery'].screenSize || 'is-6-widescreen';
        const classNames = `column is-12-tablet is-12-mobile ${screenSize}`;
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
              <div className={classNames}>
                <h1 className="title is-4">{tag}</h1>
                <TagName {... props}/>
              </div>
            </div>
        );
    }
    
};


export default Prototypes;
