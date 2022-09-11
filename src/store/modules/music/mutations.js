export default{
    ChangePlayType(state){
        if(state.playType === 4){
            state.playType = 1
        }else{
            state.playType += 1
        }
    },
    // setMusicURL(state,data){
    //     state.musicURL = data
    // },

    setCurrentSeconds(state,data){
        state.currentSecond = data;
		// localStorage.setItem("currentSecond", JSON.stringify(state.currentSecond));
    },

    setCurrentRow(state,data){
        state.currentRow = data;
    },
    setPlayList(state,data){
        state.playList = data
    },

    changeIsShowMusicDetail(state){
        state.isShowMusicDetail = !state.isShowMusicDetail
    },

    setMusicInfo(state,data){
        state.musicInfo = Object.assign(state.musicInfo,data)
    },
    //
    // setCurrentTime(state,data){
    //     state.currentTime =data
    // },
    //播放音乐
    play(state){
        state.isPlaying = true
    },
    //暂停
    pause(state){
        state.isPlaying = false
    },
}