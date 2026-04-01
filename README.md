# 🏃 Stridia — Rutinas de Running Potenciadas por IA

**Tu entrenador personal de running con inteligencia artificial.** Genera rutinas personalizadas, adapta tu entrenamiento sobre la marcha y sigue tu progreso en tiempo real.

## 📱 Demo

[🚀 Ver Stridia en línea](https://cubepath-hackathon.vercel.app) _(Reemplaza con tu URL de demo)_

## 🎯 ¿Qué es Stridia?

Stridia genera rutinas de entrenamiento personalizadas basadas en tu objetivo (5K, resistencia, velocidad, etc.), nivel de forma física y disponibilidad de tiempo. La IA crea un plan semanal realista, y puedes ajustar cualquier día según cómo te sientas.

**Lo que ves:**

- ✨ Generación de rutina personalizada
- 🔄 Ajustes en tiempo real
- 📊 Seguimiento de progreso
- 💡 Consejos de entrenamiento

## 🎬 Capturas & GIFs

_[Aquí van tus capturas o GIFs del flujo de generación, ajuste y progreso]_

```
Ejemplos:
1. Seleccionar objetivo y configuración → Generar rutina
2. Ver plan semanal → Ajustar día específico con IA
3. Registrar progreso → Visualizar estadísticas
```

## 🏗️ Cómo usamos CubePath

Usamos **CubePath con Dockploy** para desplegar nuestra app de Next.js y gestionar el entorno de despliegue de forma centralizada. Esta integración nos permite:

✅ **Despliegue automatizado** - Dockploy se encarga de compilar y desplegar Stridia en cada actualización  
✅ **Gestión centralizada del entorno** - Configuración, variables de entorno y secretos en un solo lugar  
✅ **Escalabilidad sin complejidad** - CubePath + Dockploy manejan la infraestructura, nosotros nos enfocamos en la app

## 🚀 Inicio Rápido

```bash
# Clonar repositorio
git clone https://github.com/katy-paola/cubepath-hackathon.git
cd cubepath-stridia

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🔧 Configuración

Crea `.env.local`:

```env
OPENROUTER_API_KEY=tu_clave_openrouter
```

## 📚 Stack

- **Next.js 16** - App Router moderno
- **React 19** - UI responsiva
- **Tailwind CSS 4** - Estilos
- **OpenRouter API** - Modelos LLM para IA
- **Dexie (IndexedDB)** - Almacenamiento local
- **Zod** - Validación de tipos

## 📦 Compilar

```bash
npm run build
npm run start
```

## 🤝 Créditos

Construido para **CubePath Hackathon** 🚀

Equipo: Andrés Vizcaíno y Katy Barboza
