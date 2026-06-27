import { describe, it, expect } from "vitest";
import {
  ENERGIA_POR_LECCION,
  estadoMascota,
  monedasPorNota,
  puedeComprar,
  type Comida,
  type Mascota,
} from "./pet";

describe("mascota", () => {
  it("clasifica la energía en los cuatro estados", () => {
    expect(estadoMascota(100).key).toBe("feliz");
    expect(estadoMascota(67).key).toBe("feliz");
    expect(estadoMascota(66).key).toBe("hambre");
    expect(estadoMascota(34).key).toBe("hambre");
    expect(estadoMascota(33).key).toBe("critica");
    expect(estadoMascota(1).key).toBe("critica");
    expect(estadoMascota(0).key).toBe("muerta");
  });

  it("tres lecciones sin alimentar dejan la mascota muerta", () => {
    let energia = 100;
    for (let i = 0; i < 3; i++)
      energia = Math.max(0, energia - ENERGIA_POR_LECCION);
    expect(estadoMascota(energia).key).toBe("muerta");
  });

  it("convierte la nota en monedas (nota / 10)", () => {
    expect(monedasPorNota(100)).toBe(10);
    expect(monedasPorNota(95)).toBe(9);
    expect(monedasPorNota(60)).toBe(6);
    expect(monedasPorNota(0)).toBe(0);
    expect(monedasPorNota(150)).toBe(10); // se acota a 100
  });

  it("solo permite comprar si alcanzan las monedas", () => {
    const mascota: Mascota = { nombre: "Pixel", energia: 50, monedas: 6 };
    const barata: Comida = {
      id: "manzana",
      nombre: "Manzana",
      emoji: "🍎",
      costo: 3,
      energia: 20,
    };
    const cara: Comida = {
      id: "pastel",
      nombre: "Pastel",
      emoji: "🎂",
      costo: 15,
      energia: 100,
    };
    expect(puedeComprar(mascota, barata)).toBe(true);
    expect(puedeComprar(mascota, cara)).toBe(false);
  });
});
