import {LikeMusic} from '@/http/api/user'
export default{
    setTemp(state,data){
        // let temp = encodeURIComponent(cookie)
        state.temp = data
    },
    setCookie(state,cookie){
        let temp = encodeURIComponent(cookie)
        state.cookie = temp
    },
    setUserInfo(state,data){
        state.userInfo = data
    },
    loginStatusTrue(state){
        state.isLogin = true
    },
    changeLoginStatus(state,data){
        state.isLogin = data
    },
    setUserMusicList(state,data){
        state.userMusicList = data
    },
    setlikedsongIds(state,data){
        state.likedsongIds = data
    },
    likeMusic(state,data){
        // console.log(id,status)
        // state.commit('likeMusic',id,status)
        if(data.status){
            console.log('true')
            state.likedsongIds.splice((state.likedsongIds).indexOf(data.id),1)
            LikeMusic(data.id,!data.status)
        }else{
            state.likedsongIds.push(data.id)
            LikeMusic(data.id,!data.status)
        }
    },
}