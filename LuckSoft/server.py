"""Servidor de desarrollo para LuckSoft.

Sirve los archivos con las cabeceras de "aislamiento de origen" que necesita
SharedArrayBuffer, para que input() funcione escribiendo en la consola.

Uso:
    python server.py
Luego abre:  http://localhost:8000/
"""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = 8000


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Habilitan crossOriginIsolated -> SharedArrayBuffer disponible.
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "credentialless")
        # Evita caché molesta durante el desarrollo.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    print(f"LuckSoft en  http://localhost:{PORT}/")
    print("Ctrl+C para detener.")
    ThreadingHTTPServer(("localhost", PORT), Handler).serve_forever()
