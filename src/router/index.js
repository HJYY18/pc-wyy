import VueRouter from 'vue-router';
import store from '../store';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/findMusci'
        },
        {
            path: '/findMusci',
            name: 'faxian',
            redirect: '/findMusci/recommendation',
            component: () => import('../views/discoverMusci/discoverMusci'),
            children: [
                {
                    path: 'recommendation',
                    component: () => import('../views/discoverMusci/Drecommendation/Drecommendation'),
                },
                {
                    path: 'playList',
                    component: () => import('../views/discoverMusci/DplayList/DplayList')
                },
                {
                    path: 'rank',
                    component: () => import('../views/discoverMusci/Drank/Drank')
                },
                {
                    path: 'artists',
                    component: () => import('../views/discoverMusci/Dartists')
                },
                {
                    path: 'latestMusic',
                    redirect:'latestMusic/Song',
                    component: () => import('../views/discoverMusci/DlatestMusic/index'),
                    children:[
                        {
                            path: 'Song',
                            component: () => import('../views/discoverMusci/DlatestMusic/latestSong')
                        },
                        {
                            path: 'Album',
                            component: () => import('../views/discoverMusci/DlatestMusic/latestAlbum')
                        },
                    ]
                },

            ]

        },
        {
            path: '/dailysongs',
            component:() => import('../views/discoverMusci/Drecommendation/recmmendList/dailySongs')
        },
        {
            path: '/personalList',
            component:() => import('../views/discoverMusci/Drecommendation/personal/personalList')
        },
        {
            path: "/video",
            name: 'shipin',
            redirect:'/video/video',
            component: () => import('../views/video/index'),
            children:[
                {
                    path: "mv",
                    component: () => import('../views/video/mv/mv'),
                },
                {
                    path: "video",
                    component: () => import('../views/video/video/video'),
                },
            ]
        },
        {
            path: "/mvAll",
            name: 'mvAll',
            component: () => import('../views/video/mv/mvAll'),
        },
        {
            path: "/mvDetail",
            name: 'mvDetail',
            component: () => import('../views/video/mv/mvDetail'),
        },
        {
            path: "/videoDetail",
            name: 'videoDetail',
            component: () => import('../views/video/video/videoDetail'),
        },
        {
            path: "/friends",
            name: 'pengyou',
            component: () => import('../views/friends/friends')
        },
        {
            path: "/localMusic",
            name: 'bendiyinyue',
            component: () => import('../views/localMusic/localMusic')
        },
        {
            path: "/download",
            name: 'xiazai',
            component: () => import('../views/download/download')
        },
        {
            path: "/test",
            name: 'ceshi',
            component: () => import('../components/test/test')
        },
        {
            path: "/playList",
            name: 'gedan',
            component: () => import('../components/common/playList/playList')
        },
        {
            path: "/albums",
            name: 'zhuanji',
            component: () => import('../components/common/albums/albums')
        },
        {
            path: "/artist",
            name: 'geshou',
            redirect:'/artist/album',
            component: () => import('@/components/common/artist/artist'),
            children:[
                {
                    path: "album",
                    component: () => import('../components/common/artist/router/album')
                },
                {
                    path: "mv",
                    component: () => import('../components/common/artist/router/mv')
                },
                {
                    path: "detail",
                    component: () => import('../components/common/artist/router/detail')
                },
            ]
        },
        {
            path: "/user",
            name: 'yonghu',
            component: () => import('@/components/common/user/user')
        },
        // {
        //     path: "collect",
        //     component: () => import('../components/common/artist/router/detail')
        // },
        {
            path: "/search",
            name: 'sousuo',
            component: () => import('@/views/search/index'),
            children: [
                {
                    path: 'songs',
                    name: 'Sdanqu',
                    component: () => import('@/views/search/Ssongs')
                },
                {
                    path: 'albums',
                    name: 'Szhuanji',
                    component: () => import('@/views/search/Salbums')
                },
                {
                    path: 'artists',
                    name: 'Sgeshou',
                    component: () => import('@/views/search/Sartists')
                },
                {
                    path: 'mvs',
                    name: 'Smv',
                    component: () => import('@/views/search/Smvs')
                },
                {
                    path: 'playlists',
                    name: 'Sgedan',
                    component: () => import('@/views/search/Splaylists')
                },
                {
                    path: 'userprofiles',
                    name: 'Syonghu',
                    component: () => import('@/views/search/Suserprofiles')
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {

    // if (to.meta.needLogin && !$store.state.isLogin) {
    //     next({
    //         path: '/login'
    //     })
    // } else {
    //     next()
    // }
    if (to.name === 'shipin') {
        console.log(store.state.user.isLogin)
        next()
    } else {
        next()
    }
})


export default router