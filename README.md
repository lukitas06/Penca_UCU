# Penca UCU
Bienvenido a la aplicación de pencas de la Universidad Católica del Uruguay. Este proyecto es una simple aplicación hecha con Next.js.

## Descripción
Esta aplicación permite a los alumnos de la universidad realizar predicciones sobre los partidos de la Copa América 2024 y competir contra otros alumnos.

## Estructura del proyecto
| Directorio                | Descripción                                                                                      |
|---------------------------|--------------------------------------------------------------------------------------------------|
| **db**                    | Se encuentran los scripts SQL que se ejecutarán cuando el contenedor de la base de datos corra por primera vez. |
| **penca_ucu**             | Donde se encuentra la lógica de la aplicación en sí.                                              |
| penca_ucu/**public**      | Para archivos estáticos como imágenes o logos.                                                   |
| penca_ucu/**app**         | Es donde está contenida la aplicación, con sus componentes, páginas y demás funcionalidades.     |
| penca_ucu/app/**services**| Servicios utilizados a lo largo de la aplicación.                                                |
| penca_ucu/app/**api**     | Contiene las rutas a la API, con sus manejadores. Cada carpeta es una ruta. Carpetas anidadas son rutas anidadas. |
| penca_ucu/app/**lib**     | Contiene las definiciones de esquemas y conexiones a bases de datos.                             |
| penca_ucu/app/**pages**   | Contiene las páginas de la aplicación. Cada `page.tsx` es una página.                            |
| penca_ucu/app/ui/**components** | Contiene componentes de UI reutilizables en las páginas.                                 |
| penca_ucu/app/ui/**styles**    | Se guardan los diferentes estilos de los componentes.                                     |

## Instrucciones para ejecutar (es necesario tener Docker Desktop instalado)
1. Abrí la terminal y cloná este repositorio en tu máquina utilizando el comando `git clone https://github.com/lukitas06/Penca_UCU.git`.
2. Navegá hasta la carpeta del proyecto utilizando el comando `cd Penca_UCU`.
3. Ingresá el comando `docker-compose up --build -d`. Esto creará un stack con 2 contenedores. Uno de ellos es la base de datos, que ejecutará los scripts SQL ubicados en la carpeta "db", y el otro contenedor es el de la aplicación.
4. Abrí tu navegador y dirigite a http://localhost:3000.

## Contribuir en el proyecto
Si querés contribuir en este proyecto por favor seguí estos pasos:
1. Para crear una funcionalidad nueva, creá una nueva branch con la nomenclatura "feature/\<funcionalidad\>".
2. Para arreglar un bug o error, creá una nueva branch con la nomenclatura "fix/\<arreglo\>".
3. Realizá los cambios.
4. Creá un pull request con la descripción de los cambios que hiciste.