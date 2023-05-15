# proyecto02-Hack-a-Boss

-utilizar el fichero myclouddrive.sql para crear la base de datos
-la app permite usar SENDGRID con una API KEY configurada
-el fichero .env debe ser seteado antes de la ejecución con los datos de la BD y los parámetros solicitados - PUBLIC_HOST=http://localhost:3000/users/validate/ - ROOT_DIR=./src/uploads - SECRET_TOKEN= Una cadena aleatoria de la longitud que se desee, se usa para la generación de claves

END POINTS

USUARIOS:

Registro de nuevo Usuario "normal" (no se pueden crear usuarios admin)
Ruta -> http://localhost:3000/newUser
Tipo -> POST
Ejemplo de JSON en BODY
{
"mail": "",
"pwd": ""
}
Devuelve -> Registro con éxito o error

Login de usuario
Ruta -> http://localhost:3000/users/login
Tipo -> POST
Ejemplo de JSON en BODY
{
"mail": "",
"pwd": ""
}
Devuelve -> Login de usuario, obtenemos el TOKEN válido que debemos setear en la variable TOKEN de postman
Ejemplo de respuesta
{
"status": "ok",
"message": "Login efectuado correctamente",
"data": {
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg0MTg0MzM1LCJleHAiOjE2ODQyNzA3MzV9.zzSLLr9Sh5L9ykqg1h-WbCEens55ryD6wFHLNyJVy0A"
},
"info": {
"id": 1,
"role": "admin"
}

Datos de un usuario
ruta -> http://localhost:3000/user/(id) <- Sustituir ID por un id de usuario válido
tipo -> GET
devuelve -> objeto con los datos del usuario elegido, sólo puede consultar el usuario que está logueado, no puede consultar otro ID distinto al suyo.

Actualizar datos de usuario
ruta -> http://localhost:3000/updateUser/(id) <- Sustituir ID por un id de usaurio válido
tipo -> PATCH
ejemplo de objeto a enviar por BODY
{
"name": "Mario"
}
devuelve -> Un OK con opearación aceptada o un ERROR.

Cambiar contraseña Usuaruio
ruta -> http://localhost:3000/users/changePassword/(id) <- Sustituir ID por un id de usaurio válido
tipo -> PATCH
ejemplo de objeto a enviar por BODY
{
"mail": "",
"oldPwd": "",
"newPwd": ""
}
devuelve -> OK de contraseña cambiada o un ERROR

Generar codigo de recuperación de contraseña
ruta -> http://localhost:3000/users/recoverPassword
tipo -> POST
ejemplo de objeto a enviar por BODY
{
"mail": ""
}
devuelve -> OK de envio de codigo o ERROR

Resetear password con código de recuperación
ruta -> http://localhost:3000/users/resetPassword
tipo -> POST
ejemplo de objeto a enviar por BODY
{
"recoverCode" : "",
"newPassword" : ""
}
devuelve -> OK de cambio de contraseña o ERROR

#######################

## RUTAS DE FICHEROS

#######################

ruta -> http://localhost:3000/makeFolder/(nombre de directorio)
tipo -> GET
devuelve -> Crea un directorio en la carpeta actual del usuario (determindo por el campo currentFolder_id de la tabla users)

ruta -> http://localhost:3000/emptyTrash
tipo -> GET
devuelve -> Vacía la papelera (borra los ficheros físicos que tengan en la BD-> tabla files el campo 'in_recycle_bin = 1')

ruta -> http://localhost:3000/renameDirectory/(new Name)/(old Name)
tipo -> GET
devuelve -> Cambia el nombre de un directorio dentro del directorio actual del usuario
Errores posibles -> No existe el directorio a renombrar o el nuevo nombre ya existe dentro del directorio

ruta -> http://localhost:3000/uploadFile
tipo -> POST
devuelve -> sube un fichero al directorio actual del usuario
envio ->
por BODY -> form.data
campo: uploadedFile
Errores posibles -> fichero ya existe. Fichero no soportado. Fichero demasiado grande

ruta -> http://localhost:3000/moveFile
tipo -> POST
devuelve -> mueve un fichero a otro directorio diferente
ejemplo de objeto a enviar por BODY
{
"fileId":"(id del fichero a mover)",
"destinationFolderName": "(carpeta de destino)"
}
Errores posibles: No existe el id del fichero a mover o no existe el directorio de destino

ruta -> http://localhost:3000/renameFile
tipo -> POST
devuelve -> cambia el nombre a un fichero dentro del directorio actual
ejemplo de objeto a enviar por BODY
{
"fileName":"factura_4660.pdf",
"newFileName": "factura_4660_renamed.pdf"
}
Errores posibles: Fichero a renombrar no existe. Nombre nuevo existente ya en el directorio actual.

ruta -> http://localhost:3000/download/(id)
tipo -> GET
devuelve -> objeto con la URL para descargar el fichero pasado por parámetro ID
Errores posibles: Fichero no existe

ruta -> http://localhost:3000/moveToTrash/(nombre de fichero)
tipo -> GET
devuelve -> Mueve a la papelera el fichero pasado por parámetro.
Errores posibles: Fichero no existe

ruta -> http://localhost:3000/recoverFile/(nombre de fichero)
tipo -> GET
devuelve -> Recupera un fichero desde la papelera
Errores posibles: fichero no está en la papelera

ruta -> http://localhost:3000/rd/(directorio)
tipo -> GET
devuelve -> borra un directorio pasado por parámetro
Errores posibles: directorio no existe

ruta -> http://localhost:3000/file/(fichero)
tipo -> DELETE
devuelve -> borra un fichero pasado por parámetro
Errores posibles: fichero no existe

ruta -> http://localhost:3000/cd/(directorio)
tipo -> GET
devuelve -> Cambia de directorio dentro del árbol de directorios del usuario
nota: permite pasar ".." para retroceder un directorio
Errores posibles: directorio no existe

ruta -> http://localhost:3000/getCurrentFolder
tipo -> GET
devuelve -> directorio actual del usuario (valor del campo currentFolder_id de la tabla user)

ruta -> http://localhost:3000/dir
tipo -> GET
devuelve -> obtiene un objeto con el listado del contenido de la carpeta actual del usuario
