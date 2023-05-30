<script>
import { PAGE_INDEX } from '@/view/content/const.js'
export default {
    props: {
        page_prop: Number
    },
    emits: ['page_emit'],
    created() {
        this.$emit('page_emit', this.page_state)
    },
    data() {
        return {
            PAGES: PAGE_INDEX,
            page_state: this.page_prop,
        }
    },
    methods: {
        clickedPageTab(idx) {
            this.page_state = idx
            this.$emit('page_emit', this.page_state)
        }
    }
}
</script>

<template>
    <div>
        <div class="btn-group">
            <!-- <div @click="clickedPageTab(PAGES.NEWS_PAGE)" class="icon-button mx-7px ico-32 ico-news"
                    :class="page_state == PAGES.NEWS_PAGE && 'active'"></div> -->
            <!-- <div @click="clickedPageTab(PAGES.TODO_PAGE)" class="icon-button mx-7px ico-32 ico-todo"
                    :class="page_state == PAGES.TODO_PAGE && 'active'"></div> -->
            <!-- <div @click="clickedPageTab(PAGES.CHAT_PAGE)" class="icon-button mx-7px ico-32 ico-chat"
                :class="page_prop == PAGES.CHAT_PAGE && 'active'"></div> -->
            <!-- <div @click="clickedPageTab(PAGES.VOICEMEMO_PAGE)" class="icon-button mx-7px ico-32 ico-templates"
                    :class="page_state == PAGES.VOICEMEMO_PAGE && 'active'"></div> -->
            <!-- <div @click="clickedPageTab(PAGES.HIGHLIGHT_PAGE)" class="icon-button mx-7px ico-32 ico-highlight"
                :class="page_prop == PAGES.HIGHLIGHT_PAGE && 'active'"></div> -->
            <!-- <div @click="clickedPageTab(PAGES.TEMPLATES)" class="icon-button mx-7px ico-32 ico-voicememo"
                :class="page_prop == PAGES.TEMPLATES && 'active'"></div> -->
            <div @click="clickedPageTab(PAGES.MEDIA_PAGE)" class="icon-button mx-7px ico-32 ico-media"
                :class="page_state == PAGES.MEDIA_PAGE && 'active'"></div>
            <div class="icon-button mr-2px ico-21 ico-submenu float-right"></div>
        </div>
    </div>
</template>