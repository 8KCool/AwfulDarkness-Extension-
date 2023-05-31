<script>
import { SVG } from '@/view/content/icosvg.js'
export default {
    props: {
        Info_prop: Object,
    },
    data() {
        return {
            SVGIcons: SVG,
            colors: ['highlight-yellow', 'highlight-green', 'highlight-lightblue'], // Update with your desired colors,
            currentActiveBtn: '',
            changeColorSelect_state: false,
            removeSelect_state: false,
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
                case 'changeColor': {
                    this.changeColorSelect_state = true;
                    break;
                }
                case 'remove': {
                    this.removeSelect_state = true;
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

        selectChangeColor(color) {
            if (color == '') return;
            this.changeColorSelect_state = false;
            this.$emit('changeHighlightColor', color, this.Info_prop.id);
        },

        removeHighlight() {
            this.$emit('removeHighlight', this.Info_prop.id)
        },

        clearBtnState() {
            this.changeColorSelect_state = false;
            this.removeSelect_state = false;
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
        <div ref="highlighted_custom_context" class="highlighted-custom-context"
            :style="{ top: Info_prop.y, left: Info_prop.x }">
            <!-- color select button -->

            <div title="Remove" class="context-button mr-10px" @mouseover="activeBtn('remove')"
                @mouseleave="currentActiveBtn = ''" :class="currentActiveBtn == 'remove' && 'active'" @click="removeHighlight">
                <div v-if="removeSelect_state && currentActiveBtn == 'remove'" v-html="SVGIcons.HIGHLIGHT_remove_hover"></div>
                <div v-else v-html="SVGIcons.HIGHLIGHT_remove"></div>
            </div>

            <div title="Change Color" class="context-button mr-10px" @mouseover="activeBtn('changeColor')" @click="selectChangeColor(Info_prop.color)">
                <svg v-if="Info_prop.color == 'highlight-yellow'" width="20" height="20" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9.5" fill="#FFDA44" stroke="#707070" />
                </svg>

                <svg v-else-if="Info_prop.color == 'highlight-green'" width="20" height="20" viewBox="0 0 20 20"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9.5" fill="#32D583" stroke="#A0A0A0" />
                </svg>

                <svg v-else-if="Info_prop.color == 'highlight-lightblue'" width="20" height="20" viewBox="0 0 20 20"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9.5" fill="#BAD4FF" stroke="#A0A0A0" />
                </svg>
            </div>

            <div title="Comment" class="context-button mr-10px" @mouseover="activeBtn('comment')"
                @mouseleave="currentActiveBtn = ''" :class="currentActiveBtn == 'comment' && 'active'">
                <div v-if="commentSelect_state && currentActiveBtn == 'comment'" v-html="SVGIcons.HIGHLIGHT_comment_hover"></div>
                <div v-else v-html="SVGIcons.HIGHLIGHT_comment"></div>
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


            <div class="changecolor-modal tool-modal" :class="changeColorSelect_state && 'active'"
                @mouseover="changeColorSelect_state = true">
                <div class="tool-button pointer" @click="selectChangeColor('highlight-yellow')"><svg width="20" height="20"
                        viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" fill="#FFDA44" stroke="#707070" />
                    </svg>
                </div>
                <div class="tool-button pointer" @click="selectChangeColor('highlight-green')">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9.5" fill="#32D583" stroke="#A0A0A0" />
                    </svg>
                </div>
                <div class="tool-button pointer" @click="selectChangeColor('highlight-lightblue')">
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