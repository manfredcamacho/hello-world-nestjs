# Bootcamp Node.js - API REST con NestJS

Una API REST completa desarrollada con NestJS como parte del bootcamp de Node.js. Este proyecto implementa un sistema modular con autenticación JWT, gestión de productos, usuarios, integración con APIs externas y sistema de caché.

## 🚀 Características

### Módulos Implementados

- **🔐 Autenticación (Auth)**: Sistema completo de autenticación con JWT y Passport
  - Login con estrategia local
  - Protección de rutas con JWT Guards
  - Gestión de tokens con expiración

- **👥 Usuarios (Users)**: CRUD completo de usuarios
  - Registro y gestión de usuarios
  - Esquemas de validación con class-validator
  - Integración con sistema de autenticación

- **📦 Productos (Products)**: Gestión de catálogo de productos
  - CRUD completo con MongoDB
  - DTOs para validación de datos
  - Esquemas Mongoose

- **📰 Noticias (News)**: Integración con API externa de noticias
  - Consumo de NewsAPI
  - Sistema de caché con Redis

- **🐙 GitHub**: Webhook handler para eventos de GitHub
  - Procesamiento de eventos de GitHub
  - Integración con webhooks

### Tecnologías y Herramientas

- **Framework**: NestJS con TypeScript
- **Base de Datos**: MongoDB con Mongoose
- **Caché**: Redis con Keyv
- **Autenticación**: JWT + Passport (Local & JWT strategies)
- **Validación**: class-validator y class-transformer
- **Documentación**: Swagger/OpenAPI
- **Testing**: Jest
- **Linting**: ESLint + Prettier

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **MongoDB** (local o MongoDB Atlas)
- **Redis** (local o Redis Cloud)

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/bootcamp-nodejs

# Redis para caché
REDIS_URI=redis://localhost:6379

# API Key para NewsAPI
NEWS_API_KEY=tu_news_api_key_aqui

# Configuración de caché (tiempo en segundos)
CACHE_TTL=300

# Puerto de la aplicación (opcional, por defecto 3000)
PORT=3000
```

### Obtener API Keys

1. **NewsAPI**: Regístrate en [NewsAPI](https://newsapi.org/) para obtener tu API key gratuita
2. **MongoDB Atlas** (opcional): Si prefieres usar MongoDB en la nube, crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
3. **Redis Cloud** (opcional): Para Redis en la nube, puedes usar [Redis Cloud](https://redis.com/redis-enterprise-cloud/)

## 🛠️ Instalación y Configuración

### 1. Clonar e instalar dependencias

```bash
# Instalar dependencias
npm install
```

### 2. Configurar servicios locales

#### MongoDB (usando Docker)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Redis (usando Docker)
```bash
docker run -d -p 6379:6379 --name redis redis:alpine
```

### 3. Configurar variables de entorno

Crea el archivo `.env` con las variables mencionadas anteriormente.

## 🚀 Ejecutar la Aplicación

### Desarrollo
```bash
# Modo desarrollo con hot reload
npm run start:dev

# Modo desarrollo con debug
npm run start:debug
```

### Producción
```bash
# Compilar el proyecto
npm run build

# Ejecutar en producción
npm run start:prod
```

La aplicación estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

```
http://localhost:3000/api
```

La documentación incluye todos los endpoints disponibles, esquemas de datos y ejemplos de uso.

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Ejecutar en modo desarrollo
npm run start:debug        # Ejecutar con debugger

# Producción
npm run build              # Compilar TypeScript
npm run start:prod         # Ejecutar versión compilada

# Calidad de código
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código con Prettier

# Testing
npm run test               # Tests unitarios
npm run test:e2e           # Tests end-to-end
npm run test:cov           # Cobertura de tests
```

## 🏗️ Estructura del Proyecto

```
src/
├── auth/                  # Módulo de autenticación
│   ├── guards/           # Guards JWT y Local
│   ├── strategies/       # Estrategias Passport
│   └── ...
├── users/                # Módulo de usuarios
│   ├── dto/             # Data Transfer Objects
│   ├── schemas/         # Esquemas Mongoose
│   └── ...
├── products/            # Módulo de productos
│   ├── dto/
│   ├── schemas/
│   └── ...
├── news/                # Módulo de noticias
├── github/              # Módulo GitHub webhooks
├── types/               # Tipos TypeScript globales
├── config.ts            # Configuración de variables de entorno
├── app.module.ts        # Módulo principal
└── main.ts             # Punto de entrada
```

## 🔒 Autenticación

El sistema utiliza JWT para la autenticación:

1. **Login**: `POST /auth/login` con credenciales
2. **Perfil protegido**: `GET /profile` (requiere token JWT)

### Ejemplo de uso:

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario", "password": "contraseña"}'

# Usar token en requests protegidos
curl -X GET http://localhost:3000/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🐳 Docker (Opcional)

Si prefieres usar Docker para todo el stack:

```bash
# Crear red Docker
docker network create bootcamp-network

# MongoDB
docker run -d --name mongodb --network bootcamp-network -p 27017:27017 mongo:latest

# Redis
docker run -d --name redis --network bootcamp-network -p 6379:6379 redis:alpine

# Aplicación (después de crear Dockerfile)
docker build -t bootcamp-nodejs .
docker run -d --name app --network bootcamp-network -p 3000:3000 bootcamp-nodejs
```

## 🤝 Contribución

Este es un proyecto de bootcamp, pero si quieres contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Notas de Desarrollo

- El token JWT tiene una expiración de 20 segundos (configurado para desarrollo)
- El sistema de caché está configurado globalmente con Redis
- Todos los módulos siguen las mejores prácticas de NestJS
- Se incluye validación de datos con class-validator en todos los DTOs

## 📄 Licencia

Este proyecto es parte de un bootcamp educativo y no tiene licencia específica.