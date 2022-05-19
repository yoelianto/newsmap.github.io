
export function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export function truncText(text, length = 100) {
    return text !== null && text.length > length ? text.substring(0, length) + '...' : text;
}

export function formatNumber(dt) {
    let number;
    if (dt !== null && dt !== undefined) {
        number = dt.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return number;
}

export function fixSpotifyLink(link) {
    if (link.length > 0 && !link.includes('embed-podcast')) {
        link = link.replace("spotify.com", "spotify.com/embed-podcast")
    }

    return link;
}

export function youtubeId(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

export function fixYoutubeLink(link) {
    if (link !== undefined) {
        return link.length > 0 && link.includes('embed') ? null : `https://www.youtube.com/embed/${youtubeId(link)}`
    }

    return null;
}

export function stringToDom(text) {
    if (text !== null && text.length > 0) {
        text = text.replace(/\n/g, "<br />");

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        return doc.body.innerText;
    }
}

export function localStore(key, data, type = 'get') {
    switch (type) {
        case 'get':
            let dt = localStorage.getItem(key);
            return dt ? dt : '';
        case 'set':
            localStorage.setItem(key, data);
            break;
        case 'remove':
            localStorage.removeItem(key);
            break;
        case 'clear':
            localStorage.clear();
            break;
        default:
    }
}