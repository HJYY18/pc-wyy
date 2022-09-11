import {logOut} from '@/http/api/login'

export default {
    // setTemp(context,data){
    //     context.commit('setTemp',data)
    // },
    //cookie
    setCookie(context,cookie){
        context.commit('setCookie',cookie)
    },
    //用户信息
    setUserInfo(context,data){
        context.commit('setUserInfo',data)
    },
    //登录状态
    loginStatusTrue(context){
        context.commit('loginStatusTrue')
    },
    //改变登陆状态
    changeLoginStatus(context,data){
        context.commit('changeLoginStatus',data)
    },
    //用户歌单
    setUserMusicList(context,data){
        context.commit('setUserMusicList',data)
    },
    //喜欢的音乐
    setlikedsongIds(context,data){
        context.commit('setlikedsongIds',data)
    },
    likeMusic(context,data){
        context.commit('likeMusic',data)
    },
    //退出登录，清空信息
    userLogout(context){
        logOut().then(res=>{
            context.commit('changeLoginStatus',false)
            context.commit('setCookie',null)
            context.commit('setUserMusicList',null)
            context.commit('setUserInfo',null)
            res
        })
    }
    
}