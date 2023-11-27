# Ruta Estrella

El objetivo general de este proyecto es diseñar, construir y evaluar un sistema para encontrar rutas utilizando estructuras gráficas y el algoritmo A*. Este sistema debería poder encontrar el camino más corto entre dos vértices de gráficos específicos teniendo en cuenta la información heurística para optimizar la búsqueda.

## Descarga

Descargar el repositorio

```bash
git clone https://github.com/proyectosuninorte/RutaEstrella.git
```
## Uso
Se abre la carpeta src y se abre el archivo index.htlm

- Hay un boton para crear Nodos y uno para borrarlos. La posicion inicial es al azar,este se puede mover manualmente.
- La segunda fila de botones esta designada para la creacion de una Arista dependiendo del nodo inicial/final y su peso.
- En la tercera fila de botones se designa el Nodo inicial y final, ademas de un boton para encontrar el camino mas corto y otro para olvidar el camino para poder buscar otro.
## Caso Base
1. Cree tres nodos presionando el boton "Crear Nodo" tres veces
2. Seleccione el N0 y el N1 ademas de la arista --> con peso 5
3. Seleccione el N0 y el N2 ademas de la arista --> con peso 1
4. Seleccione el N2 y el N1 ademas de la arista --> con peso 2
5. Hacer click en el Nodo N0 y presionar "Escoger nodo inicial"
6. Hacer click en el Nodo N1 y presionar "Escoger nodo final"
7. Hacer click en "Encontrar camino"

Las aristas entre N0,N2 y N2,N1 habran cambiado de color al ser el camino mas corto entre el nodo inicial y el nodo final.
## Author

- [**Smonsalve2417**](https://github.com/smonsalve2417)
- [**Ayenhenriquez**](https://github.com/Ayenhenriquez)
- [**Veronicaospina**](https://github.com/Veronicaospina)