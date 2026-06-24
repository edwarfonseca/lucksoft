# Implementación de "turtle" para LuckSoft sobre Pyodide.
# El turtle estándar usa Tkinter (no existe en el navegador), así que aquí
# reproducimos su API más usada y, en vez de dibujar en una ventana, generamos
# un SVG que la app muestra en el panel de vista previa.
import math

# ---- Estado del "screen" (módulo) ----
_WIDTH = 400
_HEIGHT = 400
_BG = "white"
_cmds = []  # comandos de dibujo EN ORDEN (para animar el avance en el canvas)
_turtles = []  # tortugas creadas (para dibujar su figura/cursor al final)
_drew = False
_default = None
_MAX = 60000  # tope de segmentos para no agotar memoria

# Polígonos de cada forma, apuntando al norte (+y); se rotan según el rumbo.
_SHAPES = {
    "classic": [(0, 0), (-5, -9), (0, -7), (5, -9)],
    "arrow": [(-10, 0), (10, 0), (0, 10)],
    "triangle": [(10, -5.77), (0, 11.55), (-10, -5.77)],
    "square": [(10, -10), (10, 10), (-10, 10), (-10, -10)],
    "turtle": [
        (0, 16), (-2, 14), (-1, 10), (-4, 7), (-7, 9), (-9, 8), (-6, 5),
        (-7, 1), (-5, -3), (-8, -6), (-6, -8), (-4, -5), (0, -7), (4, -5),
        (6, -8), (8, -6), (5, -3), (7, 1), (6, 5), (9, 8), (7, 9), (4, 7),
        (1, 10), (2, 14),
    ],
    "circle": [
        (10.0 * math.cos(math.radians(a)), 10.0 * math.sin(math.radians(a)))
        for a in range(0, 360, 30)
    ],
}


def _lucksoft_reset():
    global _WIDTH, _HEIGHT, _BG, _cmds, _turtles, _drew, _default
    _WIDTH = 400
    _HEIGHT = 400
    _BG = "white"
    _cmds = []
    _turtles = []
    _drew = False
    _default = None


def _xy(x, y):
    # Coordenadas centradas en el origen (0,0 = home); y hacia abajo (canvas).
    # El canvas de la app coloca el origen en su centro y aplica la escala.
    return (x, -y)


def _esc(s):
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _rgb(c):
    r, g, b = c[0], c[1], c[2]
    if all(isinstance(v, float) and 0.0 <= v <= 1.0 for v in (r, g, b)):
        r, g, b = r * 255, g * 255, b * 255
    return "rgb(%d,%d,%d)" % (int(r), int(g), int(b))


def _color(a):
    if len(a) == 1:
        c = a[0]
        if isinstance(c, (tuple, list)):
            return _rgb(c)
        return str(c)
    if len(a) >= 3:
        return _rgb(a)
    return "black"


