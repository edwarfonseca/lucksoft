import { describe, it, expect } from "vitest";
import { bytesToBase64, base64ToBytes } from "./base64";

describe("base64", () => {
  it("ida y vuelta conserva los bytes (incl. 0 y 255)", () => {
    const original = new Uint8Array([0, 1, 2, 65, 200, 255]);
    const roundtrip = base64ToBytes(bytesToBase64(original));
    expect(Array.from(roundtrip)).toEqual(Array.from(original));
  });

  it("base64ToBytes devuelve un Uint8Array", () => {
    expect(base64ToBytes(bytesToBase64(new Uint8Array([1])))).toBeInstanceOf(
      Uint8Array,
    );
  });

  it("maneja datos vacíos", () => {
    expect(base64ToBytes(bytesToBase64(new Uint8Array([])))).toHaveLength(0);
  });
});
