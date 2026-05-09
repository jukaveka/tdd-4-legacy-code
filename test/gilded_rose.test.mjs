import { describe, test } from "vitest";
import { expect } from "chai";
import { Item, Shop } from "../src/gilded_rose.mjs";

describe("Gilded Rose", () => {
  test("foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  test("backstage pass", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Backstage passes to a TAFKAL80ETC concert");
  });

  test("aged brie", () => {
    const gildedRose = new Shop([new Item("aged brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("aged brie");
  });

  test("aged brie & sellIn < 0", () => {
    const gildedRose = new Shop([new Item("aged brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
  });
});
