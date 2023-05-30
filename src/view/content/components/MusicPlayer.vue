
<script>

import { ThumbImages } from '@/view/content/images.js'
export default {
    data() {
        return {
            audio_progress: 0,
            audio_url: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
            playbackTime: 0,
            audioDuration: 100,
            audioLoaded: false,
            isPlaying: false,
            thumbImages: ThumbImages
        }
    },
    mounted() {

        this.$refs.listenToDrag.addEventListener("click", this.getClickPosition, false);
        this.$nextTick(function () {

            var audio = this.$refs.player;
            //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider 
            // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
            audio.addEventListener(
                "loadedmetadata",
                function () {
                    this.initSlider();
                }.bind(this)
            );
            // "canplay" HTML Event lets us know audio is ready for play https://www.w3schools.com/tags/av_event_canplay.asp
            audio.addEventListener(
                "canplay",
                function () {
                    this.audioLoaded = true;
                }.bind(this)
            );
            //Wait for audio to begin play, then start playback listener function
            this.$watch("isPlaying", function () {
                if (this.isPlaying) {
                    var audio = this.$refs.player;
                    this.initSlider();
                    //console.log("Audio playback started.");
                    //prevent starting multiple listeners at the same time
                    if (!this.listenerActive) {
                        this.listenerActive = true;
                        //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
                        audio.addEventListener("timeupdate", this.playbackListener);
                    }
                }
            });
            //Update current audio position when user drags progress slider
            this.$watch("playbackTime", function () {
                // var audio = this.$refs.player;
                var diff = Math.abs(this.playbackTime - this.$refs.player.currentTime);
                //Throttle synchronization to prevent infinite loop between playback listener and this watcher
                if (diff > 0.01) {
                    this.$refs.player.currentTime = this.playbackTime;
                }
            });
        });
    },
    methods: {
        // getClickPosition(e) {
        //     e = e || window.e
        //     const progress = this.$refs.progress;
        //     this.wrapperWidth = progress.wrapperWidth || progress.offsetWidth;
        //     // get the seek width
        //     let seekWidth = e.offsetX

        //     // change seek position
        //     this.audio_progress += (seekWidth / this.wrapperWidth) * 100
        // },
        // ============== control the music ================
        initSlider() {
            this.audioDuration = this.getProgress();
        },
        convertTime(seconds) {
            const format = val => `0${Math.floor(val)}`.slice(-2);
            // var hours = seconds / 3600;
            var minutes = (seconds % 3600) / 60;
            return [minutes, seconds % 60].map(format).join(":");
        },
        totalTime() {
            var audio = this.$refs.player;
            if (audio) {
                var seconds = audio.duration;
                return this.convertTime(seconds);
            } else {
                return '00:00';
            }
        },
        //Display the audio time elapsed so far
        elapsedTime() {
            var audio = this.$refs.player;
            if (audio) {
                var seconds = audio.currentTime;
                return this.convertTime(seconds);
            } else {
                return '00:00';
            }
        },
        getProgress() {
            var audio = this.$refs.player;
            if (audio) {
                var elapsed = audio.currentTime;
                var total = audio.duration;
                return Math.round(elapsed / total * 10000) / 100
            } else
                return 0;
        },
        playbackListener() {
            var audio = this.$refs.player;
            //Sync local 'playbackTime' var to audio.currentTime and update global state
            this.playbackTime = audio.currentTime;
            this.initSlider();
            //console.log("update: " + audio.currentTime);
            //Add listeners for audio pause and audio end events
            audio.addEventListener("ended", this.endListener);
            audio.addEventListener("pause", this.pauseListener);
        },
        //Function to run when audio is paused by user
        pauseListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Function to run when audio play reaches the end of file
        endListener() {
            this.isPlaying = false;
            this.listenerActive = false;
            this.cleanupListeners();
        },
        //Remove listeners after audio play stops
        cleanupListeners() {
            var audio = this.$refs.player;
            audio.removeEventListener("timeupdate", this.playbackListener);
            audio.removeEventListener("ended", this.endListener);
            audio.removeEventListener("pause", this.pauseListener);
            //console.log("All cleaned up!");
        },
        toggleAudio() {
            var audio = this.$refs.player;
            //var audio = document.getElementById("audio-player");
            if (audio.paused) {
                audio.play();
                this.isPlaying = true;
            } else {
                audio.pause();
                this.isPlaying = false;
            }
        },
    }
}
</script>

