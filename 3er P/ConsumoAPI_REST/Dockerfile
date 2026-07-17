#Imagen base oficial de Nginx
FROM nginx:alpine

#Elimina configuracion por defecto
RUN rm -rf /usr/share/nginx/html/*

#Copia tu sitio html al contenedor
COPY . /usr/share/nginx/html/

#Expone el puerto 80
EXPOSE 80

#Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]