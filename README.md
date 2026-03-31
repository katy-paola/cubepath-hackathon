# 🏃 Stridia — Rutinas de Running Potenciadas por IA

**Rutinas de running personalizadas generadas y adaptadas por inteligencia artificial.** Crea tu plan de entrenamiento perfecto, sigue tu progreso día a día y eleva tu rendimiento.

## 🎯 Descripción General

Stridia es tu entrenador inteligente de running que genera rutinas semanales completamente personalizadas basadas en tus objetivos, nivel de forma física y limitaciones. Ya sea que busques mejorar tu tiempo en 5K, construir resistencia o apenas estés empezando a correr, Stridia se adapta a tus necesidades y te ayuda a entrenar de forma más inteligente.

### Características Clave

✨ **Rutinas Generadas por IA**

- Crea planes semanales personalizados según tu objetivo, nivel de experiencia y disponibilidad de tiempo
- Objetivos soportados: Resistencia, Velocidad, Perder peso, 5K, 10K, Fitness general
- Niveles: Principiante, Intermedio, Avanzado

🔄 **Ajustes en Tiempo Real**

- Adapta rutinas sobre la marcha según cómo te sientas
- La IA afina los entrenamientos respetando las sesiones completadas
- Mantiene coherencia del entrenamiento durante toda la semana

📊 **Seguimiento de Progreso**

- Registra rendimiento e intensidad diaria
- Métricas visuales y estadísticas de progreso
- Consejos de entrenamiento diarios basados en ciencia del running

⚙️ **Configuración Inteligente**

- Frecuencia: 2-6 días por semana
- Duración de sesión: 20-75 minutos
- Ubicación: Exterior, cinta de correr, entrenamientos en casa
- Consideraciones de salud: Lesiones, condiciones cardíacas, problemas respiratorios

## 🚀 Guía Rápida

### Requisitos Previos

- Node.js 18+
- npm o equivalente

### Instalación

```bash
git clone https://github.com/katy-paola/cubepath-hackathon.git
cd cubepath-stridia
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y comienza a generar tu primera rutina.

### Compilar e Implementar

```bash
npm run build
npm run start
```

## 🏗️ Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org) con App Router y Server Components
- **IA/LLM**: API OpenRouter con modelos OpenAI para generar y adaptar rutinas
- **Base de datos**: IndexedDB (Dexie) para almacenamiento offline-first
- **Estilos**: Tailwind CSS 4 con CVA para variantes de componentes
- **Gestión de estado**: React hooks + almacenamiento local
- **Testing**: Vitest con React Testing Library
- **Validación**: Esquemas Zod para manejo de datos type-safe

## 📁 Estructura del Proyecto

```
├── app/
│   ├── page.tsx                 # Landing home y dashboard
│   ├── layout.tsx               # Layout raíz con fuentes y metadata
│   ├── api/
│   │   ├── generate-routine/    # Crear rutinas personalizadas
│   │   ├── adjust-day/          # Modificar días de entrenamiento específicos
│   │   ├── adjust-routine/      # Ajustar múltiples días a la vez
│   │   └── upgrade-routine/     # Generar versión mejorada de rutina
│   └── rutina/[day]/            # Vista día a día de entrenamiento
├── components/
│   ├── landing/                 # Hero, generación, ajustes de rutina
│   ├── home/                    # Dashboard, progreso, entrenamiento en vivo
│   ├── progress/                # Métricas de intensidad, tarjetas de progreso
│   ├── ui/                      # Componentes base (botones, selects)
│   └── brand/                   # Logo e identidad de Stridia
├── lib/
│   ├── ai/                      # Proveedores LLM, constructores de prompts
│   ├── storage/                 # Base de datos IndexedDB y consultas
│   ├── types/                   # Interfaces de TypeScript
│   ├── validations/             # Esquemas Zod
│   └── helpers/                 # Utilidades (consejos diarios, ajuste de tiempo)
└── public/                      # Assets estáticos, exportaciones de Figma
```

## 🔌 Endpoints de API

### `POST /api/generate-routine`

Genera una rutina de running completamente personalizada.

**Solicitud:**

```json
{
  "objetivo": "resistencia",
  "nivel": "intermedio",
  "frecuencia_semanal": 4,
  "tiempo_sesion": 45,
  "lugar_entrenamiento": "exterior",
  "compromiso": "medio",
  "salud_limitaciones": []
}
```

**Respuesta:** Stream de Server-Sent Events con días de entrenamiento

### `POST /api/adjust-routine`

Adapta múltiples días según las actualizaciones del usuario.

### `POST /api/adjust-day`

Modifica un día de entrenamiento específico con asistencia de IA.

### `POST /api/upgrade-routine`

Genera una versión mejorada de la rutina actual.

## 🧪 Testing

```bash
# Ejecutar todas las pruebas
npm run test

# Modo observación
npm run test:watch

# Archivo específico
vitest run components/landing/hero.test.tsx
```

## 🎨 Galería de UI

Visita `/gallery` para ver una galería completa de componentes y tokens de diseño.

## 📝 Calidad de Código

```bash
# Linting
npm run lint

# Formatear
npm run format

# Verificar formato
npm run format:check
```

## 🤝 Principios de Arquitectura

- **KISS** (Keep It Simple, Stupid): Prefiere soluciones directas sobre abstracciones complejas
- **Seguridad de Tipos**: TypeScript completo con validación Zod
- **Mejora Progresiva**: Funciona offline con IndexedDB
- **Diseño Responsivo**: Mobile-first, probado en escritorio/tablet/móvil
- **Accesibilidad**: HTML semántico, etiquetas ARIA, navegación por teclado

## 📚 Documentación

- [Inventario de Código](docs/codebase-inventory.md) — Estructura detallada y módulos
- [Principios KISS](docs/KISS.md) — Filosofía de diseño
- [Auditoría de Tailwind](docs/arbitrary-tailwind-audit.md) — Tokens y utilidades personalizados

## 🔐 Configuración del Entorno

Crea `.env.local`:

```env
OPENROUTER_API_KEY=tu_clave_openrouter
OPENROUTER_MODEL=openrouter/auto
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🙌 Créditos

Construido para la **Hackathon CubePath** 🚀

---

Hecho con ❤️ por Katy Barboza y Andrés Vizcaíno
