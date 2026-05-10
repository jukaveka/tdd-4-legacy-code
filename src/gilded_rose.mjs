export class Item {
  SPECIAL_PRODUCTS = [
    {name: "Aged Brie", quality: (-1), sellIn: 1},
    {name: "Backstage passes to a TAFKAL80ETC concert", quality: (-1), sellIn: 1},
    {name: "Sulfuras, Hand of Ragnaros", quality: 0, sellIn: 0},
  ];

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.adjustments = this.determineAdjustments(name);
  }

  determineAdjustments(name) {
    if (this.SPECIAL_PRODUCTS.map((product) => product.name).includes(this.name)) {
      return this.SPECIAL_PRODUCTS.filter((product) => product.name === name).map((product) => {return {quality: product.quality, sellIn: product.sellIn}})[0];
    } else {
      return {quality: 1, sellIn: 1};
    }
  }

  decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  sellInIsBelow(days) {
    return this.sellIn < days;
  }

  adjustQuality() {
    if (this.validQuality(this.adjustments.quality)) {
      this.quality = this.quality - this.adjustments.quality;
    }
  }

  emptyQuality() {
    this.quality = 0;
  }

  validQuality(adjustment) {
    const adjustedQuality = this.quality - adjustment;
    return adjustedQuality <= 50 && adjustedQuality >= 0;
  }

  isNormalProduct() {
    return !this.SPECIAL_PRODUCTS.map((product) => product.name).includes(this.name);
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.isNormalProduct()) {
          item.adjustQuality();
      } else {
        item.adjustQuality();
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellInIsBelow(11)) {
            item.adjustQuality();
          }
          if (item.sellInIsBelow(6)) {
            item.adjustQuality();
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
              item.adjustQuality();
            }
          } else {
            item.emptyQuality();
          }
        } else {
          item.adjustQuality();
        }
      }
    })

    return this.items;
  }
}
