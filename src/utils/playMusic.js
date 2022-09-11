import { getMusicDetail} from "@/http/api/music";
import store from '@/store/index.js'

export const playMusic = (ids) =>{
    console.log('ids:' + ids)
    getMusicDetail(ids).then(res=>{
        console.log(res)
        let musicInfo = {}

        //url写入临时对象musicInfo
        musicInfo["musicURL"] = res.data.songs[0].al.id

         //音乐图片url
        musicInfo["musicPic"] = res.data.songs[0].al.picUrl;

        //   //音乐artists数组
        musicInfo["artistsList"] = res.data.songs[0].ar;

        //   //对音乐名进行处理
        let alia = res.data.songs[0].alia[0] ? res.data.songs[0].alia[0] : "";
        let transName = res.data.songs[0].al.tns[0] ? res.data.songs[0].al.tns[0] : "";
        musicInfo["musicName"] = res.data.songs[0].al.name + alia + transName;

        console.log(musicInfo)
        console.log(store)
        // store.dispatch('setMusicInfo',musicInfo)
        // store.dispatch('feature/setMusicInfo', payload);
        // return musicInfo
    })
}

    // async playMusic(item) {
    //   let musicInfo = {};
    //   //获取音乐url
    //   let res = await getMusic(item.id);

    //   //url写入临时对象musicInfo
    //   musicInfo["musicURL"] = res.data.data[0].url;

    //   //音乐图片url
    //   musicInfo["musicPic"] = item.al.picUrl;

    //   //音乐artists数组
    //   musicInfo["artistsList"] = item.ar;

    //   //对音乐名进行处理
    //   let alia = item.alia[0] ? item.alia[0] : "";
    //   let transName = item.transName ? item.transName : "";
    //   musicInfo["musicName"] = item.name + alia + transName;
    //   // console.log(musicInfo);
    //   // console.log(item);

    //   //提交给vuex
    //   this.setMusicInfo(musicInfo);
    //   },