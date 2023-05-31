<script>
import AddHighlightMenu from "@/view/content/components/highlight/AddHighlightMenu.vue"
import EditHighlightMenu from "@/view/content/components/highlight/EditHighlightMenu.vue"
import { _HighlightLibrary } from '@/view/content/library/highlight/highlightLibrary.js'

export default {
    name: "highlihgtComponent",
    components: {
        AddHighlightMenu,
        EditHighlightMenu
    },
    data() {
        return {
            classString: 'maika-highlight-span',
            isTextSelected: false,
            mSelectedText: '',
            addHighlightMenuPos: {
                x: 0,
                y: 0
            },
            isEditHighlightMenuShow: false,
            editHighlightMenuInfo: {
                x: 0,
                y: 0,
                color: '',
                id: -1
            },
            mHighlightColor: ''
        }
    },
    mounted() {
        // ================= clear all DB ==================
        // chrome.storage.local.clear(function () {
        //     var error = chrome.runtime.lastError;
        //     if (error) {
        //         console.error(error);
        //     }
        //     // do something more
        // });
        const _this = this;
        window.addEventListener('mouseup', function (e) {
            e.stopPropagation();
            setTimeout(() => {
                _this.checkTextSelection();
            }, 200);
        });

        this.loadHighlightDB();
    },
    beforeUnmount() {
        window.removeEventListener('mouseup', this.checkTextSelection);
    },
    methods: {
        // ================================== set highlight =============================
        // check the current selected Text Status and decide to show highlight context menu
        checkTextSelection() {
            const selection = window.getSelection();
            const selectedText = selection.toString();
            var checkState = _HighlightLibrary.checkSelectedText(selectedText);
            if (!selection.isCollapsed && checkState) {
                this.mSelectedText = selectedText;
                this.isTextSelected = true;
                this.isEditHighlightMenuShow = false;
                this.setAddHighlightMenuPos(selection);
            } else {
                this.isTextSelected = false;
            }
        },

        // get position of the addHighlightMenu
        async setAddHighlightMenuPos(selection) {
            if (selection.rangeCount) {
                var range = selection.getRangeAt(0).cloneRange();
                if (range.getClientRects) {
                    range.collapse(true);
                    var rects = range.getClientRects();
                    if (rects.length > 0) {
                        // var rect = rects[0];
                        var rect = rects[rects.length - 1];
                        var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                        this.addHighlightMenuPos.x = rect.right + 'px';
                        this.addHighlightMenuPos.y = rect.bottom + 5 + scrollTop + 'px';
                        if (await _HighlightLibrary.isAvailableHighlight()) {
                            // alert("okay");
                        } else {
                            // alert()
                        }
                    }
                }
            }
        },

        async highlightText(color) {
            let highlightIndex = await _HighlightLibrary.highlightTextAndSave(color, this.classString, this.mSelectedText);

            let data = {
                highlightId: highlightIndex,
                highlightKey: 'add',
                highlightUrl: "maika" + location.hostname + location.pathname,
                pageType: "detail"
            }
            this.$emit('highlightEvent', data);
            this.addEventHighlightSpan(this.classString + highlightIndex)
            this.mHighlightColor = color;
            this.clearAllMenu();
            window.getSelection().removeAllRanges();
        },

        addEventHighlightSpan(className) {
            const _this = this;
            const spanElements = document.getElementsByClassName(className);
            Array.from(spanElements).forEach(function (element) {
                element.addEventListener('click', function (e) {
                    e.stopPropagation();
                    _this.showEditHighlightContextMenu(element);
                })
                element.addEventListener('mouseover', function (e) {
                    e.stopPropagation();
                    const id = this.getAttribute('id')
                    _this.hoverHighlightedSpan(true, id);
                })
                element.addEventListener('mouseleave', function (e) {
                    e.stopPropagation();
                    const id = this.getAttribute('id')
                    _this.hoverHighlightedSpan(false, id)
                })
            })
        },

        hoverHighlightedSpan(hoverState, id) {
            const spanElements = document.getElementsByClassName(this.classString + id);
            Array.from(spanElements).forEach(function (element) {
                if (hoverState) {
                    element.classList.add('highlight-hover')
                } else {
                    element.classList.remove('highlight-hover')
                }
            })
        },

        showEditHighlightContextMenu(element) {
            const id = element.getAttribute("id");
            const classList = element.className;
            this.editHighlightMenuInfo.color = this.getColorName(classList)
            this.editHighlightMenuInfo.id = id;
            if (this.mHighlightedColor == '') return;
            var top = 0, left = 0;
            do {
                top += element.offsetTop || 0;
                left += element.offsetLeft || 0;
                element = element.offsetParent;
            } while (element);
            this.isEditHighlightMenuShow = true;
            // var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            this.editHighlightMenuInfo.x = left + 'px';
            this.editHighlightMenuInfo.y = (top + 20) + 'px';
        },

        getColorName(className) {
            if (className.indexOf("highlight-yellow") != -1) {
                return "highlight-yellow";
            }
            else if (className.indexOf("highlight-green") != -1) {
                return "highlight-green";
            }
            else if (className.indexOf("highlight-lightblue") != -1) {
                return "highlight-lightblue";
            }
            return '';
        },

        clearAllMenu() {
            this.isTextSelected = false;
            this.isEditHighlightMenuShow = false;
            this.mSelectedText = '';
        },

        // ============================ load and show highlight from the DB ===================================

        async loadHighlightDB() {
            const length = await _HighlightLibrary.loadAndSetHighlightFromDB(this.classString);
            for (let i = 0; i < length; i++) {
                this.addEventHighlightSpan(this.classString + i)
            }
        },

        // ============================ change color and Remove Highlight ==============================
        // change context menu 
        async changeHighlightColor(color, id) {
            this.clearAllMenu();
            if (id == -1 || color == '') return;
            await _HighlightLibrary.changeColorHighlight(id, color);
            let data = {
                highlightId: id,
                highlightKey: 'change',
                highlightUrl: "maika" + location.hostname + location.pathname,
                pageType: 'detail'
            }
            this.$emit('highlightEvent', data);
        },

        async removeHighlight(id) {
            this.clearAllMenu();
            if (id == -1) return;
            let remainCount = await _HighlightLibrary.removeHighlightSpan(id);
            let pageType = "detail";
            if (remainCount == 0) {
                pageType = "list"
            }
            let data = {
                highlightId: id,
                highlightKey: 'remove',
                highlightUrl: "maika" + location.hostname + location.pathname,
                pageType: pageType
            }
            this.$emit('highlightEvent', data);
        }
    }
}
</script>


<template>
    <div>
        <AddHighlightMenu v-if="isTextSelected" @colorSelected="highlightText" :Pos_prop="addHighlightMenuPos"
            :Color_prop="mHighlightColor" />
        <EditHighlightMenu v-if="isEditHighlightMenuShow" @changeHighlightColor="changeHighlightColor"
            @removeHighlight="removeHighlight" :Info_prop="editHighlightMenuInfo" />
    </div>
</template>

<style scoped></style>