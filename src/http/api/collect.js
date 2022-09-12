import axiosServer from "../index";

// 获取已收藏专辑列表
// 说明 : 调用此接口 , 可获得已收藏专辑列表
// 可选参数 :
// limit: 取出数量 , 默认为 25
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
// 接口地址 : /album/sublist
// 调用例子 : /album/sublist ( 周杰伦 )
export const albumSub = (offset)=>{
    return axiosServer({
        method:'get',
        url:'/album/sublist',
        params:{
            limit:20,
            offset
        }
    })
}


// 收藏的歌手列表
// 说明 : 调用此接口,可获取收藏的歌手列表
// 接口地址 : /artist/sublist
// 调用例子 : /artist/sublist
export const artistSub = (offset)=>{
    return axiosServer({
        method:'get',
        url:'/artist/sublist',
        params:{
            limit:20,
            offset
        }
    })
}

// 收藏的 MV 列表
// 说明 : 调用此接口,可获取收藏的 MV 列表
// 接口地址 : /mv/sublist
// 调用例子 : /mv/sublist
export const mvSub = (offset)=>{
    return axiosServer({
        method:'get',
        url:'/mv/sublist',
        params:{
            limit:20,
            offset
        }
    })
}