import axiosServer from "../index";
// 获取视频标签列表
// 说明 : 调用此接口 , 可获取视频标签列表
// 接口地址 : /video/group/list
// 调用例子 : /video/group/list
export const videoGroupList = () => {
    return axiosServer({
        method: 'get',
        url: '/video/group/list',
    })
}


// 获取视频分类列表
// 说明 : 调用此接口 , 可获取视频分类列表
// 接口地址 : /video/category/list
// 调用例子 : /video/category/list
export const videoCategoryList = () => {
    return axiosServer({
        method: 'get',
        url: '/video/category/list',
    })
}



// 获取视频标签/分类下的视频
// 说明 : 调用此接口 , 传入标签/分类id,可获取到相关的视频,分页参数只能传入 offset
// 必选参数 : id: videoGroup 的 id
// 可选参数 : offset: 默认 0
// 接口地址 : /video/group
// 调用例子 : /video/group?id=9104
export const getVideo = (id, offset) => {
    return axiosServer({
        method: 'get',
        url: '/video/group',
        params: {
            id,
            offset
        }
    })
}


// 获取全部视频列表
// 说明 : 调用此接口,可获取视频分类列表,分页参数只能传入 offset
// 可选参数 : offset: 默认 0
// 接口地址 : /video/timeline/all
// 调用例子 : /video/timeline/all
export const getAllVideo = () => {
    return axiosServer({
        method: 'get',
        url: '/video/timeline/all'
    })
}

// 全部 mv
// 说明 : 调用此接口 , 可获取全部 mv
// 可选参数 :
// area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
// type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
// order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
// limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /mv/all
// 调用例子 : /mv/all?area=港台
export const mvAll = (area, type, order, limit, offset) => {
    return axiosServer({
        method: 'get',
        url: '/mv/all',
        params: {
            area, type, order, limit, offset
        }
    })
}


// 最新 mv
// 说明 : 调用此接口 , 可获取最新 mv
// 可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
// 可选参数 : limit: 取出数量 , 默认为 30
// 接口地址 : /mv/first
// 调用例子 : /mv/first?limit=10
export const mvLatest = (area) => {
    return axiosServer({
        method: 'get',
        url: '/mv/first',
        params: {
            area,
            limit: 8
        }
    })
}


// 网易出品 mv
// 说明 : 调用此接口 , 可获取网易出品 mv
// 可选参数 : limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
// 接口地址 : /mv/exclusive/rcmd
// 调用例子 : /mv/exclusive/rcmd?limit=10
export const mvWangYi = () => {
    return axiosServer({
        method: 'get',
        url: '/mv/first',
        params: {
            limit: 8
        }
    })
}


// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
// 必选参数 : id: mv id
// 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
// 接口地址 : /mv/url
// 调用例子 :
// /mv/url?id=5436712 /mv/url?id=10896407&r=1080
export const mvURL = (id) => {
    return axiosServer({
        method: 'get',
        url: '/mv/url',
        params: {
            id
        }
    })
}


// 获取 mv 数据
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 
// 可获取对应 MV 数据 , 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 ,
//  其中 mv 视频 网易做了防盗链处理 , 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
// 必选参数 : mvid: mv 的 id
// 接口地址 : /mv/detail
// 调用例子 : /mv/detail?mvid=5436712
export const mvDetail = (mvid) => {
    return axiosServer({
        method: 'get',
        url: '/mv/detail',
        params: {
            mvid
        }
    })
}

// 获取 mv 点赞转发评论数数据
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
// 必选参数 : mvid: mv 的 id
// 接口地址 : /mv/detail/info
// 调用例子 : /mv/detail/info?mvid=5436712
export const mvDetailInfo = (mvid) => {
    return axiosServer({
        method: 'get',
        url: '/mv/detail/info',
        params: {
            mvid
        }
    })
}


// 获取视频播放地址
// 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
// 必选参数 : id: 视频 的 id
// 接口地址 : /video/url
// 调用例子 : /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D
export const videoURL = (id) => {
    return axiosServer({
        method: 'get',
        url: '/video/url',
        params: {
            id
        }
    })
}

// 视频详情
// 说明 : 调用此接口 , 可获取视频详情
// 必选参数 : id: 视频 的 id
// 接口地址 : /video/detail
// 调用例子 : /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D
export const videoDetail = (id) => {
    return axiosServer({
        method: 'get',
        url: '/video/detail',
        params: {
            id
        }
    })
}


// 获取视频点赞转发评论数数据
// 说明 : 调用此接口 , 传入 vid ( 视频 id ) , 可获取对应视频点赞转发评论数数据 必选参数 : vid: 视频 id
// 接口地址 : /video/detail/info
// 调用例子 : /video/detail/info?vid=89ADDE33C0AAE8EC14B99F6750DB954D
export const videoDetailInfo = (vid) => {
    return axiosServer({
        method: 'get',
        url: '/video/detail/info',
        params: {
            vid
        }
    })
}

