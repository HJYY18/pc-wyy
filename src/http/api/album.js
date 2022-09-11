import axiosServer from "../index";
// 获取专辑内容
// 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
// 必选参数 : id: 专辑 id
// 接口地址 : /album
// 调用例子 : /album?id=32311
export const albumInfo = (id)=>{
    return axiosServer({
        method:'get',
        url:'/album',
        params:{id}
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
export const albumComment = (id)=>{
    return axiosServer({
        method:'get',
        url:'/comment/album',
        params:{
            id
        }
    })
}

// 收藏/取消收藏专辑
// 说明 : 调用此接口,可收藏/取消收藏专辑
// 必选参数 :
// id : 专辑 id
// t : 1 为收藏,其他为取消收藏
// 接口地址 : /album/sub
// 调用例子 : /album/sub?t=1 /album/sub?t=0
export const albumSub = (id,t)=>{
    return axiosServer({
        method:'get',
        url:'/album/sub',
        params:{
            id,t
        }
    })
}