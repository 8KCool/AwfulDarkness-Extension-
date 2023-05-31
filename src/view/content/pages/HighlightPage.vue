
<script>
import { SVG } from '@/view/content/icosvg.js'
import { _HighlightLibrary } from '@/view/content/library/highlight/highlightLibrary.js'
export default {
  name: 'highLightPage',
  data() {
    return {
      ICONSvg: SVG,
      highlightSavedUrls: [],
      highlightResults: {},
      detailhighlightTags: ["principle", "uniqlo"],
      addTagText: '',
      currentPageType: 0, // 0 : highlight-category, 1 : highlight-detail
      highlightdetail: null
    }
  },
  mounted: function () {
    window.addEventListener('load', () => {
         // run after everything is in-place
         this.getSavedHighlights();
    })
  },
  methods: {
    async getSavedHighlights() {
      this.currentPageType = 0;
      const results = await _HighlightLibrary.loadAllHighlightFromDB();
      // this.highlightResults = results
      if (results.highlights) {
        this.highlightSavedUrls = Object.keys(results.highlights)
        this.highlightResults = results.highlights
      } else {
        this.highlightSavedUrls = [];
        this.highlightResults = [];
        this.highlightdetail = null
      }
    },
    showDetailHighlight(url) {
      this.currentPageType = 1;
      this.highlightdetail = this.highlightResults[url];
    },

    async deleteHighlightDetail() {
      if (this.highlightdetail && this.highlightdetail.length > 0) {
        await _HighlightLibrary.removeHighlightGroup(this.highlightdetail[0].url);
        this.currentPageType = 0;
        this.getSavedHighlights();
      }
    },

    showCategoryHighlight() {
      this.currentPageType = 0;
    },

    // tags method
    removeTag(index) {
      this.detailhighlightTags.splice(index, 1)
    },
    addNewTag() {
      if (this.addTagText.length > 0)
        this.detailhighlightTags.push(this.addTagText);
      this.addTagText = '';
    },

    // event from the parent (highlight changed in context menu) 
    submit(param) {
      this.changedHighlightInfo(param)
    },

    async changedHighlightInfo(param) {
      if (param == -1) {
        this.getSavedHighlights()
        return
      }
      // this.highlightResults = results
      const results = await _HighlightLibrary.loadAllHighlightFromDB();
      if (results.highlights) {
        this.highlightSavedUrls = Object.keys(results.highlights)
        this.highlightResults = results.highlights
      } else {
        this.highlightSavedUrls = [];
        this.highlightResults = [];
        this.highlightdetail = null
      }

      if (param.pageType == 'list') {
        this.currentPageType = 0;
      } else if (param.pageType == 'detail') {
        this.showDetailHighlight(param.highlightUrl);
      }
    },
  },
}
</script>

