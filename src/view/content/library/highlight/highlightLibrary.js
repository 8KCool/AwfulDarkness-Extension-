
import { _highlightScript } from '@/view/content/library/highlight/highlightScript.js'
import { _xpath } from '@/view/content/library/highlight/xpath.js'
import { _storeHighligh } from '@/view/content/library/highlight/store.js'


const _HighlightLibrary = {
    checkSelectedText: function (text) {
        return !(text === null || text.match(/^ *$/) !== null);
    },

    // flag: 0: click the button, flag 1: from the DB
    highlightTextAndSave: async function (color, classStr, selectedText) {
        if (color == '') return;

        let xpathRange = _xpath.createXPathRangeFromRange(_highlightScript.getSelectionRange())
        if (xpathRange && !xpathRange.collapsed) {

            const url = "maika" + location.hostname + location.pathname;

            let domainName = _storeHighligh.getDomain(location.hostname);
            if (domainName == '') {
                domainName = 'localhost'
            }
            const images = _storeHighligh.getThumbImage();
            let thumbURL = "";
            if (images.length > 0) {
                thumbURL = images[0];
            }

            const saveData = {
                url: url,
                xpathRange: xpathRange,
                highlightName: color,
                domainName: domainName,
                pageTitle: document.title,
                thumbURL: thumbURL,
                selectedText: selectedText
            }
            
            

            const highlightIndex = await _storeHighligh.saveRangeIntoDB(saveData, url);
            await _highlightScript.createHighlight(xpathRange, highlightIndex, classStr, color)
            return highlightIndex;
        }
        return -1;
    },

    async loadAndSetHighlightFromDB(classStr) {
        let highlights = await _storeHighligh.loadAll("maika" + location.hostname + location.pathname);
        if (!highlights) return;
        for (let i = 0; i < highlights.length; i++) {
            console.log(highlights[i]['xpathRange']);
            await _highlightScript.createHighlight(highlights[i]['xpathRange'], i, classStr, highlights[i]['highlightName'])
        }
        return highlights.length
    },

    async loadAllHighlightFromDB() {
        let highlights = await _storeHighligh.loadAllbyAllWebpages();
        return highlights;
    },

    async isAvailableHighlight() {
        let xpathRange = _xpath.createXPathRangeFromRange(_highlightScript.getSelectionRange())
        console.log(xpathRange);
        const range = _xpath.createRangeFromXPathRange(xpathRange);
        if (range)
            return true;
        else return false
    },

    async changeColorHighlight(id, color) {
        if (_highlightScript.updateHighlight(id, color)) {
            await _storeHighligh.changeColor("maika" + location.hostname + location.pathname, id, color);
        }
    },

    async removeHighlightSpan(id) {
        if (_highlightScript.deleteHighlight(id)) {
            return await _storeHighligh.deleteHighlightById("maika" + location.hostname + location.pathname, id);
        }
    },

    async removeHighlightGroup(url) {
        await _storeHighligh.deleteHighlightByUrl(url);
    }
}

export { _HighlightLibrary }