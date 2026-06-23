# Implementación de "turtle" para LuckSoft sobre Pyodide.
# El turtle estándar usa Tkinter (no existe en el navegador), así que aquí
# reproducimos su API más usada y, en vez de dibujar en una ventana, generamos
# un SVG que la app muestra en el panel de vista previa.
import math

# ---- Estado del "screen" (módulo) ----
_WIDTH = 400
_HEIGHT = 400
_BG = "white"
_segments = []  # (x1,y1,x2,y2,color,width)
_dots = []  # (x,y,r,color)
_fills = []  # (puntos[], color)
_texts = []  # (x,y,texto,size,color,anchor)
_drew = False
_default = None
_MAX = 60000  # tope de segmentos para no agotar memoria


def _lucksoft_reset():
    global _WIDTH, _HEIGHT, _BG, _segments, _dots, _fills, _texts, _drew, _default
    _WIDTH = 400
    _HEIGHT = 400
    _BG = "white"
    _segments = []
    _dots = []
    _fills = []
    _texts = []
    _drew = False
    _default = None


def _xy(x, y):
    # Centro de la pantalla en el medio del lienzo; y hacia arriba (como turtle).
    return (_WIDTH / 2.0 + x, _HEIGHT / 2.0 - y)


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

    # --- dibujo interno ---
    def _line(self, x1, y1, x2, y2):
        global _drew
        _drew = True
        if len(_segments) < _MAX:
            a = _xy(x1, y1)
            b = _xy(x2, y2)
            _segments.append((a[0], a[1], b[0], b[1], self._pc, self._w))

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
            _fills.append((list(self._fillpts), self._fc))
        self._filling = False
        self._fillpts = []

    def dot(self, size=None, *color):
        global _drew
        _drew = True
        s = size if size else max(self._w + 4, 2 * self._w)
        c = _color(color) if color else self._pc
        p = _xy(self._x, self._y)
        _dots.append((p[0], p[1], s / 2.0, c))

    def write(self, text, move=False, align="left", font=("Arial", 8, "normal")):
        global _drew
        _drew = True
        p = _xy(self._x, self._y)
        size = font[1] if isinstance(font, (tuple, list)) and len(font) > 1 else 8
        anchor = {"left": "start", "center": "middle", "right": "end"}.get(
            align, "start"
        )
        _texts.append((p[0], p[1], str(text), size, self._pc, anchor))

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

    def speed(self, *a, **k):
        pass

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
    "ht showturtle st stamp clear position pos xcor ycor heading"
).split():
    globals()[_n] = _bind(_n)

for _n in (
    "bgcolor setup screensize colormode title tracer update "
    "listen delay mainloop done exitonclick bye"
).split():
    globals()[_n] = getattr(_screen, _n)


def _lucksoft_svg():
    if not _drew:
        return None
    out = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" '
        'viewBox="0 0 %d %d">' % (_WIDTH, _HEIGHT, _WIDTH, _HEIGHT),
        '<rect width="100%%" height="100%%" fill="%s"/>' % _esc(_BG),
    ]
    for pts, col in _fills:
        d = " ".join("%.2f,%.2f" % (p[0], p[1]) for p in pts)
        out.append('<polygon points="%s" fill="%s"/>' % (d, _esc(col)))
    for x1, y1, x2, y2, col, w in _segments:
        out.append(
            '<line x1="%.2f" y1="%.2f" x2="%.2f" y2="%.2f" stroke="%s" '
            'stroke-width="%.2f" stroke-linecap="round"/>'
            % (x1, y1, x2, y2, _esc(col), w)
        )
    for x, y, r, col in _dots:
        out.append(
            '<circle cx="%.2f" cy="%.2f" r="%.2f" fill="%s"/>'
            % (x, y, r, _esc(col))
        )
    for x, y, text, size, col, anchor in _texts:
        out.append(
            '<text x="%.2f" y="%.2f" fill="%s" font-size="%d" '
            'text-anchor="%s" font-family="Arial">%s</text>'
            % (x, y, _esc(col), size, anchor, _esc(text))
        )
    out.append("</svg>")
    return "".join(out)
