export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  decreaseQuality(decrement) {
    this.quality = this.quality - decrement;
  }

  increaseQuality(increment) {
    this.quality = this.quality + increment;
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
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != "Aged Brie" && this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
        if (this.items[i].qualityCanDecrease()) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].decreaseQuality(1);
          }
        }
      } else {
        if (this.items[i].qualityCanIncrease()) {
          this.items[i].increaseQuality(1);
          if (this.items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].qualityCanIncrease()) {
                this.items[i].increaseQuality(1);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].qualityCanIncrease()) {
                this.items[i].increaseQuality(1);
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].decreaseSellIn();
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (this.items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
            if (this.items[i].qualityCanDecrease()) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].decreaseQuality(1);
              }
            }
          } else {
            this.items[i].decreaseQuality(this.items[i].quality);
          }
        } else {
          if (this.items[i].qualityCanIncrease()) {
            this.items[i].increaseQuality(1);
          }
        }
      }
    }

    return this.items;
  }
}
