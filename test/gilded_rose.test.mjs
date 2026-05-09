import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("returns an array", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items).to.be.a("array");
  });

  test("quality decreases by 1", () => {
    const gildedRose = new Shop([new Item("foo", 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("sellIn decreases by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });

  test("backstage pass increases with sellIn date left", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(12);
  });

  test("backstage pass loses value past sellIn date", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  });

  test("aged brie", () => {
    const gildedRose = new Shop([new Item("aged brie", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  });
});
