export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  sellInIsBelow(days) {
    return this.sellIn < days;
  }

  decreaseQuality(decrement) {
    if (this.qualityCanDecrease()) {
      this.quality = this.quality - decrement;
    }
  }

  increaseQuality(increment) {
    if (this.qualityCanIncrease()) {
      this.quality = this.quality + increment;
    }
  }

  qualityCanDecrease() {
    return this.quality > 0;
  }

  qualityCanIncrease() {
    return this.quality < 50;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.name != "Aged Brie" && item.name != "Backstage passes to a TAFKAL80ETC concert") {
          if (item.name != "Sulfuras, Hand of Ragnaros") {
            item.decreaseQuality(1);
        }
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
              item.decreaseQuality(1);
            }
          } else {
            item.decreaseQuality(item.quality);
          }
        } else {
          item.increaseQuality(1);
        }
      }
    })

    return this.items;
  }
}
