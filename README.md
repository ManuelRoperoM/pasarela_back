# Pasarela de Pagos — Backend

Backend de una plataforma de checkout y procesamiento de pagos desarrollado con **NestJS, TypeScript y PostgreSQL**.

El proyecto permite consultar productos, crear transacciones, procesar pagos mediante **Wompi**, consultar el estado de una transacción y gestionar la información de entrega.

La aplicación está construida siguiendo una arquitectura orientada a casos de uso y separación de responsabilidades entre dominio, aplicación e infraestructura.

---

## Tecnologías

- **Node.js**
- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **Wompi API**
- **Jest**
- **Swagger / OpenAPI**
- **class-validator**
- **class-transformer**

---

## Arquitectura

El proyecto utiliza una arquitectura basada en separación de responsabilidades:

```text
src/
├── products/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
│
├── transactions/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
│
├── users/
│   ├── application/
│   ├── domain/
│   └── infrastructure/
│
├── deliveries/
│   ├── domain/
│   └── infrastructure/
│
└── database/
    └── seed/
```

Los **casos de uso** contienen la lógica principal de negocio, mientras que los repositorios abstraen el acceso a persistencia.

---

## Requisitos

Antes de ejecutar el proyecto se requiere:

- Node.js
- npm
- PostgreSQL
- Una base de datos PostgreSQL creada
- Credenciales de acceso a Wompi para procesamiento de pagos

---

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=pasarela_db

WOMPI_BASE_URL=https://sandbox.wompi.co/v1
WOMPI_PUBLIC_KEY=your_public_key
WOMPI_PRIVATE_KEY=your_private_key
```

> Las credenciales reales de Wompi no deben incluirse en el repositorio.

---

## Base de datos

El proyecto utiliza **PostgreSQL** como sistema de persistencia.

La configuración de TypeORM se encuentra en `data-source.ts`.

Las modificaciones estructurales de la base de datos se manejan mediante **migraciones**, evitando modificar directamente el esquema de la base de datos.

---

## Migraciones

El proyecto utiliza TypeORM para administrar las migraciones.

### Generar una migración

Después de modificar una entidad:

```bash
npm run migration:generate -- src/database/migrations/NombreDeLaMigracion
```

### Ejecutar migraciones

```bash
npm run migration:run
```

### Revertir la última migración

```bash
npm run migration:revert
```

Los scripts utilizados son:

```json
{
  "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js -d data-source.ts",
  "migration:generate": "npm run typeorm -- migration:generate",
  "migration:run": "npm run typeorm -- migration:run",
  "migration:revert": "npm run typeorm -- migration:revert"
}
```

---

## Seed de productos

El proyecto cuenta con un seed para cargar productos iniciales en la base de datos.

Ejecutar:

```bash
npm run seed:products
```

El seed se encuentra en:

```text
src/database/seed/product.seed.ts
```

Este proceso crea productos de prueba para poder utilizar el checkout.

---

## Ejecutar el proyecto

### Desarrollo

```bash
npm run start
```

### Desarrollo con watch

```bash
npm run start:dev
```

### Producción

```bash
npm run start:prod
```

Por defecto, la aplicación utiliza el puerto:

```text
3000
```

---

## Swagger

La documentación de la API está disponible mediante Swagger.

Con el backend ejecutándose localmente:

**http://localhost:3000/api/docs**

Desde Swagger se pueden consultar y probar los endpoints disponibles para:

- Products
- Transactions
- Users
- Payment processing
- Payment status
- Product stock

---

## Principales endpoints

### Productos

```http
GET /products
```

Obtiene todos los productos disponibles.

```http
GET /products/:id
```

Obtiene un producto específico.

```http
PATCH /products/:id/stock
```

Actualiza el stock de un producto.

---

### Usuarios

```http
POST /users
```

Crea un usuario.

```http
GET /users/:id
```

Obtiene un usuario por ID.

---

### Transacciones

```http
POST /transactions
```

Crea una nueva transacción.

La creación de la transacción valida:

- Existencia del usuario.
- Existencia del producto.
- Stock disponible.
- Cálculo del valor del producto.
- Tarifa base.
- Tarifa de envío.
- Valor total.
- Información de entrega.

---

### Procesamiento del pago

```http
POST /transactions/:id/payment
```

Procesa el pago de una transacción utilizando Wompi.

El backend se encarga de comunicarse con la API de Wompi y almacenar la referencia de la transacción correspondiente.

---

### Estado del pago

```http
GET /transactions/:id/payment/status
```

Consulta el estado actual del pago.

Este endpoint permite al frontend consultar periódicamente el estado de la transacción hasta obtener un resultado definitivo.

---

### Consulta de transacción

```http
GET /transactions/:id
```

Obtiene la información completa de una transacción.

---

## Flujo de compra

El flujo principal de la aplicación es:

```text
1. Consultar productos
        ↓
2. Seleccionar producto
        ↓
3. Crear transacción
        ↓
4. Registrar información de entrega
        ↓
5. Procesar pago
        ↓
6. Consultar estado del pago
        ↓
7. Confirmar resultado
```

El frontend utiliza el endpoint de consulta de estado para confirmar el resultado final del pago.

---

## Validación

Los DTOs utilizan `class-validator` para validar la información recibida por la API.

La aplicación utiliza un `ValidationPipe` global con:

```typescript
new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
```

Esto permite rechazar propiedades no esperadas y transformar los datos recibidos según las reglas definidas en los DTOs.

---

## Tests

El proyecto utiliza **Jest** para pruebas unitarias.

Ejecutar:

```bash
npm run test
```

Para ejecutar las pruebas con cobertura:

```bash
npm run test:cov
```

Las pruebas principales se encuentran enfocadas en los casos de uso de negocio, especialmente en el flujo de creación y procesamiento de transacciones.

---

## Integración con Wompi

El procesamiento de pagos utiliza la API de **Wompi**.

El backend encapsula la comunicación con el proveedor de pagos para evitar que la lógica externa quede directamente acoplada a los controladores.

El flujo general es:

```text
Frontend
   ↓
Backend
   ↓
Transaction Use Case
   ↓
Wompi Service
   ↓
Wompi API
   ↓
Backend
   ↓
Frontend
```

El frontend no se comunica directamente con Wompi para procesar la transacción del sistema.

---

## Manejo de estados

Las transacciones manejan diferentes estados durante su ciclo de vida.

Por ejemplo:

```text
PENDING
   ↓
Procesamiento del pago
   ↓
APPROVED / DECLINED / ERROR
```

El resultado final es consultado mediante:

```http
GET /transactions/:id/payment/status
```

---

## Manejo de stock

Antes de crear una transacción se valida que exista stock suficiente:

```text
Stock disponible >= cantidad solicitada
```

Si no existe suficiente inventario, la API responde con un error indicando que el stock es insuficiente.

---

## CORS

La aplicación habilita CORS para permitir la comunicación con el frontend:

```typescript
app.enableCors();
```

Esto permite desplegar el frontend y backend como aplicaciones independientes.

---

## Estructura de la solución

La aplicación separa las responsabilidades principales en:

### Domain

Contiene las entidades, enums y contratos relacionados con el dominio.

### Application

Contiene los casos de uso y servicios que implementan las reglas de negocio.

### Infrastructure

Contiene la implementación concreta de:

- Controladores.
- Persistencia.
- TypeORM.
- Integraciones externas.
- Mappers.
- Servicios externos.

Esta separación permite mantener la lógica de negocio independiente de los detalles de infraestructura.

---

## Licencia

Este proyecto fue desarrollado como parte de una prueba técnica.
