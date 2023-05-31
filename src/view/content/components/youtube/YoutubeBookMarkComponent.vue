<script>
import { SVG } from '@/view/content/icosvg.js'
export default {
    data() {
        return {
            ICON_SVG: SVG,
            saveIcon: null,
            youtubePlayer: null
        };
    },
    mounted() {
        this.addBookMarkIconVideoLoads();
    },

    methods: {
        // inject btn on the video tool bar to add bookmark
        async addBookMarkIconVideoLoads() {
            const youtubePlayerControls = document.getElementsByClassName('ytp-left-controls')[0];
            this.saveIcon = document.querySelector('.bookmark-btn');
            if (window.location.toString().includes("youtube.com/watch")) {
                this.youtubePlayer = document.querySelector(".video-stream");
                if (!this.saveIcon) {
                    const imgTemplate = `<img src='${this.ICON_SVG.Youtube_BookMark_ICO}' width=23 height=23 style='margin:0.5em; cursor:pointer' class='bookmark-btn ' title='click to save timestamp'/>`;
                    youtubePlayerControls.insertAdjacentHTML("beforeend", imgTemplate);
                    // this.configureClick();
                }
                this.renderMarker();
            }
        }
    }
};
</script>

<template>
    <div>
    </div>
</template>

<style scoped></style>