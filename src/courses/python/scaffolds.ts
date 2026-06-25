/*
 * Andamiajes (código incompleto y comentado) para las ACTIVIDADES LARGAS del
 * curso de Python: las misiones (una por periodo) y algunos retos extensos. Son
 * una estructura ya empezada con comentarios `# TODO` indicando lo que falta,
 * para que el estudiante no parta de una hoja en blanco. Las actividades cortas
 * (ejercicios y retos simples) conservan solo un comentario con el enunciado.
 *
 * `lessonTasks` los usa como "código base" del editor. Las claves de retos
 * siguen el id que arma lessonTasks: `p{periodo}s{sesion}-reto{n}`.
 */

/** Andamiaje de la misión final de cada periodo (clave = número de periodo). */
export const misionScaffolds: Record<number, string> = {
  1: `# 🚀 Misión: Tarjeta de Presentación Digital
# Completa los print() para armar tu tarjeta.

print("*" * 28)                 # borde de arriba
print("MI TARJETA")
# TODO: imprime tu nombre
# TODO: imprime tu edad
# TODO: imprime tu hobby favorito
# TODO: imprime una frase que te represente
print("*" * 28)                 # borde de abajo
`,
  2: `# 🚀 Misión: Generador de Perfil Gamer
# Pide los datos y arma la ficha del perfil.

nick = input("¿Cuál es tu nick? ")
# TODO: pregunta el juego favorito y guárdalo en una variable
horas = int(input("¿Cuántas horas has jugado? "))   # recuerda int()

print("===== PERFIL GAMER =====")
print("Nick:", nick)
# TODO: muestra el juego favorito
print("Horas jugadas:", horas)
# TODO (extra): muestra un rango según las horas (Novato / Pro)
`,
  3: `# 🚀 Misión: Calculadora Inteligente
# Pide dos números y muestra todas las operaciones.

a = int(input("Primer número: "))
b = int(input("Segundo número: "))

print("Suma:", a + b)
# TODO: resta (a - b)
# TODO: multiplicación (a * b)
# TODO: potencia (a ** b)
# TODO: módulo (a % b)
# TODO: división, pero primero revisa que b no sea 0
`,
  4: `# 🚀 Misión: ¿Qué superhéroe eres?
# Haz preguntas, suma puntos y decide el héroe.

puntos = 0

r1 = input("¿Prefieres volar (a) o ser fuerte (b)? ")
if r1 == "a":
    puntos = puntos + 1
# TODO: agrega 2 preguntas más que sumen puntos

# Decide el héroe según los puntos
if puntos >= 2:
    print("¡Eres Superman!")
# TODO: usa elif para otro héroe
else:
    print("¡Eres Batman!")
`,
  5: `# 🚀 Misión: Generador de Patrones y Tablas
# Pide un tamaño y dibuja el patrón con un bucle.

altura = int(input("Altura de la pirámide: "))

for i in range(1, altura + 1):
    # TODO: imprime i asteriscos en esta fila (pista: "*" * i)
    pass

# TODO (extra): pide un número y muestra su tabla de multiplicar
`,
  6: `# 🚀 Misión: Lista de Mis Videojuegos Favoritos
# Menú para agregar, ver y eliminar juegos.

juegos = []
opcion = ""

while opcion != "4":
    print("1) Agregar   2) Ver   3) Eliminar   4) Salir")
    opcion = input("Elige una opción: ")

    if opcion == "1":
        juego = input("Nombre del juego: ")
        # TODO: agrega el juego con juegos.append(...)
    elif opcion == "2":
        # TODO: recorre la lista y muestra cada juego
        pass
    # TODO: opción "3" para eliminar un juego con remove()
`,
  7: `# 🚀 Misión: Centro de Herramientas Matemáticas
# Cada herramienta es una función; el menú las llama.

def area_rectangulo(base, altura):
    # TODO: devuelve el área (base * altura)
    return 0

def es_par(n):
    # TODO: devuelve True si n es par, False si no
    pass

# TODO: crea al menos una herramienta más (otra función)

print("1) Área   2) ¿Par o impar?")
opcion = input("¿Qué herramienta quieres? ")
# TODO: según la opción, pide los datos y llama a la función
`,
  8: `# 🚀 Misión: Piedra, Papel o Tijera
import random

opciones = ["piedra", "papel", "tijera"]
mi_punto = 0
compu_punto = 0

jugador = input("piedra, papel o tijera: ")
maquina = random.choice(opciones)
print("La máquina eligió:", maquina)

# Reglas: piedra > tijera, tijera > papel, papel > piedra
# TODO: decide quién gana esta ronda con if / elif / else
# TODO: lleva el marcador y repite con un bucle (al mejor de 3)
`,
  9: `# 🚀 Misión: Trivia de Preguntas y Respuestas

preguntas = [
    "¿Capital de Francia? ",
    # TODO: agrega más preguntas
]
respuestas = [
    "paris",
    # TODO: agrega las respuestas EN EL MISMO ORDEN
]

puntos = 0
for i in range(len(preguntas)):
    r = input(preguntas[i])
    # TODO: si r.lower() es igual a respuestas[i], suma un punto

print("Tu puntaje:", puntos, "de", len(preguntas))
`,
  10: `# 🚀 Proyecto Final — ¡tu programa!
# Organiza tu proyecto en funciones.

def inicio():
    # TODO: muestra el título y las instrucciones
    pass

def principal():
    # TODO: aquí va la parte principal de tu proyecto
    pass

def main():
    inicio()
    principal()

main()
`,
};

/** Andamiaje de algunos retos largos (clave = id del reto en lessonTasks). */
export const retoScaffolds: Record<string, string> = {
  "p4s3-reto4": `# 🏅 Reto: Calculadora con menú
a = int(input("Primer número: "))
b = int(input("Segundo número: "))
op = input("Operación (+, -, *, /): ")

if op == "+":
    print(a + b)
# TODO: usa elif para -, * y /
else:
    print("Operación no válida")
`,
  "p8s2-reto1": `# 🏅 Reto: Adivina el número
import random

secreto = random.randint(1, 20)
intento = 0

while intento != secreto:
    intento = int(input("Adivina (1 a 20): "))
    # TODO: da una pista -> si intento < secreto di "más alto", si no "más bajo"

print("¡Correcto! Era", secreto)
`,
  "p8s3-reto4": `# 🏅 Reto: Ahorcado fácil
palabra = "python"
adivinadas = []
intentos = 6

while intentos > 0:
    # Muestra la palabra con _ en las letras que aún no se adivinan
    for letra in palabra:
        if letra in adivinadas:
            print(letra, end="")
        else:
            print("_", end="")
    print()

    letra = input("Una letra: ")
    # TODO: si la letra está en la palabra, agrégala a 'adivinadas'
    # TODO: si NO está, resta 1 a 'intentos'
    # TODO: si ya se adivinaron todas las letras, muestra victoria y termina
`,
};
