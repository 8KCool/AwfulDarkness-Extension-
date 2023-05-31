const _storeHighligh = {
    saveRangeIntoDB: async function (saveData, url) {
        const { highlights } = await chrome.storage.local.get({ highlights: {} });
        if (!highlights[url]) highlights[url] = [];
        const count = highlights[url].push(saveData)
        await chrome.storage.local.set({ highlights });
        return count - 1;
    },

    loadAll: async function (url) {
        const result = await chrome.storage.local.get({ highlights: {} });
        let highlights = [];
        highlights = highlights.concat(result.highlights[url] || []);
        return highlights;
    },

    loadAllbyAllWebpages: async function () {
        const result = await chrome.storage.local.get({ highlights: {} });
        return result;
    },

    getDomain: function (url) {

        url = url.replace(/(https?:\/\/)?(www.)?/i, '');

        if (url.indexOf('/') !== -1) {
            return url.split('/')[0];
        }

        return url;
    },

    getThumbImage: function () {
        var images = document.images;

        // Filter images based on size
        var filteredImages = Array.from(images).filter(function (image) {
            return image.width >= 50 && image.height >= 50;
        });

        // Extract image URLs
        var imageUrls = filteredImages.map(function (image) {
            return image.src;
        });

        return imageUrls;
    },

    changeColor: async function (url, id, color) {
        const { highlights } = await chrome.storage.local.get({ highlights: {} });
        if (!highlights[url]) highlights[url] = [];
        highlights[url][id]['highlightName'] = color;
        await chrome.storage.local.set({ highlights });
    },

    deleteHighlightById: async function (url, id) {
        var returnCount = 0;
        const { highlights } = await chrome.storage.local.get({ highlights: {} });
        if (!highlights[url]) highlights[url] = [];
        if (highlights[url].length >= id) {
            highlights[url].splice(id, 1);
        }
        returnCount = highlights[url].length;
        if (highlights[url].length == 0) {
            delete highlights[url];
        }
        await chrome.storage.local.set({ highlights });
        return returnCount;
    },


    deleteHighlightByUrl: async function (url) {
        if(url) {
            const { highlights } = await chrome.storage.local.get({ highlights: {} });
            delete highlights[url];
            await chrome.storage.local.set({ highlights });
        }
    }
}

export { _storeHighligh }