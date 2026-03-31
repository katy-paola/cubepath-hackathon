# Inventario de código — Stridia (cubepath-hackathon)

Documento generado por **orquestación multi-agente**: un barrido global más **cinco grupos** (app shell, UI/lib, landing/home, progress/training, brand/icons). Sirve como mapa para migraciones (p. ej. tokens Tailwind / feedback de diseño) **por zonas**.

---

## Resumen ejecutivo

| Grupo | Ámbito                                         | Archivos TS/TSX (aprox.)                               | Notas                                                        |
| ----- | ---------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| **A** | `app/`, `next.config.ts`                       | 5                                                      | Rutas estáticas `/`, `/gallery`; sin API routes              |
| **B** | `components/ui/`, `lib/`                       | 9 + tests                                              | CVA `Button`, `SelectBox`; barrel solo UI + `InfoIconButton` |
| **C** | `components/landing/`, `components/home/`      | 7 + tests hero                                         | Client: generate + adjust; server: hero, header, workout     |
| **D** | `components/progress/`, `components/training/` | 8                                                      | Sin tests dedicados en estas carpetas                        |
| **E** | `components/brand/`, `components/icons/`       | ~18                                                    | SVG raw (~10) + agregador `stridia-icons`                    |
| **F** | Config de tests                                | `vitest.config.ts`, `vitest.setup.tsx`, `*.test.ts(x)` | Vitest + RTL; mocks `next/image`, `next/font`                |

**Stack:** Next.js 16 (App Router), React 19, Tailwind v4 (`@import "tailwindcss"`, `@theme inline` en `globals.css`), CVA en `Button`.

---

## A — App shell y configuración

### Archivos (propósito)

