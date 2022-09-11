import axiosServer from '../index'
import store from '@/store';

const cookie = store.state.user.cookie
// let id = store.state.user.userInfo.userId
// const uid = 1377919172

// 获取用户详情
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
// 必选参数 : uid : 用户 id
// 接口地址 : /user/detail
// 调用例子 : /user/detail?uid=32953014
export const getUserDetail = (id)=>{
    return axiosServer({
        method:'get',
        url:'/user/detail',
        params:{
            uid:id
        }
    })
}

// 获取账号信息
// 说明 : 登录后调用此接口 ,可获取用户账号信息
// 接口地址 : /user/account
// 调用例子 : /user/account
export const getUserAccount = ()=>{
    return axiosServer({
        method:'get',
        url:'/user/account',
        params:{
            timestamp:Date.parse(new Date()),
            cookie
        }
    })
}

// 302
// 获取用户信息 , 歌单，收藏，mv, dj 数量
// 说明 : 登录后调用此接口 , 可以获取用户信息
// 接口地址 : /user/subcount
// 调用例子 : /user/subcount
export const getUserInfo = ()=>{
    return axiosServer({
        method:'post',
        url:'/user/subcount',
    })
}

//302
// 获取用户等级信息
// 说明 : 登录后调用此接口 , 可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度,对应 https://music.163.com/#/user/level
// 接口地址 : /user/level
// 调用例子 : /user/level
export const getUserLevelInfo = ()=>{
    return axiosServer({
        method:'get',
        url:'/user/level'
    })
}


// 获取用户歌单
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
// 必选参数 : uid : 用户 id
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /user/playlist
// 调用例子 : /user/playlist?uid=32953014
export const getUserMusicList = (id,offset)=>{
    return axiosServer({
        method:'get',
        url:'/user/playlist',
        params:{
            uid:id,
            offset
        }
    })
}

// 喜欢音乐列表
// 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐 id 列表(id 数组)
// 必选参数 : uid: 用户 id
// 接口地址 : /likelist
// 调用例子 : /likelist?uid=32953014
export const getUserLikelist = (id)=>{
    return axiosServer({
        method:'get',
        url:'/likelist',
        params:{
            uid:id
        }
    })
}

// 喜欢音乐
// 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
// 必选参数 : id: 歌曲 id
// 可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
// 接口地址 : /like
// 调用例子 : /like?id=347230
// 喜欢成功则返回数据的 code 为 200, 其余为失败
export const LikeMusic = (id,like)=>{
    return axiosServer({
        method:'get',
        url:'/like',
        params:{
            id,
            like
        }
    })
}