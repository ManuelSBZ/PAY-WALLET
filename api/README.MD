# API

Tecnologias:

1. Python 3.7
2. Flask 1.1.2
3. Flask-CORS 
4. Pyjwt

Se realizo ApiREST con Flask framework, usando python 3.7, cumpliendo del papel
de proxy entre el front React y el Servicio SOAP, ademas esta agrega una capa de seguridad y 
manejo de sesiones con JWT. Esta configura los siguientes endpoints


Endpoints como los siguientes:


- ~api/register/user: 
    Para registrar usuarios en la aplicacion. Recibe Nombre, Apellido, Cedula,
    Telefono, Email(al cual recibira un token para confirmar una transaccion),
    Documento de Identidad.

- ~api/getToken:
    Para obtener token de acceso JWT, mediante el header 'Authentication: Basic user:password',para asi llevar la session de usuario. Esta configurado para que dure 60 minutos.

- ~api/fill/wallet:
    Para realizar deposito de usuario ya registrado y logueado, enviandose el 
    monto a depositar y realizando validacion del usuario con datos de session como 
    documento de identidad y telefono en la base de datos(Implementada en Mysql) a traves del servicio Soap.

- ~api/user/funds:
    Para verificar fondos del usuario logueado. Se verifica usando el numero de
    telefono y documento de identidad, en el backend comparando datos de session
    contra la base de datos a traves del servicio Soap.

- ~api/create/purchase:
    Utilizada para realizar orden de compra basandose en id del usuario y Monto a pagar previo a la simulacion del debito de fondos.Esta implementa un servidor smtp para enviar por correo el token de compra para confirmar la identidad del usuario.

- ~api/confirm/purchase:
    Recibe como parametro el token de compra y realiza la validacion con respecto a 
    la orden de compra y concretar el debito por el monto respectivo.

Para mas informacion ir a collecion postman anexada el la raiz del aplicativo 
api.


