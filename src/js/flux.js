let ajax = require("./ajax");

module.exports = class Flux {
    constructor(url, ready) {
        ajax.get(url, (xml) => {
            this.xml = xml;
            ready();
        });
    }

    getTitle() {
        if (!this.title)
            this.title = this.xml.querySelector('title').textContent;
        return this.title;
    }

    getItems() {
        if (!this.items) {
            this.items = [];
            let items = this.xml.getElementsByTagName('item');
            for (let i = 0; i < items.length; i++) {
                this.items.push({
                    link: items[i].querySelector('link').textContent,
                    title: items[i].querySelector('title').textContent,
                    description: items[i].querySelector('description').textContent,
                    pubDate: items[i].querySelector('pubDate').textContent,
                    enclosure: items[i].querySelector('enclosure').getAttribute('url')
                });
            }
        }
        return this.items;
    }
}
