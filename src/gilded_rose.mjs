export class Item {
  SPECIAL_PRODUCTS = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"];

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.adjustment = 1;
  }

  decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  sellInIsBelow(days) {
    return this.sellIn < days;
  }

  decreaseQuality(decrement) {
    if (this.qualityCanDecrease()) {
      this.quality = this.quality - this.adjustment;
    }
  }

  increaseQuality(increment) {
    if (this.qualityCanIncrease()) {
      this.quality = this.quality + increment;
    }
  }

  emptyQuality() {
    this.quality = 0;
  }

  qualityCanDecrease() {
    return this.quality > 0;
  }

  qualityCanIncrease() {
    return this.quality < 50;
  }

  isNormalProduct() {
    return !this.SPECIAL_PRODUCTS.includes(this.name);
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.isNormalProduct()) {
          item.decreaseQuality();
      } else {
        item.increaseQuality(1);
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellInIsBelow(11)) {
            item.increaseQuality(1);
          }
          if (item.sellInIsBelow(6)) {
            item.increaseQuality(1);
          }
        }
      }
      if (item.name != "Sulfuras, Hand of Ragnaros") {
        item.decreaseSellIn();
      }
      if (item.sellInIsBelow(0)) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (item.name != "Sulfuras, Hand of Ragnaros") {
              item.decreaseQuality();
            }
          } else {
            item.emptyQuality();
          }
        } else {
          item.increaseQuality(1);
        }
      }
    })

    return this.items;
  }
}
