# 📝 Lista de Tareas

Aplicación web para gestionar una lista de tareas mediante una **API REST desarrollada con Spring Boot** y un frontend basado en **HTML, CSS y JavaScript**.

La aplicación permite consultar, crear, modificar, completar y eliminar tareas. El frontend se comunica con el servidor mediante `fetch()` y los datos se intercambian en formato **JSON**.

---

## 🚀 Tecnologías utilizadas

### Backend

* ☕ Java
* 🌱 Spring Boot
* 🌐 Spring Web
* 📦 API REST
* 🔄 JSON
* 🗂️ `Map` / `TreeMap`
* 🧩 Java `record`

### Frontend

* 🏗️ HTML5
* 🎨 CSS3
* ⚡ JavaScript
* 🔌 Fetch API
* 📱 Diseño responsive

---

## 📋 Funcionalidades

La aplicación permite:

* ✅ Consultar todas las tareas.
* 🔎 Consultar una tarea por su ID.
* ➕ Crear nuevas tareas.
* ✏️ Modificar tareas.
* ✔️ Marcar tareas como completadas.
* ↩️ Desmarcar tareas.
* 🗑️ Eliminar tareas.
* 🔄 Actualizar la interfaz automáticamente después de cada operación.

---

## 🏗️ Estructura del proyecto

```text
src/
└── main/
    ├── java/
    │   └── edu/
    │       └── xtd/
    │           └── tareas/
    │               ├── controller/
    │               │   └── TareasController.java
    │               │
    │               └── dto/
    │                   └── Tarea.java
    │
    └── resources/
        └── static/
            ├── index.html
            ├── style.css
            ├── script.js
            │
            └── assets/
                └── Lista.png
```

---

## 📦 Modelo de datos

Las tareas se representan mediante un `record` de Java:

```java
public record Tarea(
    Integer id,
    String texto,
    boolean completada
) {
}
```

Cada tarea contiene:

| Campo        | Tipo      | Descripción                        |
| ------------ | --------- | ---------------------------------- |
| `id`         | `Integer` | Identificador único de la tarea    |
| `texto`      | `String`  | Texto o descripción de la tarea    |
| `completada` | `boolean` | Indica si la tarea está completada |

Ejemplo:

```json
{
    "id": 1,
    "texto": "Repasar JavaScript",
    "completada": false
}
```

---

## 🌐 API REST

La API utiliza la ruta base:

```text
/tarea
```

### Obtener todas las tareas

```http
GET /tarea
```

Devuelve todas las tareas almacenadas.

Ejemplo:

```json
[
    {
        "id": 0,
        "texto": "Limpiar Arena del Gato",
        "completada": false
    },
    {
        "id": 1,
        "texto": "Dar Comida al Gato",
        "completada": false
    }
]
```

---

### Obtener una tarea

```http
GET /tarea/{id}
```

Ejemplo:

```http
GET /tarea/1
```

Respuesta:

```json
{
    "id": 1,
    "texto": "Dar Comida al Gato",
    "completada": false
}
```

---Aplicación web para gestionar una lista de tareas mediante una API REST desarrollada con Spring Boot y un frontend basado en HTML, CSS y JavaScript.

### Crear una tarea

```http
POST /tarea
```

Body:

```json
{
    "texto": "Repasar JavaScript",
    "completada": false
}
```

El servidor genera el identificador de la nueva tarea.

---

### Modificar una tarea

```http
PUT /tarea/{id}
```

Ejemplo:

```http
PUT /tarea/1
```

Body:

```json
{
    "texto": "Repasar JavaScript y Fetch",
    "completada": true
}
```

---

### Eliminar una tarea

```http
DELETE /tarea/{id}
```Aplicación web para gestionar una lista de tareas mediante una API REST desarrollada con Spring Boot y un frontend basado en HTML, CSS y JavaScript.

Ejemplo:

```http
DELETE /tarea/1
```

Elimina la tarea correspondiente al identificador indicado.

---

## 🔄 Funcionamiento de la aplicación

El funcionamiento sigue este flujo:

```text
1. El usuario abre la página
            ↓
2. JavaScript realiza un GET /tarea
            ↓
3. Spring Boot devuelve las tareas en JSON
            ↓
4. JavaScript recibe los datos
            ↓
5. JavaScript pinta las tareas dinámicamente
            ↓
6. El usuario crea, modifica, completa o elimina
            ↓
7. JavaScript realiza POST / PUT / DELETE
            ↓
8. Spring Boot actualiza el mapa de tareas
            ↓
9. JavaScript vuelve a consultar las tareas
            ↓
10. La pantalla se actualiza
```

---

## 💻 Frontend

El frontend está formado por tres archivos principales:

### `index.html`