<template>
    <div>
        <div ref="progress" class="audio-progress" id="audio-progress">
            <div ref="listenToDrag" id="draggable-point" :style="'left:' + audioDuration + '%'"
                class="draggable ui-widget-content">
                <div id="audio-progress-handle"></div>
            </div>
            <div ref="progressBar" id="audio-progress-bar" class="bar" :style="'width:' + audioDuration + '%'">
            </div>
        </div>
        <div class="audio-control">
            <img class="audio-thumb" width="67px" height="67px" :src="thumbImages.thumb6" />
            <div class="audio-content">
                <div class="audio-title">Chaff & Dust</div>
                <div class="audio-playlist"><svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.75 19.25C16.6783 19.25 17.5685 18.8813 18.2249 18.2249C18.8813 17.5685 19.25 16.6783 19.25 15.75V2.625C19.25 2.39294 19.1578 2.17038 18.9937 2.00628C18.8296 1.84219 18.6071 1.75 18.375 1.75C18.1429 1.75 17.9204 1.84219 17.7563 2.00628C17.5922 2.17038 17.5 2.39294 17.5 2.625V12.7365C16.9703 12.4216 16.3662 12.2536 15.75 12.25C14.8217 12.25 13.9315 12.6188 13.2751 13.2751C12.6187 13.9315 12.25 14.8217 12.25 15.75C12.25 16.6783 12.6187 17.5685 13.2751 18.2249C13.9315 18.8813 14.8217 19.25 15.75 19.25ZM15.75 14C16.0961 14 16.4345 14.1026 16.7222 14.2949C17.01 14.4872 17.2343 14.7605 17.3668 15.0803C17.4992 15.4001 17.5339 15.7519 17.4664 16.0914C17.3989 16.4309 17.2322 16.7427 16.9874 16.9874C16.7427 17.2322 16.4309 17.3989 16.0914 17.4664C15.7519 17.5339 15.4001 17.4992 15.0803 17.3668C14.7605 17.2343 14.4872 17.01 14.2949 16.7223C14.1026 16.4345 14 16.0961 14 15.75C14 15.2859 14.1844 14.8408 14.5126 14.5126C14.8408 14.1844 15.2859 14 15.75 14Z"
                            fill="#091127" />
                        <path
                            d="M11.375 11.8125C11.375 11.5804 11.2828 11.3579 11.1187 11.1938C10.9546 11.0297 10.7321 10.9375 10.5 10.9375H2.625C2.39294 10.9375 2.17038 11.0297 2.00628 11.1938C1.84219 11.3579 1.75 11.5804 1.75 11.8125C1.75 12.0446 1.84219 12.2671 2.00628 12.4312C2.17038 12.5953 2.39294 12.6875 2.625 12.6875H10.5C10.7321 12.6875 10.9546 12.5953 11.1187 12.4312C11.2828 12.2671 11.375 12.0446 11.375 11.8125Z"
                            fill="#091127" />
                        <path
                            d="M2.625 16.625C2.39294 16.625 2.17038 16.7172 2.00628 16.8813C1.84219 17.0454 1.75 17.2679 1.75 17.5C1.75 17.7321 1.84219 17.9546 2.00628 18.1187C2.17038 18.2828 2.39294 18.375 2.625 18.375H9.625C9.85707 18.375 10.0796 18.2828 10.2437 18.1187C10.4078 17.9546 10.5 17.7321 10.5 17.5C10.5 17.2679 10.4078 17.0454 10.2437 16.8813C10.0796 16.7172 9.85707 16.625 9.625 16.625H2.625Z"
                            fill="#091127" />
                        <path
                            d="M15.75 6.125C15.75 5.89294 15.6578 5.67038 15.4937 5.50628C15.3296 5.34219 15.1071 5.25 14.875 5.25H2.625C2.39294 5.25 2.17038 5.34219 2.00628 5.50628C1.84219 5.67038 1.75 5.89294 1.75 6.125C1.75 6.35706 1.84219 6.57962 2.00628 6.74372C2.17038 6.90781 2.39294 7 2.625 7H14.875C15.1071 7 15.3296 6.90781 15.4937 6.74372C15.6578 6.57962 15.75 6.35706 15.75 6.125Z"
                            fill="#091127" />
                    </svg>
                    <span class="playlist-title">HYONNA</span>
                </div>
            </div>
            <div v-show="audioLoaded" class="play-control">
                <audio style="display:none" ref="player" :id="playerid">
                    <source :src="audio_url" type="audio/mpeg" />
                </audio>
                <svg class="prev-btn" width="22" height="22" viewBox="0 0 22 22" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.99981 18.382V3.14972M19.7998 17.6896V3.84209L9.99981 10.7659L19.7998 17.6896Z"
                        stroke="#091127" stroke-width="2.08334" stroke-linejoin="round" />
                </svg>
                <!-- play and pause btn -->
                <svg @click="toggleAudio()" v-if="isPlaying" class="pause-btn" width="25" height="25" viewBox="0 0 25 25"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.55493 5.59985V19.9321M15.9949 5.59985V19.9321" stroke="#091127" stroke-width="2.08334" />
                </svg>
                <svg @click="toggleAudio()" v-if="!isPlaying" class="play-btn" width="25" height="25" viewBox="0 0 25 25"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 3L19 12L5 21V3Z" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>

                <svg class="next-btn" width="22" height="22" viewBox="0 0 22 22" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5498 3.14978V18.3821M2.74976 3.84216V17.6897L12.5498 10.7659L2.74976 3.84216Z"
                        stroke="#091127" stroke-width="2.08334" stroke-linejoin="round" />
                </svg>
            </div>
            <div v-show="!audioLoaded" class="play-control">
                Loading...
            </div>
        </div>
    </div>
