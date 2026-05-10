export class Item {
  SPECIAL_PRODUCTS = [
    {name: "Aged Brie", adjustment: (-1)},
    {name: "Backstage passes to a TAFKAL80ETC concert", adjustment: (-1)},
    {name: "Sulfuras, Hand of Ragnaros", adjustment: 0},
  ];

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.adjustment = this.setAdjustment(name);
  }

  setAdjustment(name) {
    if (this.SPECIAL_PRODUCTS.map((product) => product.name).includes(this.name)) {
      return this.SPECIAL_PRODUCTS.filter((product) => product.name === name)[0].adjustment;
    } else {
      return 1;
    }
  }

  decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  sellInIsBelow(days) {
    return this.sellIn < days;
  }

  adjustQuality() {
    if (this.validQuality(this.adjustment)) {
      this.quality = this.quality - this.adjustment;
    }
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

  validQuality(adjustment) {
    const adjustedQuality = this.quality - adjustment;
    return adjustedQuality <= 50 && adjustedQuality >= 0;
  }

  qualityCanIncrease() {
    return this.quality < 50;
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
