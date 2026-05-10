export class Item {
  SPECIAL_PRODUCTS = [
    { name: "Aged Brie", quality: -1, sellIn: 1 },
    { name: "Backstage passes to a TAFKAL80ETC concert", quality: -1, sellIn: 1 },
    { name: "Sulfuras, Hand of Ragnaros", quality: 0, sellIn: 0 },
  ];

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.adjustments = this.determineAdjustments(name);
  }

  determineAdjustments(name) {
    if (!this.isNormalProduct()) {
      const product = this.SPECIAL_PRODUCTS.filter((product) => product.name === name)[0]
      return { quality: product.quality, sellIn: product.sellIn }
    } else {
      return { quality: 1, sellIn: 1 };
    }
  }

  checkAdjustments() {
    if (this.sellInIsBelow(0)) {
      const sign = Math.sign(this.adjustments.quality);
      this.adjustments.quality = 2 * sign;
    }

    if (this.sellInIsBelow(11) && this.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.adjustments.quality = -2;
    }

    if (this.sellInIsBelow(6) && this.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.adjustments.quality = -3;
    }

    if (this.sellInIsBelow(0) && this.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.adjustments.quality = 0;
      this.emptyQuality();
    }
  }

  adjustSellIn() {
    this.sellIn = this.sellIn - this.adjustments.sellIn;
  }

  sellInIsBelow(days) {
    return this.sellIn < days;
  }

  adjustQuality() {
    let timesToAdjust = Math.abs(this.adjustments.quality);
    const adjustment = this.adjustments.quality !== 0 ? this.adjustments.quality / timesToAdjust : 0;
    if (this.name.includes("Conjured")) {
      timesToAdjust = timesToAdjust * 2;
    }
    for (let adjusted = 0; adjusted < timesToAdjust; adjusted++) {
      if (this.validQuality(adjustment)) {
        this.quality = this.quality - adjustment;
      }
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
      item.checkAdjustments();
      item.adjustQuality();
      item.adjustSellIn();
    });

    return this.items;
  }
}
