#                                                       ⌬⎨☁️ Mi disco duro - ONLINE ☁️⎬⌬

El siguiente proyecto está siendo desarrollado por los alumnos del grupo A del Bootcamp de
Desarrolladores web Full Stack 👾 ; en esta segunda fase del proyecto estaremos desarrollando
el back-end de nuestra API, la cual se ejecuta mediante NodeJs, con lenguaje JavaScript y
conexion a la base de datos con SQL.

Desarrollaremos distintos Endpoints que iremos explicando en adelante con detalle, trabajaremos
con Json, distintos modulos de Node, asi como distintos controllers y middlewares.

#  ---- Alcance requerido del proyecto ----

     1- Se desarrrolla un servidor capaz de crear carpetas y almacenar archivos.

     2- Se permitirá registrarse y loguearse a usuarios nuevos.

     3- Se autoriza a las modificaciones de los perfiles registrados en algunos campos.

     4- Se validan los perfiles mediante password y token.

     5- Se agregan / borran archivos solo para perfiles registrados.


## Modulos, Endpoints y Middlewares.
    - Creacion de middlewares
        - Para verificacion de rutas desconocidas.
        - Validacion de errores.

    - sha4
    - validacion de token
    - Envío de email con codigo de validacion:
        - Para ello instalamos el modulo @sendgrid/mail

    - Endpoints creados en Postman:
        - POST:
            - /         (Esta por definirse)...
            - /user     (Permite el registro del usuario - falta añadir confirmacion email ✅)
            - /login    (Permite el login de usuarios registrados - (En desarrollo)
            
        - GET:
            - /user/id   (Permite la modificacion de los datos del usuario ✅)
            - /user/list (Permite listar los archivos del usuario)

        - DELETE
            - /file/id    (Permite eliminar los archivos del isuario)

    - Módulos instalados para el funcionamiento del servidor
        - Desarrollador.
        - Eslint.
        - Prettier.
        - Conexion a Mysql
        - Chalk
        - Express
        - Morgan
        - Json webToken
        - Bcrypt



# ---- Mejoras propuestas ----

        - Confirmación mediante correo de las modificaciones realizadas al perfil.

        - Envío de fichero descargado mediante correo electronico (tomar de ejemplo el
            proceso que utilizan las plataformas de empleo).

# ---- Conexión con la BBDD ----

    Dentro de los archivos contenidos en el repositorio podéis econtrar el .env.config en el
        cual podeis confirmar los datos que necesitais validar para la conexion a la BBDD. 

        - HOST.
        - USER.
        - PASSWORD.
        - DATABASSE.

En este caso se desarrolló mediante conexion local para pruebas y VPS para el codigo
colaborativo en la BBDD.


# ---- Tecnologías empleadas ----


## <img width="166" alt="IMG_NodeJs_" src="https://user-images.githubusercontent.com/123706095/236196535-2783aca6-aaee-4675-8501-f35ee35d1a5b.png">


## <img width="139" alt="IMG_MySql_" src="https://user-images.githubusercontent.com/123706095/236196551-452673a1-6f0e-4693-8c37-8fbbb3067788.png">

# [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)]()




