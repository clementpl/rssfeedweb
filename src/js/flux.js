let ajax = require('./ajax');
let host = require('./host');

module.exports = class Flux {
    constructor(id) {
        this.dom = $('#content');
        this.dom.html('');
        ajax.getFlux(id, (xml) => {
            this.xml = xml;
            this.renderFlux();
        });
    }

    renderFlux() {
        let items = this.getItems();
        this.dom.append(`<img src=${this.getImage()} class="page-header"/>`);
        for (let i=0; i<items.length; i++) {
            let item = items[i];
            this.dom.append(
                `<div class="row placeholders">
                    <div class="col-xs-10 placeholder">
                        <h4>${item.title}</h4>
                        <span class="text-muted">${item.description}</span>
                        <a target="_blank" href=${item.link}>Lire l'article</a>
                    </div>
                </div>`);
        }
    }

    getTitle() {
        if (!this.title)
            this.title = this.xml.querySelector('title').textContent;
        return this.title;
    }

    getImage() {
        if (!this.image)
            this.image = this.xml.querySelector('image url').textContent;
        return this.image;
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
                    enclosure: items[i].querySelector('enclosure').getAttribute('url'),
                });
            }
        }
        return this.items;
    }
}