Contiene la estructura de la página:

* Título.
* Imagen.
* Formulario para crear tareas.
* Lista donde se muestran las tareas.

El JavaScript se carga utilizando `defer`:Aplicación web para gestionar una lista de tareas mediante una API REST desarrollada con Spring Boot y un frontend basado en HTML, CSS y JavaScript.

```html
<script src="script.js" defer></script>
```

El favicon y las imágenes se encuentran dentro de:

```text
assets/
```

---

### `style.css`

Se encarga de la presentación visual de la aplicación:

* Diseño de la página.
* Colores.
* Botones.
* Tarjetas de tareas.
* Tareas completadas.
* Diseño responsive.

---

### `script.js`

Se encarga de la comunicación entre el frontend y la API REST.

Utiliza la función:

```javascript
fetch()
```

para realizar las peticiones HTTP:

```text
GET
POST
PUT
DELETE
```

Las tareas se generan dinámicamente utilizando JavaScript.

---

## 🧪 Pruebas con Postman

La API puede probarse utilizando **Postman**.

Ejemplos:

```text
GET     http://localhost:8080/tarea
GET     http://localhost:8080/tarea/1
POST    http://localhost:8080/tarea
PUT     http://localhost:8080/tarea/1
DELETE  http://localhost:8080/tarea/1
```

Para las peticiones `POST` y `PUT`, se utiliza:

```text
Content-Type: application/json
```

---

## ▶️ Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Abrir el proyecto

Abrir el proyecto utilizando un IDE compatible con Spring Boot, por ejemplo:

* IntelliJ IDEA
* Eclipse
* Spring Tool Suite
* Visual Studio Code

### 3. Ejecutar Spring Boot

Ejecutar la clase principal de la aplicación:

```java
@SpringBootApplication
public class TareasApplication {

    public static void main(String[] args) {
        SpringApplication.run(TareasApplication.class, args);
    }
}
```

### 4. Abrir la aplicación

Una vez iniciado Spring Boot, acceder desde el navegador a:

```text
http://localhost:8080/
```

---

## ⚠️ Almacenamiento

Actualmente las tareas se almacenan en memoria utilizando un:

```java
Map<Integer, Tarea>
```

concretamente un:

```java
TreeMap<Integer, Tarea>
```

Por este motivo, **las tareas se pierden cuando se detiene o reinicia la aplicación**.

No se utiliza todavía una base de datos.

---

## 📌 Estado del proyecto

* [x] API REST
* [x] GET todas las tareas
* [x] GET tarea por ID
* [x] POST crear tarea
* [x] PUT modificar tarea
* [x] DELETE eliminar tarea
* [x] Frontend HTML
* [x] Estilos CSS
* [x] JavaScript
* [x] Fetch API
* [x] JSON
* [x] Renderizado dinámico
* [x] Favicon
* [x] Pruebas con Postman
* [ ] Base de datos

---

## ▶️ Ejecutar el proyecto mediante Maven

También podemos ejecutar la aplicación desde la terminal utilizando **Maven**, sin necesidad de iniciar Spring Boot manualmente desde el IDE.

Desde la carpeta raíz del proyecto ejecutamos:

```bash
mvn spring-boot:run
```

Maven se encargará de iniciar la aplicación Spring Boot.

Una vez iniciada, podremos acceder a la aplicación desde:

```text
http://localhost:8080/
```

Y a la API REST desde:

```text
http://localhost:8080/tarea
```

### 🪟 En Windows

Si el proyecto incluye el Maven Wrapper (`mvnw`), también podemos utilizar:

```bash
mvnw spring-boot:run
```

O, en PowerShell:

```powershell
.\mvnw spring-boot:run
```

### 🐧 Linux / macOS

Si utilizamos el Maven Wrapper:

```bash
./mvnw spring-boot:run
```

### 📦 Generar y ejecutar el `.jar`

Otra opción es generar primero el archivo ejecutable:

```bash
mvn clean package
```

Esto generará un archivo `.jar` dentro de:

```text
target/
```

Por ejemplo:

```text
target/tareas-0.0.1-SNAPSHOT.jar
```

Después podemos ejecutarlo con:

```bash
java -jar target/tareas-0.0.1-SNAPSHOT.jar
```

De esta forma podemos ejecutar la aplicación sin abrir el proyecto desde un IDE.

### 📌 Resumen

```text
Desarrollo:
mvn spring-boot:run

Generar aplicación:
mvn clean package

Ejecutar aplicación empaquetada:
java -jar target/tareas-0.0.1-SNAPSHOT.jar
```


## 👨‍💻 Autor

**Jaime Galvez Martinez**

Proyecto realizado como práctica de desarrollo de una aplicación web utilizando **Java, Spring Boot y una API REST**.
