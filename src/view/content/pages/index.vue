
<script>
import { PAGE_INDEX } from '@/view/content/const.js'
import HighlightPage from "@/view/content/pages/HighlightPage.vue"

export default {
  props: {
    page_prop: Number,
  },
  components: {
    HighlightPage,
  },
  name: 'mainPageView',
  data() {
    return {
      Pages: PAGE_INDEX
    }
  },
  methods: {
    submit(changedPage, param) {
      switch (changedPage) {
        case this.Pages.HIGHLIGHT_PAGE: //highlight
          this.$refs.highlight_page.submit(param);
          break;
        default:
          break;
      }
    },

  },

}
</script>

<template>
  <div>
    <HighlightPage ref="highlight_page" class="custom-page hide"
      :class="page_prop == Pages.HIGHLIGHT_PAGE && 'active show'" />
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