| Archivo                | Propósito                                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/layout.tsx`       | Layout raíz: fuentes Google (`Space_Grotesk`, `Geist_Mono`), metadata, import de CSS global, `body` `min-h-full flex flex-col`. Sin providers React.                                         |
| `app/page.tsx`         | Home: compone header, hero, generate, workout (responsive), progress (responsive), adjust routine (responsive).                                                                              |
| `app/gallery/page.tsx` | Galería de UI: hero, secciones, botones, selects, training card, progress, notas de tokens.                                                                                                  |
| `app/globals.css`      | Entrada Tailwind v4, `:root` tokens, `@theme inline` (colores + fuentes), dark vía `prefers-color-scheme`, estilos `.button-primary` / `.button-secondary`, touch targets en pointer coarse. |
| `next.config.ts`       | `NextConfig` por defecto; sin opciones custom aún.                                                                                                                                           |

### Rutas

| Path       | Archivo                | Comportamiento             |
| ---------- | ---------------------- | -------------------------- |
| `/`        | `app/page.tsx`         | Estático (SSG por defecto) |
| `/gallery` | `app/gallery/page.tsx` | Estático                   |

### Dependencias `@/` desde app

- **`page.tsx`:** `landing` (Hero, GenerateSection, AdjustRoutineCard), `progress` (ProgressSection), `home` (HomeHeader, WorkoutSection).
- **`gallery/page.tsx`:** `brand`, `icons`, `landing/*` por archivo, `lib/routine-form-options`, `progress/progress-section`, `training`, `ui`.

---

## B — `components/ui` y `lib`

### Archivos

| Archivo                       | Rol                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `button.tsx`                  | `Button` (CVA: variant primary/secondary, size default/sm), icon opcional; export `buttonVariants`, `ButtonProps`. |
| `select.tsx`                  | `SelectTrigger`, `SelectContent`, `SelectItem`, `FormField`; ARIA listbox/option; `next/image` en flecha opcional. |
| `select-box.tsx`              | Cliente: dropdown con teclado, click fuera, `aria-activedescendant`.                                               |
| `info-icon-button.tsx`        | Botón icono info + tooltip opcional.                                                                               |
| `index.ts`                    | Barrel: `Button`, `Select*`, `FormField`, `SelectBox`, `InfoIconButton`.                                           |
| `select-box.test.tsx`         | Vitest: abre listbox y selecciona opción.                                                                          |
| `lib/utils.ts`                | `cn`: une clases truthy (no usa clsx/twMerge).                                                                     |
| `lib/utils.test.ts`           | Tests de `cn`.                                                                                                     |
| `lib/routine-form-options.ts` | Opciones y defaults compartidos de formularios de rutina (`GenerateSection`, `AdjustRoutineCard`).                 |

### Grafo de dependencias internas

- `select-box.tsx` → `select.tsx`.
- `button.tsx` → `icons` (Sparkles); `select.tsx` → `icons` (ArrowDown); `info-icon-button` → `icons` (Info).
- Resto comparte `@/lib/utils` (`cn`).

### Notas CVA / Select

- **Button:** variantes enlazan clases globales `button-primary` / `button-secondary` definidas en `globals.css`.
- **SelectBox:** composición propia (no Radix Select).
- **`cn`:** implementación mínima; si se introduce `tailwind-merge`, conviene centralizarlo aquí.

---

## C — `components/landing` y `components/home`

### Componentes

| Archivo                   | Props destacadas                            | Client / server                        |
| ------------------------- | ------------------------------------------- | -------------------------------------- |
| `hero.tsx`                | `titlePrefix`, `titleHighlight`, `subtitle` | **Server** (`next/font` Lexend/Fugaz). |
| `generate-section.tsx`    | `device` desktop/tablet/mobile              | **Client** (estado formularios).       |
| `adjust-routine-card.tsx` | `device`                                    | **Client**.                            |
| `home-header.tsx`         | `actionLabel`                               | **Server**.                            |
| `workout-section.tsx`     | `device`                                    | **Server**.                            |

### Assets (URLs bajo `public/`)

- **`adjust-routine-assets.ts`:** sparkles, select-arrow → `/figma-assets/adjust-routine/*`.
- **`generate-section-assets.ts`:** sliders, arrow, sparkles, partes IA, checkmark, ai-icon, idea → `/figma-assets/generate-section/*`.

### Barrel

- `landing/index.ts`: `export *` de hero, generate-section, adjust-routine-card.

### Uso en app

- **`/`:** landing + home (header, workout).
- **`/gallery`:** landing; no importa `home`.

---

## D — `components/progress` y `components/training`

### Progress

| Archivo                | Responsabilidad                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `intensity-assets.ts`  | URLs SVG `/figma-assets/progress-intensity/`, tipo `IntensityLevel`.                     |
| `intensity-meter.tsx`  | Capas `next/image` según `level` (low/medium/high).                                      |
| `mini-chart.tsx`       | Gráfico decorativo de barras.                                                            |
| `progress-card.tsx`    | Tres variantes de métrica; usa `IntensityMeter`, `MiniChart`, `imgVector13` para tiempo. |
| `progress-section.tsx` | Título + tres `ProgressCard`.                                                            |
| `index.ts`             | Re-exports públicos.                                                                     |

**Relaciones:** `IntensityMeter` y `ProgressCard` consumen `intensityAssets`; `MiniChart` independiente; `ProgressCard` orquesta todo según `type`.

### Training

| Archivo                 | Responsabilidad                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `training-day-card.tsx` | Tarjeta día (un solo componente): cabecera, lista de ejercicios + info, bloque razón, formulario adaptación, footer. |

### Tests

- No hay `*.test.*` en estas carpetas.

---

## E — Brand, icons

### Brand

- `stridia-logo.tsx` — `StridiaLogo`.
- `app-header.tsx` — `AppHeader` (p. ej. galería / demos; la home usa `home-header`).
- `raw/`: `ADefault`, `ASmall`, `RunDefault`, `RunSmall`, `StridDefault`, `StridSmall` (SVG modulares).

### Icons

- **`stridia-icons.tsx`:** agregador con `IconRoot`, iconos simples y compuestos (`ArtificialIntelligence`, `Info`).
- **`raw/`:** SVG modulares importados solo desde `stridia-icons.tsx` (sin barrel).
- **`index.ts`:** re-exporta solo `stridia-icons`.

---

## F — Tests y tooling

- **Vitest** (`vitest.config.ts`): entorno `jsdom`, alias `@/*`, setup con mocks `next/image` y `next/font/google`.
- **Tests existentes:** `lib/utils.test.ts`, `components/landing/hero.test.tsx`, `components/ui/select-box.test.tsx`.

---

## Orden sugerido para atacar mejoras “poco a poco”

1. **Tokens globales** (`globals.css`): tipografía / espaciado en `@theme` antes de tocar muchas vistas.
2. **`components/ui`:** ya alineado en parte (Button); Select/FormField como siguiente candidato a escala consistente.
3. **`landing` + `home`:** muchos valores arbitrarios; migrar sección a sección (p. ej. Hero → Generate).
4. **`progress` + `training`:** densidad de assets SVG; unificar `sizes` / patrones `Image` si se retocan layouts.
5. **`gallery`:** superficie de QA visual al cambiar tokens.

---

_Subagentes por grupo: app shell, UI/lib, landing/home, progress/training, brand/icons — salidas fusionadas en este documento._

---

## Ver también

- **[`arbitrary-tailwind-audit.md`](./arbitrary-tailwind-audit.md)** — segunda ronda: conteo de utilidades arbitrarias `-[...]` por archivo, prioridad de migración a tokens/utilities y excepciones (p. ej. `intensity-meter`).
