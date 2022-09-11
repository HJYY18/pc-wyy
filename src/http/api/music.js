import axiosServer from '../index'
// import store from '@/store';

// const curID = store.state.music.curentMusic.id

// 获取音乐 url
// 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,
// 未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
// 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，
// 将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
// 必选参数 : id : 音乐 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
// 接口地址 : /song/url
// 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
export const getMusic = (id)=>{
    return axiosServer({
        methodL:"get",
        url:'/song/url',
        params:{
            id
        }
    })
}

// 获取歌曲详情
// 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
// 必选参数 : ids: 音乐 id, 如 ids=347230
// 接口地址 : /song/detail
// 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
export const getMusicDetail = (ids)=>{
    return axiosServer({
        methodL:"get",
        url:'/song/detail',
        params:{
            ids
        }
    })
}
// 返回字段说明(感谢 @tuxzz 整理):
// name: String, 歌曲标题
// id: u64, 歌曲ID
// pst: 0，功能未知
// t: enum,
//   0: 一般类型
//   1: 通过云盘上传的音乐，网易云不存在公开对应
//     如果没有权限将不可用，除了歌曲长度以外大部分信息都为null。
//     可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
//     如果添加到“我喜欢的音乐”，则仅自己可见，除了长度以外各种信息均为未知，且无法播放。
//     如果添加到一般播放列表，虽然返回code 200，但是并没有效果。
//     网页端打开会看到404画面。
//     属于这种歌曲的例子: https://music.163.com/song/1345937107
//   2: 通过云盘上传的音乐，网易云存在公开对应
//     如果没有权限则只能看到信息，但无法直接获取到文件。
//     可以通过 `/api/v1/playlist/manipulate/tracks` 接口添加到播放列表。
//     如果添加到“我喜欢的音乐”，则仅自己可见，且无法播放。
//     如果添加到一般播放列表，则自己会看到显示“云盘文件”，且云盘会多出其对应的网易云公开歌曲。其他人看到的是其对应的网易云公开歌曲。
//     网页端打开会看到404画面。
//     属于这种歌曲的例子: https://music.163.com/song/435005015
// ar: Vec<Artist>, 歌手列表
// alia: Vec<String>,
//   别名列表，第一个别名会被显示作副标题
//   例子: https://music.163.com/song/536623501
// pop: 小数，常取[0.0, 100.0]中离散的几个数值, 表示歌曲热度
// st: 0: 功能未知
// rt: Option<String>, None、空白字串、或者类似`600902000007902089`的字符串，功能未知
// fee: enum,
//   0: 免费或无版权
//   1: VIP 歌曲
//   4: 购买专辑
//   8: 非会员可免费播放低音质，会员可播放高音质及下载
//   fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
// v: u64, 常为[1, ?]任意数字, 功能未知
// crbt: Option<String>, None或字符串表示的十六进制，功能未知
// cf: Option<String>, 空白字串或者None，功能未知
// al: Album, 专辑，如果是DJ节目(dj_type != 0)或者无专辑信息(single == 1)，则专辑id为0
// dt: u64, 歌曲时长
// h: Option<Quality>, 高质量文件信息
// m: Option<Quality>, 中质量文件信息
// l: Option<Quality>, 低质量文件信息
// a: Option<?>, 常为None, 功能未知
// cd: Option<String>, None或如"04", "1/2", "3", "null"的字符串，表示歌曲属于专辑中第几张CD，对应音频文件的Tag
// no: u32, 表示歌曲属于CD中第几曲，0表示没有这个字段，对应音频文件的Tag
// rtUrl: Option<String(?)>, 常为None, 功能未知
// rtUrls: Vec<String(?)>, 常为空列表, 功能未知
// dj_id: u64,
//   0: 不是DJ节目
//   其他：是DJ节目，表示DJ ID
// copyright: u32, 0, 1, 2: 功能未知
// s_id: u64, 对于t == 2的歌曲，表示匹配到的公开版本歌曲ID
// mark: u64, 功能未知
// originCoverType: enum
//   0: 未知
//   1: 原曲
//   2: 翻唱
// originSongSimpleData: Option<SongSimpleData>, 对于翻唱曲，可选提供原曲简单格式的信息
// single: enum,
//   0: 有专辑信息或者是DJ节目
//   1: 未知专辑
// noCopyrightRcmd: Option<NoCopyrightRcmd>, None表示可以播，非空表示无版权
// mv: u64, 非零表示有MV ID
// rtype: 常为0，功能未知
// rurl: Option<String(?)>, 常为None，功能未知
// mst: u32, 偶尔为0, 常为9，功能未知
// cp: u64, 功能未知
// publish_time: i64, 毫秒为单位的Unix时间戳
// pc: 云盘歌曲信息，如果不存在该字段，则为非云盘歌曲


// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 接口地址 : /lyric
// 调用例子 : /lyric?id=33894312
export const getMusicLyric = (id)=>{
    return axiosServer({
        methodL:"get",
        url:'/lyric',
        params:{
            id
        }
    })
}