class Turtle:
    def __init__(self, *a, **k):
        global _drew
        self._x = 0.0
        self._y = 0.0
        self._h = 0.0
        self._down = True
        self._pc = "black"
        self._fc = "black"
        self._w = 1.0
        self._visible = True
        self._filling = False
        self._fillpts = []
        self._shapename = "classic"
        self._speed = 3
        # Crear una tortuga ya hace que el lienzo aparezca (como en turtle real)
        # y se registra para dibujar su figura/cursor al final.
        _drew = True
        _turtles.append(self)

    # --- dibujo interno ---
    def _line(self, x1, y1, x2, y2):
        global _drew
        _drew = True
        if len(_cmds) < _MAX:
            a = _xy(x1, y1)
            b = _xy(x2, y2)
            _cmds.append(
                {
                    "t": "l",
                    "x1": a[0],
                    "y1": a[1],
                    "x2": b[0],
                    "y2": b[1],
                    "c": self._pc,
                    "w": self._w,
                    "s": self._speed,
                }
            )

    def _moveto(self, x, y, draw=True):
        if self._down and draw:
            self._line(self._x, self._y, x, y)
        if self._filling:
            self._fillpts.append(_xy(x, y))
        self._x = x
        self._y = y

    # --- movimiento ---
    def forward(self, d):
        r = math.radians(self._h)
        self._moveto(self._x + d * math.cos(r), self._y + d * math.sin(r))

    fd = forward

    def backward(self, d):
        self.forward(-d)

    back = backward
    bk = backward

    def right(self, a):
        self._h = (self._h - a) % 360

    rt = right

    def left(self, a):
        self._h = (self._h + a) % 360

    lt = left

    def goto(self, x, y=None):
        if y is None:
            x, y = x
        self._moveto(float(x), float(y))

    setpos = goto
    setposition = goto

    def setx(self, x):
        self._moveto(float(x), self._y)

    def sety(self, y):
        self._moveto(self._x, float(y))

    def setheading(self, a):
        self._h = float(a) % 360

    seth = setheading

    def home(self):
        self._moveto(0.0, 0.0)
        self._h = 0.0

    def circle(self, radius, extent=None, steps=None):
        if extent is None:
            extent = 360
        if steps is None:
            frac = abs(extent) / 360.0
            steps = 1 + int(min(11.0 + abs(radius) / 6.0, 59.0) * frac)
        w = 1.0 * extent / steps
        w2 = 0.5 * w
        length = 2.0 * radius * math.sin(math.radians(w2))
        if radius < 0:
            length, w, w2 = -length, -w, -w2
        self.left(w2)
        for _ in range(steps):
            self.forward(length)
            self.left(w)
        self.left(-w2)

    # --- lápiz ---
    def penup(self):
        self._down = False

    pu = penup
    up = penup

    def pendown(self):
        self._down = True

    pd = pendown
    down = pendown

    def isdown(self):
        return self._down

    def pensize(self, w=None):
        if w is None:
            return self._w
        self._w = float(w)

    width = pensize

    def pencolor(self, *a):
        if not a:
            return self._pc
        self._pc = _color(a)

    def fillcolor(self, *a):
        if not a:
            return self._fc
        self._fc = _color(a)

    def color(self, *a):
        if not a:
            return (self._pc, self._fc)
        if len(a) == 1:
            c = _color(a)
            self._pc = c
            self._fc = c
        else:
            self._pc = _color((a[0],))
            self._fc = _color((a[1],))

    def begin_fill(self):
        self._filling = True
        self._fillpts = [_xy(self._x, self._y)]

    def end_fill(self):
        global _drew
        if self._filling and len(self._fillpts) >= 3:
            _drew = True
            _cmds.append(
                {
                    "t": "f",
                    "pts": [[p[0], p[1]] for p in self._fillpts],
                    "c": self._fc,
                }
            )
        self._filling = False
        self._fillpts = []

    def dot(self, size=None, *color):
        global _drew
        _drew = True
        s = size if size else max(self._w + 4, 2 * self._w)
        c = _color(color) if color else self._pc
        p = _xy(self._x, self._y)
        _cmds.append({"t": "d", "x": p[0], "y": p[1], "r": s / 2.0, "c": c})

    def write(self, text, move=False, align="left", font=("Arial", 8, "normal")):
        global _drew
        _drew = True
        p = _xy(self._x, self._y)
        size = font[1] if isinstance(font, (tuple, list)) and len(font) > 1 else 8
        anchor = {"left": "start", "center": "middle", "right": "end"}.get(
            align, "start"
        )
        _cmds.append(
            {
                "t": "x",
                "x": p[0],
                "y": p[1],
                "s": str(text),
                "sz": size,
                "c": self._pc,
                "a": anchor,
            }
        )

    # --- consultas / no-ops ---
    def position(self):
        return (self._x, self._y)

    pos = position

    def xcor(self):
        return self._x

    def ycor(self):
        return self._y

    def heading(self):
        return self._h

    def speed(self, s=None, *a, **k):
        if s is None:
            return self._speed
        names = {
            "fastest": 0,
            "fast": 10,
            "normal": 6,
            "slow": 3,
            "slowest": 1,
        }
        self._speed = names.get(s, s) if isinstance(s, str) else int(s)

    def hideturtle(self):
        self._visible = False

    ht = hideturtle

    def showturtle(self):
        self._visible = True

    st = showturtle

    def stamp(self, *a, **k):
        pass

    def clear(self, *a, **k):
        pass

    def getscreen(self):
        return _screen

    # --- aspecto del cursor / utilidades (no afectan al dibujo) ---
    def shape(self, name=None):
        if name is None:
            return getattr(self, "_shapename", "classic")
        self._shapename = name

    def shapesize(self, *a, **k):
        pass

    turtlesize = shapesize

    def resizemode(self, *a, **k):
        pass

    def shearfactor(self, *a, **k):
        pass

    def tilt(self, *a, **k):
        pass

    def settiltangle(self, *a, **k):
        pass

    def tiltangle(self, *a, **k):
        return 0

    def pen(self, *a, **k):
        pass

    def getpen(self):
        return self

    getturtle = getpen

    def reset(self):
        self._x = 0.0
        self._y = 0.0
        self._h = 0.0
        self._down = True
        self._filling = False
        self._fillpts = []

    def begin_poly(self, *a, **k):
        pass

    def end_poly(self, *a, **k):
        pass

    def get_poly(self, *a, **k):
        return None

    def clearstamp(self, *a, **k):
        pass

    def clearstamps(self, *a, **k):
        pass

    def undo(self, *a, **k):
        pass

    def setundobuffer(self, *a, **k):
        pass

    def onclick(self, *a, **k):
        pass

    def onrelease(self, *a, **k):
        pass

    def ondrag(self, *a, **k):
        pass

    def mode(self, *a, **k):
        pass

    def degrees(self, *a, **k):
        pass

    def radians(self, *a, **k):
        pass

    def towards(self, x, y=None):
        if y is None:
            x, y = x
        return math.degrees(math.atan2(y - self._y, x - self._x)) % 360

    def distance(self, x, y=None):
        if y is None:
            x, y = x
        return math.hypot(x - self._x, y - self._y)


