# WALLET 

El presente proyecto comprende un wallet cuyas acciones son en terminos simples: registro, logueo, deposito, envio de dinero, validacion por token por email, concretar compra. Este aplicativo consiste en 2 componentes back, el primero 
es un servicio soap hecho con django utilizando la extension Spyne y python 2.7 principalmente
que interactua con la capa de datos implementada con mysql 5.7 imagen docker.El segundo componente es un servicio ApiREST que intercede entre el servicio soap y la app front añadiendo una capa de seguridad 
con JWT, misma utilizada para llevar a cabo la session de un usuario registrado y asi mismo implementa
un servidor smtp para envio de token de confirmacion al correo del usuario loggeado. Por ultimo tenemos una app front hecha con React que hace de UI para probar este proyecto didactico. 


DESPLIEGUE EN LOCAL: 
  1. Docker y Docker Compose para su despliegue en maquina local.
  2. Ubicarse en la carpeta que contiene el docker compose y ejecutar el siguiente comando "docker-compose up --build".
  3. Esperar a que los 4 containers se levanten y luego realizar las pruebas pertinentes.
  
  puertos usados en LOCALHOST:
  - Docker host Red Default expuesta en port 3306 --> Mysql
  - localhost:7777 --> soap
  - localhost:7474  --> api
  - localhost:3000 --> front_react
  IMPORTANTE: se debe aegurar que no haya ningun proceso corriendo en estos puertos para el correcto funcionamiento.
    

API:
   - TECNOLOGIAS:
       1. Flask
       2. Flask-CORS
       3. python 3.7
       4. PyJWT
       5. SMTPLIB
       6. Zeep

   - PATRONES:
      1. BLUEPRINTS
      2. FACTORY

SOAP
  - TECNOLOGIAS PRINCIPALES:
       1. DJANGO
       2. DJANGO.ORM
       3. python 2.7
       4. Spyne

  - BD:
       1. MySQL 5.7 

  - PATRONES:
       1. DJANGO APPS
        
FRONT
   - TECNOLOGIAS PRINCIPALES:
        1. React : latest
    
   - PATRONES
        1. Hooks