</template>

<style>
.music-player .audio-progress {
    height: 5px;
    width: 100%;
    background-color: #CACACA;
    z-index: 120002;
    position: relative;
}

.music-player .audio-progress .bar {
    height: 100%;
    background-color: #091227;
}

.music-player #audio-progress-handle {
    display: block;
    position: absolute;
    margin-top: -5.9px;
    width: 16.8px;
    height: 16.8px;
    background-color: #091227;
    transform: rotate(45deg);
    border-radius: 100%;
    cursor: pointer;
}

.music-player .draggable {
    position: absolute;
    float: left;
    margin: 0 10px 10px 0;
}

.music-player .audio-control {
    padding-left: 1px;
    padding-right: 1px;
    box-sizing: border-box;
    width: 100%;
    position: absolute;
    top: 8.53px;
    display: flex;
    z-index: 100001;
}

.music-player .audio-thumb {
    width: 67.2px;
    height: 66.47px;
}

.music-player .audio-content {
    float: right;
}

.music-player .audio-title {
    font-family: 'Averta-Regular';
    font-style: italic;
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    color: #091127;
    margin-top: 8px;
    margin-left: 11.41px;
}

.music-player .audio-playlist {
    margin-left: 14.8px;
    margin-top: 4.07px;
}

.music-player .playlist-title {
    margin-left: 13.38px;
    font-family: 'Averta-Regular';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    /* identical to box height */
    color: #8996B8;
    vertical-align: super;
}

.music-player .play-control {
    margin-top: 23px;
    margin-left: 67px;
}

.music-player .play-control .play-btn,
.music-player .play-control .pause-btn {
    margin-left: 16.8px;
}

.music-player .play-control .next-btn {
    margin-left: 16.8px;
}

.music-player .play-control svg {
    display: initial !important;
}
</style>