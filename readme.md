# Ahorcado Backend

Backend del proyecto distribuido **Ahorcado**, desarrollado para la materia de Sistemas Distribuidos.  
Este servidor permite la comunicación en tiempo real entre múltiples clientes mediante WebSockets, administrando la lógica principal del juego del ahorcado.

---

## Descripción

Este proyecto consiste en el backend de un sistema distribuido basado en el juego del ahorcado.  
El servidor administra la comunicación entre los clientes conectados, procesa las letras enviadas por los jugadores y sincroniza el estado de la partida en tiempo real.

La comunicación bidireccional se realiza mediante WebSockets, permitiendo actualizaciones instantáneas para todos los jugadores conectados.

---

## Objetivo

Desarrollar un sistema distribuido funcional para la materia de Sistemas Distribuidos, implementando comunicación en tiempo real entre múltiples clientes y un servidor.

---

## Problema que resuelve

El proyecto demuestra cómo múltiples clientes pueden interactuar en tiempo real dentro de una aplicación distribuida utilizando WebSockets, permitiendo sincronización de eventos y comunicación instantánea entre servidor y clientes.

---

## Tecnologías utilizadas

- 🟢 Node.js
- 🚂 Express
- 🔌 WebSocket

---

## Arquitectura y funcionamiento

- **Express** crea un servidor HTTP encargado de atender peticiones REST.
- **WebSockets** permiten la comunicación bidireccional en tiempo real entre clientes y servidor.
- Los clientes envían letras al servidor y este notifica automáticamente los cambios a todos los jugadores conectados mediante un **broadcast**.
- **Node.js** ejecuta todo el sistema de forma asíncrona y eficiente.

---

## Características principales

- Comunicación en tiempo real
- Sincronización de partidas entre múltiples clientes
- Broadcast de eventos a todos los jugadores conectados
- Procesamiento de letras enviadas por los jugadores
- Manejo del estado de la partida

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Gravy7w7/ahorcado-backend.git
```
### 2. Entrar a la carpeta del proyecto

```bash
cd ahorcado-backend
```
### 3. Instalar dependencias

```bash
npm install
```
### 4. Ejecutar el proyecto

```bash
npm run dev
```
---

## Requisitos

- Node.js **v22.14.0**
- npm instalado
---

## Estado del proyecto

✅ Finalizado y ejecutable. Aún puede mejorarse en algunos aspectos, pero actualmente el servidor puede levantarse y permitir partidas funcionales.




