

#                                                       ⌬⎨☁️ Mi disco duro - ONLINE ☁️⎬⌬

El siguiente proyecto está siendo desarrollado por los alumnos del grupo A 📝 del Bootcamp de
Desarrolladores web Full Stack 👾 ; en esta segunda fase del proyecto estaremos desarrollando
el back-end de nuestra API, la cual se ejecuta mediante NodeJs, con lenguaje JavaScript y
conexion a la base de datos con SQL.

Desarrollaremos distintos Endpoints que iremos explicando en adelante con detalle, se indicará así mismo los accesos a la BBDD y distintos datos necesarios en el .env para la configuración y funcionamiento del proyecto.

#  ---- Alcance requerido ----

     1️⃣ Se desarrrolla un servidor capaz de crear carpetas y almacenar archivos.

     2️⃣ Se permitirá registrarse y loguearse a nuevos usuarios.

     3️⃣ Se autoriza a las modificaciones de los perfiles registrados en algunos campos.

     4️⃣ Se validan los perfiles mediante password y token.

     5️⃣ Se agregan / borran archivos solo para perfiles registrados.

# ---- Desarrollos ----

## Middlewares
        🤷🏼 Verificacion de rutas desconocidas.

## Endpoints:

        🧑🏻‍💻 Users:
            - GET ** /user/:id ➡️ Ver datos de usuarios logueados.
            - POST ** /newUser ➡️ Registro de nuevo usuario. ** Acceso para usuarios anónimos.
            - PATCH ** /updateUser/:id ➡️ Actualizar datos del usuario según su perfil.
            - DELETE ** /deleteUser/:id ➡️ Soft delete de usuarios con permisos.
            - POST ** /users/login ➡️ Login de usuarios registrados ** Acceso para usuarios anónimos.
            - PATCH ** /users/changePassword/:id ➡️ Modificación de password.
            - GET ** /users/validate/:regCode ➡️ Validación de usuarios registrados.
            - POST ** /users/recoverPassword ➡️ Recuperación de password con validación token.
            - POST ** /users/resetPassword ➡️ Modificación de token registrado para modificación de password.

        🗂️ Files:
            - GET ** /makeFolder/:folderName ➡️ Creación de carpetas a usuarios validados.
            - GET ** /getCurrentFolder ➡️ Nos indica el directorio en el cual nos encontramos ubicados.
            - GET ** /dir ➡️ Listar todos los archivos contenidos en el usuario validado.
            - GET ** /cd/:destinationDirectory ➡️ Valida y permite moverse por los directorios del usuario.
            - GET ** /rd/:directoryToDelete ➡️ Borrado de directorios vacíos.
            - GET ** /renameDirectory/:oldName/:newName ➡️ Modificación del nombre del directorio.
            - POST ** /uploadFile ➡️ Subida de ficheros a usuarios registrados.
            - POST ** /moveFile ➡️  Mover el archivo dentro de las carpetas de nuestro directorio.
            - DELETE ** /file/:fileName ➡️ Borrado de ficheros contenidos en los directorios.
            - GET ** /download/:fileId ➡️ Descarga del fichero seleccionado.

## Módulos instalados para el funcionamiento del servidor
        - Mysql.
        - Sharp.
        - Express.
        - Json webToken.
        - Morgan.
        - Nodemon.
        - Uuid.
        - @sendgrid/mail.
        - Cors.



# ---- Mejoras propuestas ----

        📨 Confirmación mediante correo de las modificaciones realizadas al perfil, así como el envío de códigos mediante correo electrónico validado del cliente.

        ⬇️ Gestión de descarga de archivos.

        📂 Modificación de los directorios y archivos creados por el usuario.

        ⚠ Validación del tipo de perfil de los usuarios registrados, permitiendo así las modificaciones acorde al perfil dado.

# ---- Conexión con la BBDD ----

    Dentro de los archivos contenidos en el repositorio podéis econtrar el .env_example en el
        cual podeis confirmar los datos que a validar para la conexión a la BBDD. 

        - HOST.
        - USER.
        - PASSWORD.
        - DATABASSE.
        
En este caso se desarrolló mediante conexion local para pruebas y VPS para el codigo
colaborativo en la BBDD.


# ---- Otros datos de interés ----

Para el funcionamiento de todo el servidor, hará falta también otros datos indicados dentro del .env_example

        - SENDGRID_API_KEY.
        - SENDGRID_FROM.
        - PUBLIC_HOST.
        - ROOT_DIR.
        - SECRET_TOKEN.



# ---- Enlaces ----

- Morgan: https://www.npmjs.com/package/morgan

- Sendgrid: https://www.npmjs.com/package/@sendgrid/mail

- Uuid: https://www.npmjs.com/package/uuid

- Joi: https://www.npmjs.com/package/joi?activeTab=readme

- Query: https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query

- Express-fileupload: https://www.npmjs.com/package/express-fileupload


# ---- Tecnologías empleadas ----


# <img width="166" alt="IMG_NodeJs_" src="https://user-images.githubusercontent.com/123706095/236196535-2783aca6-aaee-4675-8501-f35ee35d1a5b.png">


# <img width="139" alt="IMG_MySql_" src="https://user-images.githubusercontent.com/123706095/236196551-452673a1-6f0e-4693-8c37-8fbbb3067788.png">

# [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)]()




