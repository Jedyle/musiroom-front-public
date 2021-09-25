import React from 'react';
import Gallery from 'components/Gallery';
import Logo from 'components/Logo';
import AlbumPopover from 'components/Album/Popover';
import StarRatings from 'components/StarRatings';
import ProfileSidebar from 'components/Profile/Sidebar';
import AlbumItem from 'components/AlbumList/AlbumItem';
import BadgeList from 'components/Profile/Badges';
import ShortAlbumList from 'components/AlbumList/ShortAlbumList';
import DiscussionsList from 'components/Profile/Discussions/DiscussionsList';
import {Link} from 'react-router-dom';
import ContactGallery from 'components/Profile/Contacts/ContactGallery';
import ProfileTabs from 'components/Profile/Tabs';
import DiscussionListItem from 'components/Discussions/List/ListItem';
import AlbumSidebar from 'components/Album/Sidebar';
import TrackList from 'components/Album/TrackList';
import AlbumYoutubeLink from 'components/Album/YoutubeLink';
import ArtistSidebar from 'components/Artist/Sidebar';
import GenreTree from 'components/Genre/Tree';
import AlbumSearch from 'components/Search/Album';
import LikeDislikePanel from 'components/Utils/LikeDislikePanel';

class Prototypes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: "AlbumPopover"
        };        
    }

    components = {
        AlbumPopover: {
            component: AlbumPopover,
            props : {
                mbid: "1e8e4ce8-f334-3ec7-af9a-d7babbdb2fd2",
                children: (<button>Test</button>)
            }
        },
        Gallery: {
            component: Gallery,
            props: {
                albums: [
                    {
                        name: "Test",
                        mbid: "84cfc318-dca0-4a8e-bedb-fb74f87e4f1a",
                        cover: "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg"
                    },
                    {
                        name: "Lol",
                        mbid: "fb2350f9-019b-4c98-bc18-cffa301ca911",
                        cover: "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg"
                    },
                    {
                        name: "Test",
                        mbid: "84cfc318-dca0-4a8e-bedb-fb74f87e4f1a",
                        cover: "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg"
                    },
                    {
                        name: "Lol",
                        mbid: "fb2350f9-019b-4c98-bc18-cffa301ca911",
                        cover: "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg"
                    },
                    {
                        name: "Test",
                        mbid: "84cfc318-dca0-4a8e-bedb-fb74f87e4f1a",
                        cover: "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg"
                    },
                    {
                        name: "Lol",
                        mbid: "fb2350f9-019b-4c98-bc18-cffa301ca911",
                        cover: "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg"
                    },
                    {
                        name: "Test",
                        mbid: "84cfc318-dca0-4a8e-bedb-fb74f87e4f1a",
                        cover: "https://coverartarchive.org//release/84cfc318-dca0-4a8e-bedb-fb74f87e4f1a/22564992520-250.jpg"
                    },
                    {
                        name: "Lol",
                        mbid: "fb2350f9-019b-4c98-bc18-cffa301ca911",
                        cover: "https://coverartarchive.org//release/fb2350f9-019b-4c98-bc18-cffa301ca911/23661549212-250.jpg"
                    }                    
                ]
            }
        },
        Logo: {
            component: Logo,
            props: {}
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
                user_rating: null,
                followees_rating: 8.1,
                avg_rating: 4.6               
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
        ShortAlbumList: {
            component: ShortAlbumList,
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
        ArtistSidebar: {
            component: ArtistSidebar,
            props: {
                mbid: "15b1cbac-060a-4136-9e07-4622c52c0f60",
                photo: "https://lastfm.freetls.fastly.net/i/u/300x300/8e7833ceae624ae48ca49e110c9064fc.png",
                name: "Léo Ferré",
                genres: [{name: "Variété Française", slug: "variete-francaise"}, {name: "Rock", slug: "rock"}]
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
        },
        AlbumYoutubeLink: {
            component: AlbumYoutubeLink,
            props: {
                link: "https://youtube.com/watch?v=NRmIZ6IP9Jw"
            },
            screenSize: 'is-3-widescreen'
        },
        GenreTree: {
            component: GenreTree,
            props: {
                genres: [
                    {
                        "name": "Chanson Française",
                        "description": "",
                        "slug": "francais",
                        "parent": null,
                        "children": []
                    },
                    {
                        "name": "Metal",
                        "description": "",
                        "slug": "metal",
                        "parent": null,
                        "children": [
                            {
                                "name": "Death Metal",
                                "description": "",
                                "slug": "death-metal",
                                "parent": "metal",
                                "children": [
                                    {
                                        "name": "Melodical Death Metal",
                                        "description": "",
                                        "slug": "melodic-death-metal",
                                        "parent": "death-metal",
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "Rock",
                        "description": "rock and roll",
                        "slug": "rock",
                        "parent": null,
                        "children": []
                    },
                    {
                        "name": "Techno",
                        "description": "",
                        "slug": "techno",
                        "parent": null,
                        "children": []
                    }
                ]
            }
        },
        AlbumSearch: {
            component: AlbumSearch,
            props: {
                albums :  [
                    {
                        "title": "Blackfinger",
                        "album_mbid": "1dff4dea-180e-40bb-84f9-ab6c672dde4a",
                        "artist": "Blackfinger",
                        "artist_mbid": "fdd528e9-0b7c-4923-aa2d-0ef87e53adcf",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfield II",
                        "album_mbid": "33c0495e-e289-3492-9e98-b298e56e5573",
                        "artist": "Blackfield",
                        "artist_mbid": "8e67406d-de61-4e6b-a2a1-5a3725484527",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfield IV",
                        "album_mbid": "c5337cfd-22a0-4ead-aed0-949290f9ae8a",
                        "artist": "Blackfield",
                        "artist_mbid": "8e67406d-de61-4e6b-a2a1-5a3725484527",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfield",
                        "album_mbid": "1d47a5c2-e06e-33db-8835-332827499f1c",
                        "artist": "Blackfield",
                        "artist_mbid": "8e67406d-de61-4e6b-a2a1-5a3725484527",
                        "type": "Album"
                    },
                    {
                        "title": "greyblackfalconhawk",
                        "album_mbid": "a0803c2d-232f-49a4-9fff-1cbc86ac8d6d",
                        "artist": "Ice Dragon",
                        "artist_mbid": "993e8c86-aa0f-4591-9edc-29302d5cf1b3",
                        "type": "Album"
                    },
                    {
                        "title": "#BlackFriday",
                        "album_mbid": "875b82ac-784c-4d10-87d8-8226c068410b",
                        "artist": "Metasota",
                        "artist_mbid": "6a2189d6-8ac7-4778-bcbb-c9ead8fa7ad7",
                        "type": "Album"
                    },
                    {
                        "title": "BLACKFLOWER",
                        "album_mbid": "e6e80760-10dd-4154-9f95-f0542cd3fde6",
                        "artist": "SONANCE",
                        "artist_mbid": "95b2cb55-7063-4f36-9fcc-b0def283be4d",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfellas",
                        "album_mbid": "e66e5e00-b41b-3d7d-a6fa-842248a53d81",
                        "artist": "Local Knowledge",
                        "artist_mbid": "6f6c76a7-a8d4-400b-a295-4ee5f260bd6d",
                        "type": "Single"
                    },
                    {
                        "title": "Blackfish",
                        "album_mbid": "7a3b101e-99ea-3e98-a6e1-972a60e05667",
                        "artist": "Blackfish",
                        "artist_mbid": "b4bef68d-a696-4edb-8152-66ae4b9adbfc",
                        "type": "Album"
                    },
                    {
                        "title": "Blackface",
                        "album_mbid": "37a685e9-681e-35e5-bb13-a435942678bb",
                        "artist": "Shai",
                        "artist_mbid": "00b41159-d8c8-4c5d-9ce4-804e67050825",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfly",
                        "album_mbid": "c870c60e-0726-378f-a5b5-ed1e28e52ca7",
                        "artist": "Boxsaga",
                        "artist_mbid": "bdacd120-10fe-45ed-ae01-71b00cfbd1b2",
                        "type": "Single"
                    },
                    {
                        "title": "Blackflakes",
                        "album_mbid": "467ff717-5895-4144-8ce2-04c6425faec0",
                        "artist": "f.lor",
                        "artist_mbid": "4873f332-7dcd-4486-abcc-4ba79e6ef299",
                        "type": "Album"
                    },
                    {
                        "title": "Blackflowers",
                        "album_mbid": "61206e53-0382-465d-844d-ae1ee9e95781",
                        "artist": "Rammsier",
                        "artist_mbid": "83ee21e0-fa31-402a-b6a0-e98fca1fbdb7",
                        "type": "EP"
                    },
                    {
                        "title": "BLACKFOX",
                        "album_mbid": "a83f1ae5-ab8c-4072-ba1d-fda0dda1b59f",
                        "artist": "fripSide",
                        "artist_mbid": "de1d37ff-942a-4c85-a375-ff4f5bf2eaa9",
                        "type": "Single"
                    },
                    {
                        "title": "Blackfield V",
                        "album_mbid": "ed2bd6d2-f17e-4d52-91ce-6e253ae0977f",
                        "artist": "Blackfield",
                        "artist_mbid": "8e67406d-de61-4e6b-a2a1-5a3725484527",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfire",
                        "album_mbid": "8dd7f069-41fe-468e-bafd-8b9399020f7f",
                        "artist": "Dominique Bérose",
                        "artist_mbid": "6c9985ff-ddf9-4d54-bfae-f97ac859f6d8",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfilm",
                        "album_mbid": "92d3cbcf-6213-36f6-9d8a-ccf529a6817f",
                        "artist": "Blackfilm",
                        "artist_mbid": "328747da-eb27-4049-970c-6a1b23ca56b5",
                        "type": "Album"
                    },
                    {
                        "title": "Blackface Minstrel",
                        "album_mbid": "96bbbcb5-5677-495d-ae55-93c1e18619fe",
                        "artist": "DWNSTRS",
                        "artist_mbid": "8360f425-823b-4025-a616-289ae5e788b7",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfoot Gypsies",
                        "album_mbid": "8135c175-20a8-4aea-87a5-4ffac69243e0",
                        "artist": "Blackfoot Gypsies",
                        "artist_mbid": "0f4d808e-e2b5-42b3-b9f2-b04b3816a515",
                        "type": "EP"
                    },
                    {
                        "title": "The Blackfan",
                        "album_mbid": "4d79edbe-0737-48d4-a1e8-c26d1601cf51",
                        "artist": "Nazgulum",
                        "artist_mbid": "9e01308e-0033-40ef-a620-8a74307c0b4e",
                        "type": "EP + Live"
                    },
                    {
                        "title": "Blackflower / Evergreen",
                        "album_mbid": "8885d3e1-bf95-4132-b38e-d37863b2b9b3",
                        "artist": "Dreamscape",
                        "artist_mbid": "2253bdb9-03fc-499c-999d-ac126f9d2c5e",
                        "type": "Single"
                    },
                    {
                        "title": "Blackfire Land",
                        "album_mbid": "d06e700a-4680-3612-bc22-b940bed70260",
                        "artist": "Asguard",
                        "artist_mbid": "898ab22b-9751-4024-9350-e7bf09cf7ccf",
                        "type": "Album"
                    },
                    {
                        "title": "Reminiscences of Blackface",
                        "album_mbid": "1c91c438-d8ce-3e14-b476-7026e174a462",
                        "artist": "Arthur Francis Collins & Samuel H. Dudley & Ancient City Quartette and Orchestra",
                        "artist_mbid": "856ba0a6-e2e3-4449-a60c-0e639e7329b3",
                        "type": "Single"
                    },
                    {
                        "title": "The Blackfeet",
                        "album_mbid": "135672fc-72a6-4a2d-9cbb-7767a66fb2f2",
                        "artist": "The Blackfeet",
                        "artist_mbid": "6bf98072-5217-4746-b7bc-705b8189ebfd",
                        "type": "Album"
                    },
                    {
                        "title": "Blackfoot Live",
                        "album_mbid": "f0b980ae-95e4-3727-bded-58bdd46e1369",
                        "artist": "Blackfoot",
                        "artist_mbid": "4b24527f-0cfc-4ac0-8d63-ab8d8cfa64e3",
                        "type": "Album + Live"
                    }
                ]
            }
        },
        LikeDislikePanel: {
            component: LikeDislikePanel,
            props: {
                numVoteUp: 50,
                numVoteDown: 13,
                loggedUserVote: "down"                
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
