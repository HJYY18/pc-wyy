import axiosServer from "../index";

// 热门评论
// 说明 : 调用此接口 , 传入 type, 资源 id 可获得对应资源热门评论 ( 不需要登录 )
// 必选参数 :
// id : 资源 id
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲   1: mv   2: 歌单   3: 专辑   4: 电台节目   5: 视频   6: 动态   7: 电台
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/hot
// 调用例子 : /comment/hot?id=186016&type=0
export const hotComment = (id, type) => {
    return axiosServer({
        method: 'get',
        url: '/comment/hot',
        params: {
            id,
            type
        }
    })
}

// 新版评论接口
// 说明 : 调用此接口 , 传入资源类型和资源 id,以及排序方式,可获取对应资源的评论
// 必选参数 :
// id : 资源 id, 如歌曲 id,mv id
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲   1: mv   2: 歌单   3: 专辑   4: 电台节目   5: 视频   6: 动态   7: 电台
// 可选参数 :
// pageNo:分页参数,第 N 页,默认为 1
// pageSize:分页参数,每页多少条数据,默认 20
// sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
// cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
// 接口地址 : /comment/new
// 调用例子 : /comment/new?type=0&id=1407551413&sortType=3, 
//            /comment/new?type=0&id=1407551413&sortType=3&cursor=1602072870260&pageSize=20&pageNo=2
export const newComment = (id, type) => {
    return axiosServer({
        method: 'get',
        url: '/comment/new',
        params: {
            id,
            type
        }
    })
}

// 发送/删除评论
// 说明 : 调用此接口,可发送评论或者删除评论
// 接口地址 : /comment
// 发送评论
// 必选参数
// t:1 发送, 2 回复
// type: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
// 0: 歌曲   1: mv   2: 歌单   3: 专辑   4: 电台   5: 视频   6: 动态
// id:对应资源 id   content :要发送的内容   commentId :回复的评论 id (回复评论时必填)
// 调用例子 : /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
// 注意：如给动态发送评论，则不需要传 id，需要传动态的 threadId,如：/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
export const replyComment = (t, type, id, content,commentId) => {
    return axiosServer({
        methodL: 'get',
        url: '/comment',
        params: {
            t, 
            type, 
            id, 
            content,
            commentId
        }
    })
}

// 给评论点赞
// 说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
// 必选参数 : id : 资源 id, 如歌曲 id,mv id
// cid : 评论 id
// t : 是否点赞 , 1 为点赞 ,0 为取消点赞
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲   1: mv   2: 歌单   3: 专辑   4: 电台节目   5: 视频   6: 动态   7: 电台
// 接口地址 : /comment/like
// 调用例子 : /comment/like?id=29178366&cid=12840183&t=1&type=0 对应给 https://music.163.com/#/song?id=29178366 最热门的评论点赞
// 注意： 动态点赞不需要传入 id 参数，需要传入动态的 threadId 参数,如：
// /comment/like?type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0， threadId 可通过 /event，/user/event 接口获取
export const likeComment = (id,cid,t,type) =>{
    return axiosServer({
        method:'get',
        url:'/comment/like',
        params:{
            id,
            cid,
            t,
            type
        }
    })
}

// 歌曲评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/music
// 调用例子 : /comment/music?id=186016&limit=1 对应晴天评论
export const musicComment = (id,offset) => {
    return axiosServer({
        method: 'get',
        url: '/comment/music',
        params: {
            id,offset
        }
    })
}


// mv 评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
// 必选参数 : id: mv id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/mv
// 调用例子 : /comment/mv?id=5436712
export const mvComment = (id,offset) => {
    return axiosServer({
        method: 'get',
        url: '/comment/mv',
        params: {
            id,offset
        }
    })
}

// 视频评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 ( 不需要登录 )
// 必选参数 : id: 视频的 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/video
// 调用例子 : /comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D
export const videoComment = (id,offset) => {
    return axiosServer({
        method: 'get',
        url: '/comment/video',
        params: {
            id,offset
        }
    })
}

// 歌单评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
// 必选参数 : id: 歌单 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/playlist
// 调用例子 : /comment/playlist?id=705123491
export const musicListComment = (id,offset) => {
    return axiosServer({
        method: 'get',
        url: '/comment/playlist',
        params: {
            id,offset
        }
    })
}

// 专辑评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
// 必选参数 : id: 专辑 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/album
// 调用例子 : /comment/album?id=32311
export const albumComment = (id,offset) => {
    return axiosServer({
        method: 'get',
        url: '/comment/album',
        params: {
            id,offset
        }
    })
}

// 资源点赞( MV,电台,视频)
// 说明 : 调用此接口 , 可对 MV,电台,视频点赞
// 必选参数 :
// type:资源类型,对应以下类型
// 0: 歌曲  1: mv  2: 歌单  3: 专辑  4: 电台节目  5: 视频  6: 动态  7: 电台
// t: 操作,1 为点赞,其他为取消点赞
// id: 资源 id
// 接口地址 : /resource/like
// 调用例子 : /resource/like?t=1&type=1&id=5436712
// 注意：如给动态点赞，不需要传入 id，需要传入 threadId,可通过 event,/user/event 接口获取，
// 如： /resource/like?t=1&type=6&threadId=A_EV_2_6559519868_32953014
export const likeResource = (t,type,id) =>{
    return axiosServer({
        method:'get',
        url:'/resource/like',
        params:{
            t,type,id
        }
    })
}