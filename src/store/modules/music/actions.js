import { getMusicDetail, getMusic } from "@/http/api/music";


export default {
    ChangePlayType(context) {
        context.commit('ChangePlayType')
    },
    // getMusicURL(context,data){
    //     context.commit('getMusicURL',data)
    // },
    setMusicURL(context, data) {
        context.commit('setMusicURL', data)
    },
    // 保存当前歌曲播放的实时秒数
    setCurrentSeconds(context, data) {
        context.commit("setCurrentSeconds", data);
    },
    setCurrentRow(context, data) {
        context.commit("setCurrentRow", data);
    },
    //提交播放列表信息
    setPlayList(context, songList) {
        context.commit('setPlayList', songList)
    },
    //
    changeIsShowMusicDetail(context) {
        context.commit('changeIsShowMusicDetail')
    },
    //提交正在播放的音乐信息
    async setMusicInfo(context, ids) {
        //临时对象musicInfo
        let musicInfo = {}

        //获取音乐详情
        let res = await getMusicDetail(ids)
        console.log(res)

        //获取音乐url
        let urlTemp = await getMusic(ids)
        //url写入临时对象musicInfo
        musicInfo["musicURL"] = urlTemp.data.data[0].url
        musicInfo["musicId"] = urlTemp.data.data[0].id
        musicInfo["alId"] = res.data.songs[0].al.id
        musicInfo["alName"] = res.data.songs[0].al.name

        //音乐图片url
        musicInfo["musicPic"] = res.data.songs[0].al.picUrl;

        //音乐artists数组
        musicInfo["artistsList"] = res.data.songs[0].ar;

        //对音乐名进行处理
        let alia = res.data.songs[0].alia[0] ? res.data.songs[0].alia[0] : "";
        let transName = res.data.songs[0].al.tns[0] ? res.data.songs[0].al.tns[0] : "";
        musicInfo["musicName"] = res.data.songs[0].name
        musicInfo["musicAlia"] = alia
        musicInfo["musicTransName"] = transName

        context.commit('setMusicInfo', musicInfo)
        context.commit('play')
    },
    play(context) {
        context.commit('play')
    },
    pause(context) {
        context.commit('pause')
    }
}
