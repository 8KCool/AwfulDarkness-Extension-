<script>
import { SVG } from '@/view/content/icosvg.js'
export default {
    props: {
        Pos_prop: Object,
        Color_prop: String
    },
    data() {
        return {
            SVGIcons: SVG,
            colors: ['highlight-yellow', 'highlight-green', 'lightblue'], // Update with your desired colors,
            currentActiveBtn: '',
            colorSelect_state: false,
            smileSelect_state: false,
            writeSelect_state: false,
            speakSelect_state: false,
            translateSelect_state: false,
        };
    },
    methods: {
        activeBtn(title) {
            this.currentActiveBtn = title;
            this.clearBtnState();
            switch (title) {
                case 'color': {
                    this.colorSelect_state = true;
                    break;
                }
                case 'smile': {
                    this.smileSelect_state = true;
                    break;
                }
                case 'write': {
                    this.writeSelect_state = true;
                    break;
                }
                case 'speak': {
                    this.speakSelect_state = true;
                    break;
                }
                case 'translate': {
                    this.translateSelect_state = true;
                    break;
                }
            }
        },

        selectColor(color) {
            if (color == '') return;
            this.colorSelect_state = false;
            this.$emit('colorSelected', color);
        },

        clearBtnState() {
            this.colorSelect_state = false;
            this.smileSelect_state = false;
            this.writeSelect_state = false;
            this.speakSelect_state = false;
            this.translateSelect_state = false;
        }
    }
};
</script>

<template>
    <div>
        <div class="custom-context" :style="{ top: Pos_prop.y, left: Pos_prop.x }">
            <!-- color select button -->
            <div title="Highlight" class="context-button mr-10px" @mouseover="activeBtn('color')"
                :class="currentActiveBtn == 'color' && 'active'" @click="selectColor(Color_prop)">
                <div v-if="Color_prop == ''" v-html="SVGIcons.HIGHLIGHT_pencil_normal"></div>
                <div v-else-if="Color_prop == 'highlight-yellow'" v-html="SVGIcons.HIGHLIGHT_pencil_yellow">
                </div>
                <div v-else-if="Color_prop == 'highlight-green'" v-html="SVGIcons.HIGHLIGHT_pencil_green"></div>
                <div v-else-if="Color_prop == 'highlight-lightblue'" v-html="SVGIcons.HIGHLIGHT_pencil_lightblue"></div>
            </div>

            <div title="Explain" class="context-button mr-10px" @mouseover="activeBtn('smile')"
                @mouseleave="currentActiveBtn = ''" :class="currentActiveBtn == 'smile' && 'active'">
                <div v-if="smileSelect_state && currentActiveBtn == 'smile'" v-html="SVGIcons.HIGHLIGHT_smile_hover"></div>
                <div v-else v-html="SVGIcons.HIGHLIGHT_smile">
                </div>
            </div>

            <div title="Rewrite" class="context-button mr-10px" @mouseover="activeBtn('write')"
                @mouseleave="currentActiveBtn = ''" :class="currentActiveBtn == 'write' && 'active'">
                <div v-if="writeSelect_state && currentActiveBtn == 'write'" v-html="SVGIcons.HIGHLIGHT_write_hover"></div>
                <div v-else v-html="SVGIcons.HIGHLIGHT_write">
                </div>
            </div>

            <div title="Speak" class="context-button mr-10px" @mouseover="activeBtn('speak')"
                @mouseleave="currentActiveBtn = ''" :class="currentActiveBtn == 'speak' && 'active'">
                <div v-if="speakSelect_state && currentActiveBtn == 'speak'" v-html="SVGIcons.HIGHLIGHT_speak_hover"></div>
                <div v-else v-html="SVGIcons.HIGHLIGHT_speak">
                </div>
            </div>

            <div title="Translate" class="context-button" @mouseover="activeBtn('translate')"
                :class="currentActiveBtn == 'translate' && 'active'">
                <div v-if="translateSelect_state" v-html="SVGIcons.HIGHLIGHT_translate_hover"></div>
                <div v-else v-html="SVGIcons.HIGHLIGHT_translate">
                </div>
            </div>

            <div class="color-modal tool-modal" :class="colorSelect_state && 'active'"
                @mouseover="colorSelect_state = true">
                <div class="tool-button" @click="selectColor('highlight-yellow')"><svg width="20" height="20"
                        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" fill="#FFDA44" stroke="#707070" />
                    </svg>
                </div>
                <div class="tool-button" @click="selectColor('highlight-green')">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" fill="#32D583" stroke="#A0A0A0" />
                    </svg>
                </div>
                <div class="tool-button" @click="selectColor('highlight-lightblue')">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" fill="#BAD4FF" stroke="#A0A0A0" />
                    </svg>
                </div>
            </div>
            <div class="translate-modal tool-modal" :class="translateSelect_state && 'active'"
                @mouseover="translateSelect_state = true">
                <div class="tool-button"> English </div>
                <div class="tool-button"> Vietnamese </div>
                <div class="tool-button"> Korean </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '@/view/styles/component.css';
@import '@/view/styles/common.css';
@import '@/view/styles/context.css';
</style>