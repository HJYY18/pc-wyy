import axiosServer from "../index";
// 歌手热门 50 首歌曲
// 说明 : 调用此接口,可获取歌手热门 50 首歌曲
// 必选参数 :
// id : 歌手 id
// 接口地址 : /artist/top/song
// 调用例子 : /artist/top/song?id=6452
export const artistTop = (id)=>{
    return axiosServer({
        method:'get',
        url:'/artist/top/song',
        params:{
            id
        }
    })
}

// 获取歌手 mv
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 
// 如 : /artist/mv?id=6452,/mv?mvid=5461064
// 必选参数 : id: 歌手 id, 可由搜索接口获得
// 接口地址 : /artist/mv
// 调用例子 : /artist/mv?id=6452
export const artistMv = (id)=>{
    return axiosServer({
        method:'get',
        url:'/artist/mv',
        params:{
            id
        }
    })
}


// 获取歌手专辑
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
// 必选参数 : id: 歌手 id
// 可选参数 : limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
// 接口地址 : /artist/album
// 调用例子 : /artist/album?id=6452&limit=5 ( 周杰伦 )
export const artistAlbum = (id,offset)=>{
    return axiosServer({
        method:'get',
        url:'/artist/album',
        params:{
            id,
            limit:15,
            offset
        }
    })
}


// 获取歌手描述
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
// 必选参数 : id: 歌手 id
// 接口地址 : /artist/desc
// 调用例子 : /artist/desc?id=6452 ( 周杰伦 )
export const artistDesc = (id)=>{
    return axiosServer({
        method:'get',
        url:'/artist/desc',
        params:{
            id
        }
    })
}

// 获取歌手详情
// 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
// 必选参数 : id: 歌手 id
// 接口地址 : /artist/detail
// 调用例子 : /artist/detail?id=11972054 (Billie Eilish)
export const artistDetail = (id)=>{
    return axiosServer({
        method:'get',
        url:'/artist/detail',
        params:{
            id
        }
    })
}