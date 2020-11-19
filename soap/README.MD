# SOAP

- TECNOLOGIAS PRINCIPALES:
    1. DJANGO
    2. DJANGO.ORM
    3. python 2.7
    4. Spyne

    - BD:
        1. MySQL 5.7 

    - PATRONES:
        1. DJANGO APPS
    
    - Se realizo una aplicacion django para implementar un servicio SOAP 
    que interactua usando el ORM django con la capa de datos de la aplicacion Wallet
    cuyo Diagrama Entidad Relacion es el siguiente.

 # Diagrama entidad relación
![Diagrama entidad relación wallet](https://github.com/ManuelSBZ/PAY-WALLET/blob/master/ERD.PNG)


Teniendose 7 servicios soap en su realizacion como los que siguen:

1. register_user: 
    inputs: name, lastname,telephone,password,id_document,email
    acción: registra usuario en la base de datos.
    
2. fill_wallet:
    inputs: telephone,id_document,amount
    acción: realiza deposito a el usuario asociado a id_document.

3. create_purchase_order:
    inputs: total_amount, id, purchase_token
    acción: crea orden de compra.

4. verify_token_and_purchase:
    inputs: Token
    accion: verifica token de compra y concreta el debito del dinero en estado de pendiente relacionada a dicha compra.

5. verify_funds:
    inputs: id_document,telephone
    accion: Verifica fondos del relacionado al usuario que coindicida con las credenciasles(inputs).

6. get_user:
    inputs: email,password
    accion: autentica que el usuario reside en la base de datos y lo confirma validando email y password.

7. data_user:
    inputs: email
    accion: retorna informacion del usuario para construir junto con el JWT implementado en la api una session.




    
    
    
    

