<script>
import { SVG } from '@/view/content/icosvg.js'
export default {
    data() {
        return {
            ICON_SVG: SVG,
            saveIcon: null,
            youtubePlayer: null,
            videoId: ''
        };
    },
    mounted() {
        this.videoId = this.getVideoId();
        this.addBookMarkIconVideoLoads();
    },

    methods: {
        // inject btn on the video tool bar to add bookmark
        async addBookMarkIconVideoLoads() {
            alert("youtube.com");
            const youtubePlayerControls = document.getElementsByClassName('ytp-left-controls')[0];
            this.saveIcon = document.querySelector('.bookmark-btn');
            if (window.location.toString().includes("youtube.com/watch")) {
                this.youtubePlayer = document.querySelector(".video-stream");
                if (!this.saveIcon) {
                    const imgTemplate = `<img src='${this.ICON_SVG.Youtube_BookMark_ICO}' width=23 height=23 style='margin:0.5em; cursor:pointer' class='bookmark-btn ' title='click to save timestamp'/>`;
                    youtubePlayerControls.insertAdjacentHTML("beforeend", imgTemplate);
                    this.configureClick();
                }
                // this.renderMarker();
            }
        },

        configureClick() {
            document.querySelector(".bookmark-btn")
                ?.addEventListener("click", this.handleBookMark);
        },

        async handleBookMark() {
            const currentTime = this.youtubePlayer.currentTime;
            const newBookmark = {
                time: currentTime,
                desc: "Timestamp saved at " + this.getTime(currentTime),
                imageUrl: await this.canvas(this.youtubePlayer, currentTime).toString(),
            };
            console.log(newBookmark);
            this.currentVideoBookmarks = await this.fetchBookmarks();
            if (this.videoId) {
                chrome.storage.local.set({
                    [this.videoId]: JSON.stringify(
                        [...this.currentVideoBookmarks, newBookmark].sort(
                            (a, b) => a.time - b.time
                        )
                    ),
                });
            }
        },


        //get snapshot at any given timestamp
        canvas(videoElement, time) {
            //here you can set anytime you want
            videoElement.currentTime = time;
            var canvas = document.createElement("canvas");
            canvas.width = 350;
            canvas.height = 200;
            canvas
                .getContext("2d")
                .drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL("image/jpeg");
        },
        //convert time in seconds to youtube hours
        getTime(t) {
            var date = new Date(0);
            date.setSeconds(t);
            return date.toISOString().substr(11, 8);
        },


        getVideoId() {
            if (window.location.search.split("v=")[1] === undefined) {
                return "";
            }
            let videoId = window.location.search.split("v=")[1];
            let ampersandPosition = videoId.indexOf("&");
            if (ampersandPosition != -1) {
                videoId = videoId.substring(0, ampersandPosition);
            }
            return videoId;
        },

        // database
        async fetchBookmarks() {
            return new Promise((resolve) => {
                chrome.storage.local.get([this.videoId], (obj) => {
                    if (this.videoId)
                        resolve(obj[this.videoId] ? JSON.parse(obj[this.videoId]) : []);
                });
            });
        }


    }
};
</script>

<template>
    <div>
    </div>
</template>

<style scoped></style>