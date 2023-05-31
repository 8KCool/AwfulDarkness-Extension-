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
            <div @click="clickedPageTab(PAGES.HIGHLIGHT_PAGE)" class="icon-button mx-7px ico-32 ico-highlight"
                :class="page_prop == PAGES.HIGHLIGHT_PAGE && 'active'"></div>
            <div class="icon-button mr-2px ico-21 ico-submenu float-right"></div>
        </div>
    </div>
</template>