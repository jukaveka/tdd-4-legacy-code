import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("returns an array", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items).to.be.a("array");
  });

  test("returns empty array with no items", () => {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).to.be.a("array").and.to.be.empty;
  });

  test("quality decreases by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  });

  test("quality decreases by 2 past sellIn date", () => {
    const gildedRose = new Shop([new Item("foo", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });

  test("quality doesn't decrease past 0 after sellIn date", () => {
    const gildedRose = new Shop([new Item("foo", -1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("sellIn decreases by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  test("quality doesn't decrease if past 0", () => {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("backstage pass increases with sellIn date left", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  test("backstage pass quality increases 2 with 10 or less days to sell", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  test("backstage pass quality doesn't increase past 50 with 10 or less days to sell", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("backstage pass quality increases 3 with 5 or less days to sell", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(13);
  });

  test("backstage pass quality doesn't increase past 50 with 5 or less days to sell", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("backstage pass loses value past sellIn date", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("backstage pass quality doesn't increase above 50", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("aged brie increases in quality", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(11);
  });

  test("aged brie increases 2 in quality past sellIn date", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  test("aged brie doesn't increase past 50 in quality", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("aged brie doesn't increase beyond 50 past sellIn date", () => {
    const gildedRose = new Shop([new Item("Aged Brie", -1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  });

  test("Sulfuras doesn't lose quality", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });

  test("Sulfuras doesn't lose quality past sellIn date", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
  });

  test("Sulfuras sellIn doesn't decrease", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 5, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(5);
  });

  test("Conjured item quality decreases by 2", () => {
    const gildedRose = new Shop([new Item("Conjured", 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(8);
  })
});
