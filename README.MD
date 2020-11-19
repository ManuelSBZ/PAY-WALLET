# WALLET 

El presente proyecto comprende un wallet cuyas acciones son en terminos simples: registro, logueo, deposito, envio de dinero, validacion por token por email, concretar compra. Este aplicativo consiste en 2 componentes back, el primero 
es un servicio soap hecho con django utilizando la extension Spyne y python 2.7 principalmente
que interactua con la capa de datos implementada con mysql 5.7 imagen docker.El segundo componente es un servicio ApiREST que intercede entre el servicio soap y la app front añadiendo una capa de seguridad 
con JWT, misma utilazada para llevar a cabo la session de un usuario registrado y asi mismo implementa
un servidor smtp para envio de token de confirmacion al correo del usuario loggeado. Por ultimo tenemos una app front hecha con React que hace de UI para probar este proyecto didactico. 

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
