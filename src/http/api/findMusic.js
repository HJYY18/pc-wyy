import axiosServer from "../index";

// 首页-发现
// 说明 : 调用此接口 , 可获取 APP 首页信息
// 接口地址 : /homepage/block/page
// 可选参数 : refresh: 是否刷新数据,默认为 false
// cursor: 上一条数据返回的 cursor
export const find = (params)=>{
    return axiosServer({
        method:'get',
        url:'/homepage/block/page',
        params
    })
}


// 独家放送(入口列表)
// 说明 : 调用此接口 , 可获取独家放送
// 接口地址 : /personalized/privatecontent
// 调用例子 : /personalized/privatecontent
export const personalized = ()=>{
    return axiosServer({
        method:'get',
        url:'personalized/privatecontent'
    })
}

// 独家放送列表
// 说明 : 调用此接口 , 可获取独家放送列表
// 可选参数 :
// limit : 返回数量 , 默认为 60
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0
// 接口地址 : /personalized/privatecontent/list
// 调用例子 : /personalized/privatecontent/list?limit=1&offset=2
export const personalizedList = (offset)=>{
    return axiosServer({
        method:'get',
        url:'/personalized/privatecontent/list',
        params:{
            limit:30,
            offset
        }
    })
}

// 获取 mv 数据
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 ,
// 其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
// 必选参数 : mvid: mv 的 id
// 接口地址 : /mv/detail
// 调用例子 : /mv/detail?mvid=5436712
export const getDetailMV = (params) =>{
    return axiosServer({
        methods:'get',
        url:'/mv/detail',
        params
    })
}

// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
// 必选参数 : id: mv id
// 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
// 接口地址 : /mv/url
// 调用例子 :
// /mv/url?id=5436712 /mv/url?id=10896407&r=1080
export const getMVVideo = (params)=>{
    return axiosServer({
        methods:'get',
        url:'/mv/url',
        params
    })
}

// banner
// 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
// 可选参数 :
// type:资源类型,对应以下类型,默认为 0 即 PC
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
// 接口地址 : /banner
// 调用例子 : /banner, /banner?type=2
export const getBanner = ()=>{
    return axiosServer({
        methods:'get',
        url:'/banner',
        params:{
            type:0
        }
    })
}

// 获取每日推荐歌单
// 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
// 接口地址 : /recommend/resource
// 调用例子 : /recommend/resource
export const recommendEveryMusicList = () =>{
    return axiosServer({
        methods:'get',
        url:'/recommend/resource',
        // params:{
        //     limit:10
        // }
    })
}


// 获取每日推荐歌曲
// 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
// 接口地址 : /recommend/songs
// 调用例子 : /recommend/songs
export const recommendMusic = () =>{
    return axiosServer({
        methods:'get',
        url:'/recommend/songs',
    })
}

// 推荐歌单
// 说明 : 调用此接口 , 可获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
// 接口地址 : /personalized
// 调用例子 : /personalized?limit=1
export const recommendMusicList = (limit) =>{
    return axiosServer({
        methods:'get',
        url:'/personalized',
        params:{
            limit
        }
    })
}

// 独家放送(入口列表)
// 说明 : 调用此接口 , 可获取独家放送
// 接口地址 : /personalized/privatecontent
// 调用例子 : /personalized/privatecontent
export const privatecontent = () =>{
    return axiosServer({
        methods:'get',
        url:'/personalized/privatecontent',
    })
}


// 独家放送列表
// 说明 : 调用此接口 , 可获取独家放送列表
// 可选参数 :
// limit : 返回数量 , 默认为 60
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0
// 接口地址 : /personalized/privatecontent/list
// 调用例子 : /personalized/privatecontent/list?limit=1&offset=2
export const privatecontentList = (limit,offset) =>{
    return axiosServer({
        methods:'get',
        url:'/personalized/privatecontent/list',
        params:{
            limit,
            offset
        }
    })
}

// 推荐新音乐
// 说明 : 调用此接口 , 可获取推荐新音乐
// 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
// 接口地址 : /personalized/newsong
// 调用例子 : /personalized/newsong
export const newsong = (limit) =>{
    return axiosServer({
        methods:'get',
        url:'/personalized/newsong',
        params:{
            limit,
        }
    })
}

// 歌单分类
// 说明 : 调用此接口,可获取歌单分类,包含 category 信息
// 接口地址 : /playlist/catlist
// 调用例子 : /playlist/catlist
export const playlistCatlist = ()=>{
    return axiosServer({
        methods:'get',
        url:'/playlist/catlist',
    })
}


// 热门歌单分类
// 说明 : 调用此接口,可获取歌单分类,包含 category 信息
// 接口地址 : /playlist/hot
// 调用例子 : /playlist/hot
export const playlisthot = ()=>{
    return axiosServer({
        methods:'get',
        url:'/playlist/hot',
    })
}

// 歌单 ( 网友精选碟 )
// 说明 : 调用此接口 , 可获取网友精选碟歌单
// 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
// 接口地址 : /top/playlist
// 调用例子 : /top/playlist?limit=10&order=new
export const topPlaylist = (cat)=>{
    return axiosServer({
        methods:'get',
        url:'/top/playlist',
        params:{
            cat
        }
    })
}

// 精品歌单标签列表
// 说明 : 调用此接口 , 可获取精品歌单标签列表
// 接口地址 : /playlist/highquality/tags
// 调用例子 : /playlist/highquality/tags
export const playlisHighTag = ()=>{
    return axiosServer({
        methods:'get',
        url:'/playlist/highquality/tags',
    })
}

// 获取精品歌单
// 说明 : 调用此接口 , 可获取精品歌单
// 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
// limit: 取出歌单数量 , 默认为 50
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
// 接口地址 : /top/playlist/highquality
// 调用例子 : /top/playlist/highquality?before=1503639064232&limit=3
export const playlistHighquality = (cat)=>{
    return axiosServer({
        methods:'get',
        url:'/top/playlist/highquality',
        params:{cat}
    })
}

// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要
// 接口地址 : /toplist/detail
// 调用例子 : /toplist/detail
export const toplistDetail = ()=>{
    return axiosServer({
        methods:'get',
        url:'/toplist/detail',
    })
}


// 歌手分类列表
// 说明 : 调用此接口,可获取歌手分类列表
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,
// 如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0

// type 取值:
// -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队

// area 取值:
// -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他
// 接口地址 : /artist/list
// 调用例子 : /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b
export const artistList = (type,area,initial)=>{
    return axiosServer({
        methods:'get',
        url:'/artist/list',
        params:{
            type,
            area,
            initial,
            limit:36
        }
    })
}

// 新歌速递
// 说明 : 调用此接口 , 可获取新歌速递
// 必选参数 :
// type: 地区类型 id,对应以下:
// 全部:0
// 华语:7
// 欧美:96
// 日本:8
// 韩国:16
// 接口地址 : /top/song
// 调用例子 : /top/song?type=96
export const latestSong = (type)=>{
    return axiosServer({
        methods:'get',
        url:'/top/song',
        params:{
            type,
        }
    })
}