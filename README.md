# ms-email

## ¿Qué es?

Esta aplicación es un microservicio desarrollado en node.js con el uso de las librerias express y nodemailer, cuya única función es el envio de correo con un contenido especifico, desde un usuario fijo a un destinatario ingresado. por medio del servidor smtp de outlook, esta pensando para que pueda ser consumido por cualquier entorno, independiente del lenguaje de programación o plataforma donde se encuentre.

## Librerias implementadas

Estas son las libreria que permiten el funcionamiento del envio de correo:
 - body-parser v1.20.1
 - cors v2.8.5
 - express v4.18.2
 - http v0.0.1-security
 - nodemailer v6.8.0"

## Contenido recibido (BODY)

Este microservicio, expone un servicio de tipo POST, que recibe unicamente la siguiente estructura de tipo JSON, y con esta realiza el envio:

 ```bash
    {
        "toAddress": "example@mail.com",
        "subject": "Titulo del correo",
        "text": "Texto principal del correo",    
        "data": 
            {
                "originalText": "Texto que fue enviado para obtener su Hash",
                "tipo": "MD5",
                "generatedHash": "f822102f4515609fc31927a84c6db7f8",
                "expectedHash": "f822102f45235609der1927234c6db7f8",
                "res": "Respuesta de la comparación del Hash"
            }
    }
 ```

## Contenido del envio del correo (RESPONSE)

El correo que envia este microservicio contiene los siguientes datos: texto o nombre del archivo original, el hash que se genero previamente, hash esperado, tipo de hash, validación de si el hash generado es igual al esperado.

Así es como se representaría el correo enviado por la aplicación:

<img src="img/img1.jpg" style="margin:auto">

## ¿Comó se ejecuta?

Para ejecutarlo de manera local, primero, desde la raíz del proyecto se debe ejecutar el siguiente comando en una terminal:

 ```bash
    npm install
 ```
 
 De esta manera se descargaran todas las dependencias del proyecto, y finalmente para desplegarlo el comando:

 ```bash
    node index.js
 ```
 
 ## Despliegue en docker
 
 Para desplegar este servicio en un contenedor de Docker se puede construir una imagen a partir del Dockerfile del repositorio, o se puede descargar la imagen desde DockerHub en:
  - https://hub.docker.com/r/jrodrigu853/node-microservice-email
