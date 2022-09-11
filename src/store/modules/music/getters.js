//curMusic:
// 正在播放音乐的URL
export const musicURL = state => state.musicInfo['musicURL']

// 音乐图片
export const musicPic = state => state.musicInfo['musicPic']

// 是否是我喜欢的音乐
export const isLiked = state => state.musicInfo['isLiked']

// 音乐的artist数组
export const artistsList = state => state.musicInfo['artistsList']

// 当前歌曲播放的实时秒数
export const currentSecond = state => state.currentSecond;
//行数
export const currentRow = state => state.currentRow;

//音乐名
export const musicName = state => state.musicInfo['musicName']
export const musicAlia = state => state.musicInfo['musicAlia']
export const musicTransName = state => state.musicInfo['musicTransName']

//正在播放音乐的信息
export const nowMusicDetail = state => state.musicInfo

//播放模式
export const playType = state => state.playType

//是否正在播放
export const isPlaying = state => state.isPlaying

//是否显示音乐详情
export const isShowMusicDetail  = state=> state.isShowMusicDetail

//正在播放的歌单
export const playList = state => state.playList


