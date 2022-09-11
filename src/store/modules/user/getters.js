export const userId = state => state.userInfo.userId

//用户的歌单
export const userMusicList = state => state.userMusicList

//歌单分类
export const musicList = state =>{
    let res = {
        'resCreat':[],
        'resfollow':[]
    }
    for(let key in state.userMusicList){
        if(state.userMusicList[key].subscribed === false){
            res['resCreat'].push(state.userMusicList[key])
        }else{
            res['resfollow'].push(state.userMusicList[key])
        }
    }
    return res
}

//用户头像url
export const avatarUrl = state => state.userInfo.avatarUrl

export const isLogin = state => state.isLogin

export const userName = state => state.userInfo.nickname