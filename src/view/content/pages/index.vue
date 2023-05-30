
<script>
import { PAGE_INDEX } from '@/view/content/const.js'
import MediaPage from "@/view/content/pages/MediaPage.vue"

export default {
  props: {
    page_prop: Number,
  },
  components: {
    MediaPage,
  },
  name: 'mainPageView',
  data() {
    return {
      Pages: PAGE_INDEX
    }
  },
  methods: {

  },

}
</script>

<template>
  <div>
    <MediaPage class="custom-page hide" :class="page_prop == Pages.MEDIA_PAGE && 'active show'" />
  </div>
</template>  

<style scoped>
.custom-page {
  position: absolute;
  box-sizing: border-box;
  padding-top: 8px;
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: all .3s ease-in-out;
}

.custom-page.active {
  opacity: 1;
}
</style>