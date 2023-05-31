
import { _xpath } from '@/view/content/library/highlight/xpath.js'
import { _highlighter } from '@/view/content/library/highlight/highlighter.js'

var _highlightScript = {
    highlightClassName: "highlight-span",
    isSelectionCollapsed: function () {
        return window.getSelection().isCollapsed;
    },

    getSelectionRange: function () {
      
        var selection = window.getSelection();
        var range;

        if (selection.isCollapsed) {
            // a fake range
            range = new Range();
            range.collapse(false);
        } else {
            range = selection.getRangeAt(0);
        }

        return range;
    },
    createHighlight: function (xpathRange, id, mainClassName, className) {
      
        var range;
        _highlightScript.highlightClassName = mainClassName + id
        // this is likely to cause exception when the underlying DOM has changed
        try {
            range = _xpath.createRangeFromXPathRange(xpathRange);
        } catch (err) {
            console.log("Exception parsing xpath range: " + err.message);
            return null;
        }

        if (!range) {
            console.log("error parsing xpathRange: " + xpathRange);
            return null;
        }

        // create span(s), with 2 class names
        return _highlighter.create(range, id, [
            _highlightScript.highlightClassName,
            className
        ]);
    },
    deleteHighlight: function (id) {
      
        return _highlighter.del(id);
    },
    selectHighlight: function (id) {
      
        var selection = window.getSelection();

        selection.removeAllRanges();

        if (id) {
            var range = _highlighter.getRange(id);
            selection.addRange(range);

            return range;
        }
    },

    /**
     * Check whether a highlight with this id is on the page
     * @param {string} id
     * @return {boolean} true if on page
     */
    isHighlightInDOM: function (id) {
      
        return document.querySelector('#' + id).length === 1;
    },

    /**
     * Update the class name for all the spans of a highlight
     * @param id existing highlight id
     * @param className class name to replace
     */
    updateHighlight: function (id, className) {
        // remember to also include the shared highlights class name
      
        return _highlighter.update(id, [_highlightScript.highlightClassName, className]);
    },

    // scrollTo: function (selector) {
    //   
    //     var $elm = $(selector);
    //     if ($elm) {
    //         $('body').animate({
    //             'scrollTop': $elm.offset().top
    //         }, 'slow');
    //     }

    //     return $elm !== null;
    // },
    _getHighlightId: function (element) {
      
        // even if the first span sets the firstSpan property to itself
        if (!element.firstSpan) {
            // unusual
            return;
        }

        return element.firstSpan.id;
    },
}
export { _highlightScript }