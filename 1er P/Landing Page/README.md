# Publicacion de sitio en HTML

**Descripcion:**  
Despliegue de la landing page desarrollada en HTML y subida a un repositorio personal en GitHub, dentro de un contenedor Docker usando Nginx.

La imagen fue publicada en Docker Hub para poder ejecutarla en cualquier entorno.

**Estructura de la carpeta:**  
Al ser un computador empresarial, se optó por crear una carpeta personal donde se realizarán los trabajos correspondientes.

- WEB
    - 1er P
        - Landing Page
            - Imagenes
                - iconGlobo.svg
            - .dockerignore
            - Dockerfile
            - index.html
            - README.md
        - Practica

**Instrucciones:**   
***1. Construir la imagen***  
Antes de construir la imagen, debemos iniciar sesión en Docker Hub con el comando:  
`docker login`  

Posterior a eso si construimos la imagen con  
`docker build -t jonas-nginx .`  

Donde: 
-  `docker build` permite construir una imagen a partir del Dockerfile
- `-t jonas-nginx` asigna un tag a la imagen
- `.` indica que se utilizará el contenido de la carpeta actual.  


***2. Ejecución del contenedor***  
Para ejecutar el contenedor debemos ejecutar el siguiente comando  
`docker run -d -p 8080:80 jonas-nginx`  

Donde: 
-  `-d` ejecuta el contenedor en segundo plano
- `-p 8080:80` asigna el puerto 80 del contenedor al puerto 8080 del equipo local (local host)
- `jonas-nginx` indica el nombre de la imagen creada  

***3. Acceso al sitio web:***  
Con el contenedor ejecutándose en segundo plano, podemos acceder al sitio web desde el navegador mediante la siguiente dirección:  
<http://localhost:8080>  

***4. Descargar la imagen desde Docker Hub:***  
Primer para descargar la imagen debemos publicarla en Docker Hub, esto lo hacemos con el comando:   
`docker tag jonas-nginx jonasdz2002/jonas-nginx`  
El cual nos ayuda a darle un nombre en nuestro repositorio.  

Posterior a eso la publicamos con:  
`docker push jonasdz2002/jonas-nginx`  

Para descargar la imagen desde Docker Hub utilizamos  
`docker pull jonasdz2002/jonas-nginx`  

***5. Ejecutar la imagen descargada:***  
Una vez descargada la imagen, la ejecutaremos como si nosotros la hubiesemos creado, pero ahora nombrando el usuario y el nombre de la imagen  
`docker run -d -p 8080:80 jonasdz2002/jonas-nginx`  

***
[Link a la imagen en Docker](https://hub.docker.com/r/jonasdz2002/jonas-nginx)
***

