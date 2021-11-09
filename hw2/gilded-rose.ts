class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const enum ItemType {
    Concert,
    Drink,
    Sulfuras,
    Conjured,
    Common
}

class InfoItem {
    item: Item;
    itemType: ItemType;

     constructor(item: Item, itemType: ItemType) {
        this.item = item;
        this.itemType = itemType;
    }
}

const CONCERT_NAME = 'Backstage passes to a TAFKAL80ETC concert'
const DRINK_NAME = 'Aged Brie'
const SULFURAS_NAME = 'Sulfuras, Hand of Ragnaros'
const CONJURED_NAME = 'Conjured'
const MAX_QUALITY = 50
const MIN_QUALITY = 0
const FIRST_PHASE = 10
const SECOND_PHASE = 5

class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    mapToInfoItem(item: Item) {
        return new InfoItem(item, this.resolveItemType(item))
    }

    resolveItemType(item: Item) {
        if (item.name.indexOf(CONJURED_NAME) !== -1) {
            return ItemType.Conjured;
        }
        switch(item.name) {
            case CONCERT_NAME: {
                return ItemType.Concert;
            }
            case DRINK_NAME: {
                return ItemType.Drink;
            }
            case SULFURAS_NAME: {
                return ItemType.Sulfuras;
            }
            default: {
                return ItemType.Common;
            }
        }
    }

    increaseQuality(item: Item) {
        if (item.quality < MAX_QUALITY) {
            item.quality++
        }
    }

    decreaseQuality(item: Item) {
        if (item.quality > MIN_QUALITY) {
            item.quality--
        }
    }

    updateConcert(item: Item) {
        if (item.quality == MAX_QUALITY) {
            return;
        }
        if (item.sellIn <= 0) {
            item.quality = 0
        } else if (item.sellIn <= SECOND_PHASE) {
            this.increaseQuality(item)
            this.increaseQuality(item)
            this.increaseQuality(item)
        } else if (item.sellIn <= FIRST_PHASE) {
            this.increaseQuality(item)
            this.increaseQuality(item)
        } else {
            this.increaseQuality(item)
        }
    }

    updateDrink(item: Item) {
        this.increaseQuality(item)
    }

    updateConjured(item: Item) {
        if (item.quality == MIN_QUALITY) {
            return;
        }
        this.decreaseQuality(item)
        this.decreaseQuality(item)
        if (item.sellIn <= 0) {
            this.decreaseQuality(item)
            this.decreaseQuality(item)
        }
    }

    updateCommon(item: Item) {
        if (item.quality == MIN_QUALITY) {
            return;
        }
        this.decreaseQuality(item)
        if (item.sellIn <= 0) {
            this.decreaseQuality(item)
        }
    }

    updateInfoItem(infoItem: InfoItem) {
        infoItem.item.sellIn--;

        switch (infoItem.itemType) {
            case ItemType.Concert: {
                this.updateConcert(infoItem.item);
                break;
            }
            case ItemType.Drink: {
                this.updateDrink(infoItem.item);
                break;
            }
            case ItemType.Sulfuras: {
                break;
            }
            case ItemType.Conjured: {
                this.updateConjured(infoItem.item);
                break;
            }
            case ItemType.Common: {
                this.updateCommon(infoItem.item);
                break;
            }
        }
    }

    updateQuality() {
        this.items
            .map(element => this.mapToInfoItem(element))
            .forEach(infoItem => this.updateInfoItem(infoItem));
        return this.items;
    }
}