Pen = Turtle
RawTurtle = Turtle


class _Screen:
    def bgcolor(self, *a):
        global _BG
        if a:
            _BG = _color(a)
        return _BG

    def setup(self, width=None, height=None, *a, **k):
        global _WIDTH, _HEIGHT
        if width:
            _WIDTH = int(width)
        if height:
            _HEIGHT = int(height)

    def screensize(self, w=None, h=None, *a, **k):
        self.setup(w, h)

    def colormode(self, *a, **k):
        pass

    def title(self, *a, **k):
        pass

    def tracer(self, *a, **k):
        pass

    def update(self, *a, **k):
        pass

    def listen(self, *a, **k):
        pass

    def delay(self, *a, **k):
        pass

    def mainloop(self, *a, **k):
        pass

    done = mainloop

    def exitonclick(self, *a, **k):
        pass

    def bye(self, *a, **k):
        pass

    def register_shape(self, *a, **k):
        pass

    addshape = register_shape

    def bgpic(self, *a, **k):
        pass

    def setworldcoordinates(self, *a, **k):
        pass

    def onkey(self, *a, **k):
        pass

    onkeypress = onkey
    onkeyrelease = onkey

    def onclick(self, *a, **k):
        pass

    onscreenclick = onclick

    def ontimer(self, *a, **k):
        pass

    def getcanvas(self, *a, **k):
        return None

    def window_width(self, *a, **k):
        return _WIDTH

    def window_height(self, *a, **k):
        return _HEIGHT

    def reset(self, *a, **k):
        pass

    def clear(self, *a, **k):
        pass

    clearscreen = clear


_screen = _Screen()


def Screen():
    return _screen


def getscreen():
    return _screen


def _t():
    global _default
    if _default is None:
        _default = Turtle()
    return _default


def _bind(name):
    def f(*a, **k):
        return getattr(_t(), name)(*a, **k)

    f.__name__ = name
    return f


for _n in (
    "forward fd backward back bk right rt left lt goto setpos setposition setx "
    "sety setheading seth home circle penup pu up pendown pd down isdown pensize "
    "width pencolor fillcolor color begin_fill end_fill dot write speed hideturtle "
    "ht showturtle st stamp clear position pos xcor ycor heading shape shapesize "
    "turtlesize resizemode tilt settiltangle tiltangle pen getpen getturtle reset "
    "begin_poly end_poly clearstamp clearstamps undo setundobuffer onclick onrelease "
    "ondrag mode degrees radians towards distance"
).split():
    globals()[_n] = _bind(_n)

for _n in (
    "bgcolor setup screensize colormode title tracer update listen delay mainloop "
    "done exitonclick bye register_shape addshape bgpic setworldcoordinates onkey "
    "onkeypress onscreenclick ontimer getcanvas window_width window_height clearscreen"
).split():
    globals()[_n] = getattr(_screen, _n)


def _turtle_figura(t):
    # Polígono de la figura de la tortuga (en coords SVG), rotado por su rumbo.
    poly = _SHAPES.get(getattr(t, "_shapename", "classic"), _SHAPES["classic"])
    ang = math.radians(t._h - 90.0)
    ca, sa = math.cos(ang), math.sin(ang)
    pts = []
    for sx, sy in poly:
        rx = sx * ca - sy * sa
        ry = sx * sa + sy * ca
        p = _xy(t._x + rx, t._y + ry)
        pts.append([round(p[0], 2), round(p[1], 2)])
    return {"pts": pts, "fill": t._fc, "stroke": t._pc}


def _lucksoft_json():
    if not _drew:
        return None
    import json

    turtles = [
        _turtle_figura(t) for t in _turtles if getattr(t, "_visible", True)
    ]
    data = {
        "w": _WIDTH,
        "h": _HEIGHT,
        "bg": _BG,
        "cmds": _cmds,
        "turtles": turtles,
    }
    return json.dumps(data)