<template>
  <div class="highlight-page">
    <div v-if="currentPageType == 0" class="highlight-category">
      <div class="no-highlights" v-if="highlightSavedUrls.length == 0">
        <div class="no-highlights-svg" v-html="ICONSvg.HIGHLIGHTPAGE_noDataImg">

        </div>
      </div>
      <div v-else class="highlights-content">
        <div class="highlights-title mt-9px mr-14px">
          Việt’s Highlights
          <svg class="mt-3px" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.625 16.625C13.491 16.625 16.625 13.491 16.625 9.625C16.625 5.75901 13.491 2.625 9.625 2.625C5.75901 2.625 2.625 5.75901 2.625 9.625C2.625 13.491 5.75901 16.625 9.625 16.625Z"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.3751 18.3751L14.5688 14.5688" stroke="black" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>

        <div class="highlights-tag mt-2px mr-14px">
          <svg class="mt-8px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.99341 6.98489V16.9631C2.99341 17.4923 3.20366 17.9999 3.57792 18.3742C3.95217 18.7484 4.45977 18.9587 4.98904 18.9587H18.9585C19.4878 18.9587 19.9954 18.7484 20.3696 18.3742C20.7439 17.9999 20.9541 17.4923 20.9541 16.9631V8.98053C20.9541 8.45125 20.7439 7.94365 20.3696 7.5694C19.9954 7.19515 19.4878 6.98489 18.9585 6.98489H12.9716L10.9759 4.98926H4.98904C4.45977 4.98926 3.95217 5.19951 3.57792 5.57377C3.20366 5.94802 2.99341 6.45562 2.99341 6.98489Z"
              fill="#413F3F" fill-opacity="0.4" />
          </svg>

          <div class="tag-title ml-7px">Saves <svg class="mt-3px ml-8px" width="11" height="8" viewBox="0 0 11 8"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 8L0 1.99965L1.8342 0L5.5 4.00071L9.1658 0L11 1.99965L5.5 8Z" fill="#413F3F" />
            </svg>
          </div>
          <div class="tag-divide"> </div>

          <div class="tag-badge">{{ highlightSavedUrls.length }}</div>
        </div>

        <div class="highlights-list scroll-div-y custom-scroll">
          <div class="scorll-panel">
            <div class="highlights-card" v-for="(item, index) in highlightSavedUrls" :key="'highlightCard' + index"
              @click="showDetailHighlight(item)">
              <div v-if="highlightResults[item].length > 0">
                <img v-if="highlightResults[item][0].thumbURL == ''" class="card-image"
                  src="https://mcdn.wallpapersafari.com/medium/5/37/GZC1fM.jpg" />
                <img v-else class="card-image" v-bind:src="highlightResults[item][0].thumbURL" />
                <div class="card-title"><span>{{ highlightResults[item][0].pageTitle }}</span></div>
                <div class="card-info">
                  <span class="highlight-domain">{{ highlightResults[item][0].domainName }}</span>
                  <div class="count-badge">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="7" cy="7" r="7" fill="#FFDA44" />
                    </svg>
                    <span>{{ highlightResults[item].length }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="currentPageType == 1" class="highlight-detail">
      <div class="title mt-9px mr-14px">
        <svg @click="showCategoryHighlight" class="mt-2px pointer" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 19L5 12L12 5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <svg class="ml-14px mt-4px" width="21" height="21" viewBox="0 0 21 21" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2726_13761)">
            <path
              d="M10.5 19.25C15.3325 19.25 19.25 15.3325 19.25 10.5C19.25 5.66751 15.3325 1.75 10.5 1.75C5.66751 1.75 1.75 5.66751 1.75 10.5C1.75 15.3325 5.66751 19.25 10.5 19.25Z"
              stroke="#414141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.75 10.5H19.25" stroke="#414141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M10.5 1.75C12.6886 4.14606 13.9324 7.25553 14 10.5C13.9324 13.7445 12.6886 16.8539 10.5 19.25C8.31138 16.8539 7.06759 13.7445 7 10.5C7.06759 7.25553 8.31138 4.14606 10.5 1.75Z"
              stroke="#414141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_2726_13761">
              <rect width="21" height="21" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span class="ml-5px">Web highlight</span>
      </div>

      <div class="highlights-filter mt-2px mb-12px mr-14px">
        <div class="display-flex filter-select">
          <svg class="mt-8px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.99341 6.98489V16.9631C2.99341 17.4923 3.20366 17.9999 3.57792 18.3742C3.95217 18.7484 4.45977 18.9587 4.98904 18.9587H18.9585C19.4878 18.9587 19.9954 18.7484 20.3696 18.3742C20.7439 17.9999 20.9541 17.4923 20.9541 16.9631V8.98053C20.9541 8.45125 20.7439 7.94365 20.3696 7.5694C19.9954 7.19515 19.4878 6.98489 18.9585 6.98489H12.9716L10.9759 4.98926H4.98904C4.45977 4.98926 3.95217 5.19951 3.57792 5.57377C3.20366 5.94802 2.99341 6.45562 2.99341 6.98489Z"
              fill="#413F3F" fill-opacity="0.4" />
          </svg>

          <div class="filter-title ml-7px">Business <svg class="mt-3px ml-8px" width="11" height="8" viewBox="0 0 11 8"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 8L0 1.99965L1.8342 0L5.5 4.00071L9.1658 0L11 1.99965L5.5 8Z" fill="#413F3F" />
            </svg>
          </div>
        </div>

        <svg @click="deleteHighlightDetail" class="mt-18px pointer" width="18" height="18" viewBox="0 0 18 18" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M2.25 4.5H3.75H15.75" stroke="#888888" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M14.25 4.5V15C14.25 15.3978 14.092 15.7794 13.8107 16.0607C13.5294 16.342 13.1478 16.5 12.75 16.5H5.25C4.85218 16.5 4.47064 16.342 4.18934 16.0607C3.90804 15.7794 3.75 15.3978 3.75 15V4.5M6 4.5V3C6 2.60218 6.15804 2.22064 6.43934 1.93934C6.72064 1.65804 7.10218 1.5 7.5 1.5H10.5C10.8978 1.5 11.2794 1.65804 11.5607 1.93934C11.842 2.22064 12 2.60218 12 3V4.5"
            stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M7.5 8.25V12.75" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M10.5 8.25V12.75" stroke="#888888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <div class="scroll-div-y custom-scroll detail-scroll">
        <div class="highlights-tags">
          <span class="float-left">Tag:</span>
          <div v-for="(item, index) in detailhighlightTags" :key="'detailTag' + index"
            class="tag-item ml-5px mb-3px float-left">
            <span>{{ item }}</span>
            <svg @click="removeTag(index)" class="mt-2px ml-4px pointer" width="16" height="16" viewBox="0 0 16 16"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M4.19526 4.19526C4.45561 3.93491 4.87772 3.93491 5.13807 4.19526L8 7.05719L10.8619 4.19526C11.1223 3.93491 11.5444 3.93491 11.8047 4.19526C12.0651 4.45561 12.0651 4.87772 11.8047 5.13807L8.94281 8L11.8047 10.8619C12.0651 11.1223 12.0651 11.5444 11.8047 11.8047C11.5444 12.0651 11.1223 12.0651 10.8619 11.8047L8 8.94281L5.13807 11.8047C4.87772 12.0651 4.45561 12.0651 4.19526 11.8047C3.93491 11.5444 3.93491 11.1223 4.19526 10.8619L7.05719 8L4.19526 5.13807C3.93491 4.87772 3.93491 4.45561 4.19526 4.19526Z"
                fill="#A0A0A0" />
            </svg>
          </div>
          <input type="text" class="tag-add float-left mt-3px" v-model="addTagText" placeholder="add tag..."
            @keyup.enter.exact="addNewTag">
        </div>

        <div v-if="highlightdetail.length > 0" class="detail-content">
          <div class="detail-image">
            <img v-if="highlightdetail[0].thumbURL == ''" class=""
              src="https://mcdn.wallpapersafari.com/medium/5/37/GZC1fM.jpg" />
            <img v-else class="" v-bind:src="highlightdetail[0].thumbURL" />
          </div>
          <div class="detail-info">
            <span class="detail-domain">{{ highlightdetail[0].domainName }}</span>
            <span class="detail-date">June 19, 2022</span>
          </div>
          <div class="title-text">
            {{ highlightdetail[0].pageTitle }}
          </div>
          <div class="divide-1px mt-9px"> </div>
          <div class="highlights-detail-list" v-for="(item, index) in highlightdetail" :key="'highlight-detail' + index"
            :class="'border' + item.highlightName">
            {{ item.selectedText }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.highlight-page {
  height: 100%;
  box-sizing: border-box;
}

/* highlight-category */
.highlight-category {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.highlight-category .no-highlights {
  margin-top: 127px;
}

.highlight-category .no-highlights-svg {
  width: fit-content;
  height: fit-content;
  margin: auto;
}

.highlight-category .highlights-content {
  width: 100%;
  height: 100%;
  padding-left: 14px;
  box-sizing: border-box;
}

.highlight-category .highlights-title {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 28px;
  color: #292929;
}

.highlight-category .highlights-tag {
  display: flex;
  justify-content: space-between;
}

.highlight-category .highlights-tag .tag-title {
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 38px;
  align-items: center;
  color: #292929;
  display: flex;
}

.highlight-category .highlights-tag .tag-divide {
  max-width: 208px;
  height: 0px;
  border: 0.997817px solid rgba(188, 188, 196, 0.44);
  margin-top: 19px;
  margin-left: 16px;
  width: 100%;
}

.highlight-category .highlights-tag .tag-badge {

  background: #413F3F;
  border: 1.99563px solid #413F3F;
  border-radius: 5.9869px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 11.1855px;
  line-height: 14px;
  color: #F4F4F4;
  padding: 3px 7px;
  margin-left: 15px;
  height: 20px;
  margin-top: 10px;
  box-sizing: border-box;
}

.highlight-category .highlights-list {
  padding-right: 14px;
  box-sizing: border-box;
  height: 500px;
}

.highlight-category .highlights-list .scorll-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}

.highlight-category .highlights-list .highlights-card {
  background: #FFFFFF;
  box-shadow: 1px 2px 2px #D9D9D9;
  border-radius: 10px;
  flex: 1 0 45%;
  /* explanation below */
  width: 156px;
  max-width: 156px;
  height: fit-content;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.2s linear;
}

.highlight-category .highlights-list .highlights-card:hover {
  transform: scale(1.03);
  transform-origin: 50% 50%;
}

.highlight-category .highlights-list .highlights-card:nth-child(even) {
  margin-left: 14px;
}

.highlight-category .highlights-list .highlights-card:nth-child(odd) {
  margin-right: 14px;
}


.highlight-category .highlights-list .highlights-card .card-image {
  width: 100%;
  height: 88px;
  object-fit: cover;
}

.highlight-category .highlights-list .highlights-card .card-title {
  margin-top: 5px;
  padding: 0px 9px;
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  color: #221F1F;
  overflow: hidden;
  word-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* Number of lines to show */
  -webkit-box-orient: vertical;
}

.highlight-category .highlights-list .highlights-card .card-info {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  padding-left: 9px;
  padding-right: 9px;
  box-sizing: border-box;
  margin-bottom: 5px;
}

.highlight-category .highlights-list .highlights-card .highlight-domain {
  width: 70%;
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  color: #707070;
  overflow: hidden;
  word-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
}

.highlight-category .highlights-list .highlights-card .count-badge {
  display: flex;
}

.highlight-category .highlights-list .highlights-card .count-badge span {
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */
  color: #221F1F;
  margin-left: 4px;
}

/* end highlight category */

/* start highlight detail */
.highlight-detail {
  width: 100%;
  height: 100%;
  padding-left: 14px;
  box-sizing: border-box;

}

.highlight-detail .title {
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 28px;
  color: #292929;
  display: flex;
}



.highlight-detail .highlights-filter {
  display: flex;
  justify-content: space-between;
  margin-left: 7px;
  margin-right: 7px;
}

.highlight-detail .highlights-filter .filter-select {
  border: 1px solid #EBEBEB;
  border-radius: 10px;
  padding: 0px 6px;
  margin-top: 8px;
}


.highlight-detail .highlights-filter .filter-title {
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 38px;
  align-items: center;
  color: #292929;
  display: flex;
}

.highlight-detail .detail-scroll {
  height: 460px;
  padding-right: 14px;
  box-sizing: border-box;
  margin: 0px 7px;
}

.highlight-detail .highlights-tags {}

.highlight-detail .tag-item {
  display: flex;
  background: #FAFAFA;
  border: 1px solid #CFCFCF;
  border-radius: 12px;
  padding: 3px 8px;
  box-sizing: border-box;

  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #414141;
}

.highlight-detail .highlights-tags .tag-add {
  padding: 3px 8px;
  border: 0;
  outline: 0;
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #888888;
  width: 70px;
  box-sizing: border-box;
  background-color: white;
}

.highlight-detail .highlights-tags .tag-add:focus {
  outline: none !important;
}

/* detail content */
.highlight-detail .detail-content {
  clear: both;
  width: 100%;
  padding-top: 9px;
  box-sizing: border-box;
}

.highlight-detail .detail-content .detail-image {
  /* clear: both;
  width: 100%;
  display: flex;
  justify-content: center; */

  width: 338px;
  height: 190px;
  position: relative;
  display: inline-block;
  overflow: hidden;
  margin: 0;
}

.highlight-detail .detail-content .detail-image img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  min-height: 100%;
  min-width: 100%;
  transform: translate(-50%, -50%);
}

.highlight-detail .detail-content .detail-info {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-family: 'Averta-Regular';
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
  color: #707070;
}

.highlight-detail .detail-content .detail-info .detail-domain {
  font-weight: 700;
}

.highlight-detail .detail-content .detail-info .detail-date {
  font-weight: 400;
}

.highlight-detail .detail-content .title-text {
  margin-top: 8px;
  padding-left: 2px;
  padding-right: 2px;
  box-sizing: border-box;
  font-family: 'Averta-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #091127;
  overflow: hidden;
  word-wrap: break-word;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* Number of lines to show */
  -webkit-box-orient: vertical;
}

.highlight-detail .detail-content .highlights-detail-list {
  display: flex;
  margin-top: 12px;
  padding-left: 6px;
  box-sizing: border-box;
  border-width: 4px;
  border-style: solid;
  border-top: none;
  border-bottom: none;
  border-right: none;

  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
}

.highlight-detail .detail-content .highlights-detail-list.borderhighlight-yellow {
  border-color: #FFDA44;
}

.highlight-detail .detail-content .highlights-detail-list.borderhighlight-green {
  border-color: #32D583;
}

.highlight-detail .detail-content .highlights-detail-list.borderhighlight-lightblue {
  border-color: #BAD4FF;
}
</style>