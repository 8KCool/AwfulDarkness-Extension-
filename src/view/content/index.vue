
<script>

import { SVG } from '@/view/content/icosvg.js'
import { PAGE_INDEX } from '@/view/content/const.js'
import ContentHeader from "@/view/content/components/ContentHeader.vue"
import ContentPage from "@/view/content/pages/index.vue"
import MusicPlayer from "@/view/content/components/MusicPlayer.vue"
import YoutubeBookMarkComponent from "@/view/content/components/youtube/YoutubeBookMarkComponent.vue"
export default {
  components: {
    ContentHeader,
    MusicPlayer,
    ContentPage,
    YoutubeBookMarkComponent
  },
  name: 'mainContentView',
  created: function () {
  },
  mounted() {
    // if the website is youtubu.com / make the youtube bookmark button and init vido highlight
    this.checkIfYoutube();
  },
  unmounted() {
  },
  data() {
    return {
      PAGES: PAGE_INDEX,
      SVGIcons: SVG,
      open_state: false,
      page_state: PAGE_INDEX.Media_PAGE,
      is_Youtube: false
    }
  },
  methods: {
    setActivePage(page) {
      this.page_state = page;
    },

    highlightChanged(param) {
      this.open_state = true;
      if (param != -1)
        this.page_state = PAGE_INDEX.Media_PAGE
      this.$refs.content_page.submit(this.page_state, param);
    },
    openMainContext() {
      this.open_state = !this.open_state
      this.highlightChanged(-1)
    },

    // check the current webpage and custom extension tool
    checkIfYoutube() {
      const url = window.location.href;
      if (url.includes('youtube.com')) {
        this.isYouTube = true;
      } else {
        this.is_Youtube = false;
      }
    }
  },
}
</script>
  
<template>
  <div class="main-extension maika-extension">
    <div class="main-icon" :class="open_state && 'opened'" @click="openMainContext">
    </div>
    <div class="main-dialog" :class="open_state && 'opened'">
      <!-- header -->
      <div class="maika-main-header pl-10px">
        <div class="display-inlineflex float-left">Hello, Việt&nbsp;<div class="header-state mt-11px"></div>
        </div>

        <div class="float-right btn-group">
          <!-- <div class="icon-button mr-7px ico-18 ico-flag"></div> -->
          <!-- <div class="icon-button mr-7px ico-27 ico-alarm">
                      <div class="alarm-badge">5</div>
                    </div> -->
          <div class="icon-button mr-7px ico-27 ico-expand"></div>
          <div class="icon-button mr-7px ico-27 ico-setting"></div>
          <div class="icon-button mr-2px ico-27 ico-close" @click="open_state = !open_state"></div>
        </div>
      </div>
      <!-- content header&pages -->
      <div class="maika-main-content">
        <ContentHeader class="content-header" @page_emit="setActivePage" :page_prop="page_state" />
        <ContentPage ref="content_page" class="content-page" :page_prop="page_state" />
        <MusicPlayer class="music-player" />
      </div>
    </div>
    <YoutubeBookMarkComponent v-if="is_Youtube" />
  </div>
</template>
  
<style scoped>
@import '@/view/styles/content.css';
@import '@/view/styles/component.css';
@import '@/view/styles/common.css';

@import url('https://fonts.cdnfonts.com/css/averta-blackitalic');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
</style>