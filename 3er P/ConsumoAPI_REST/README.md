# Consumo de API_REST
## Resumen de Métodos HTTP

Los métodos HTTP indican la acción que se quiere realizar sobre un recurso en el servidor:

* **GET**: **Recupera datos**. Es de solo lectura y no modifica el servidor (ej. ver un perfil).
* **POST**: **Crea recursos**. Envía datos en el cuerpo de la petición para generar algo nuevo (ej. registrar un usuario).
* **PATCH**: **Modifica parcialmente**. Actualiza solo los campos específicos que se le envían (ej. cambiar solo el teléfono).
* **DELETE**: **Elimina recursos**. Borra de forma definitiva un elemento del servidor (ej. borrar una foto).


**Instrucciones Docker:**   
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
`docker build -t jonas-consumo_api_rest `  

***3. Acceso al sitio web:***  
Con el contenedor ejecutándose en segundo plano, podemos acceder al sitio web desde el navegador mediante la siguiente dirección:  
<http://localhost:8080>  

***4. Descargar la imagen desde Docker Hub:***  
Primer para descargar la imagen debemos publicarla en Docker Hub, esto lo hacemos con el comando:   
`docker tag jonas-consumo_api_rest jonasdz2002/consumo_api_rest`  
El cual nos ayuda a darle un nombre en nuestro repositorio.  

Posterior a eso la publicamos con:  
`docker push jonasdz2002/consumo_api_rest`  

Para descargar la imagen desde Docker Hub utilizamos  
`docker pull jonasdz2002/consumo_api_rest`  

***5. Ejecutar la imagen descargada:***  
Una vez descargada la imagen, la ejecutaremos como si nosotros la hubiesemos creado, pero ahora nombrando el usuario y el nombre de la imagen  
`docker run -d -p 8080:80 jonasdz2002/consumo_api_rest`  

***
[Link a la imagen en Docker](https://hub.docker.com/r/jonasdz2002/consumo_api_rest)
***
