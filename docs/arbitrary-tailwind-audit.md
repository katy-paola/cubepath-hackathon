# Auditoría: utilidades Tailwind con valores arbitrarios `[...]`

Segunda ronda de inventario: barrido de patrones `*-[[...]]` en `*.tsx` (aprox. utilidades Tailwind arbitrarias), **agrupado por las mismas zonas** que `codebase-inventory.md`.

**Nota:** `transition-[prop1,prop2]` (p. ej. en `button.tsx`) cuenta como arbitrario sintácticamente; es una lista de propiedades, no un “token roto” de espaciado.

---

## Resumen por archivo (volumen de coincidencias)

| Archivo                                      | Coincidencias  | Grupo inventario                                                                             |
| -------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `components/landing/generate-section.tsx`    | ~~53~~ **↓**   | C — grid simplificado, `max-w-page`, `rounded-3xl`, tokens; quedan anclajes Figma (robot/IA) |
| `app/gallery/page.tsx`                       | ~~40~~ **~4**  | A — `flex`+`lg:w-80`, `min-w-demo-rail` en tema; sin `grid-cols-[...]`                       |
| `components/progress/progress-card.tsx`      | ~~38~~ **~14** | D — `min-h-52` (~208px), `max-w-card-promo`, tokens métrica                                  |
| `components/training/training-day-card.tsx`  | ~~37~~ **~8**  | D — tokens `success-border` / `success-ink`, `p-4`/`p-6`, `w-36`                             |
| `components/progress/intensity-meter.tsx`    | 17             | D                                                                                            |
| `components/landing/hero.tsx`                | ~~9~~ **1**    | C — `text-[0px]` en contenedor del título (truco layout)                                     |
| `components/landing/adjust-routine-card.tsx` | 9              | C                                                                                            |
| `components/home/workout-section.tsx`        | ~~9~~ **5**    | C — gaps y tipografía a escala (`gap-4`, `gap-6`, `text-xs`…`text-3xl`)                      |
| `components/progress/progress-section.tsx`   | 6              | D — parcial: `max-w-page`, gaps de escala, `text-3xl`                                        |
| `app/page.tsx`                               | ~~7~~ **0**    | A — móvil progreso: `max-w-sm`; imports directos a componentes                               |
| `components/progress/mini-chart.tsx`         | ~~5~~ **0**    | D — `bg-primary` / `bg-primary/20`, escala `h-8`, `w-2`, `gap-1`                             |
| `components/ui/select.tsx`                   | ~~3~~ **0**    | B — migrado a `rounded-xl` / `rounded-b-xl` / `size-6`                                       |
| `components/home/home-header.tsx`            | ~~2~~ **0**    | C                                                                                            |
| `components/ui/button.tsx`                   | 1              | B                                                                                            |
| `components/ui/select-box.tsx`               | ~~1~~ **0**    | B — ancho por defecto `w-40` (10rem ≈ 160px; antes 162px)                                    |
| `components/brand/**`, `components/icons/**` | **0**          | E                                                                                            |

---

## Patrones más repetidos (qué atacar primero)

1. **Espaciado:** `gap-[Npx]`, `p-[Npx]`, `px/py` responsivos, `gap-x-[24px]` → mapear a escala `gap-4`, `gap-6`, `p-4`, `p-6`, etc., o tokens en `@theme` si Figma cierra escala.
2. **Tipografía:** `text-[20px]`, `leading-[32px]` → `text-xl`, `leading-8`, etc.
3. **Contenedores:** `max-w-[1232px]`, `rounded-[24px]` → `max-w-*` de tema o `rounded-3xl` (24px) donde coincida la escala.
4. **Colores:** `bg-[#...]`, `text-[#...]` → variables `--color-*` ya en `:root` / `@theme` (p. ej. `bg-primary-soft`, `text-primary-foreground`).
5. **Layout fijo:** `h-[200px]`, `w-[162px]` en cards → revisar si puede ser `min-h-*` / `w-full` + padding o tokens semánticos (`card` height).

---

## Excepciones razonables (no priorizar)

- **`intensity-meter.tsx`:** muchos `inset-[...%]` y tamaños subpixel (`h-[3.128px]`) son **anclaje Figma** del SVG compuesto; migrarlos a tokens tiene bajo ROI salvo rediseño.
- **`gallery/page.tsx`:** página de demo; útil como checklist visual al migrar tokens, **no** como bloquea producto.

---

## Prioridad sugerida de migración (“poco a poco”)

| Orden           | Objetivo                                        | Motivo                                                                                                                                                                                       |
| --------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ~~1~~ **Hecho** | `components/ui/select.tsx`, `select-box.tsx`    | `rounded-xl`, `size-6`, `w-40` por defecto.                                                                                                                                                  |
| ~~2~~ **Hecho** | `app/page.tsx`, `home-header`, `hero`           | Tokens `--page-shell`, `--hero-*`, `max-w-page`; espaciado `gap-8`/`md:gap-16`; hero `rounded-3xl`, tipografía `text-2xl`…`lg:text-5xl`. Queda 1 arbitrary en `page` y `text-[0px]` en hero. |
| 3               | `generate-section`, `adjust-routine-card`       | Mayor densidad; conviene tras fijar escala tipográfica/espaciado en `@theme`.                                                                                                                |
| 4               | `progress-*`, `training-*`, `training-day-card` | Muchos valores; compartir escala con landing reduce trabajo.                                                                                                                                 |
| 5               | `app/gallery/page.tsx`                          | Alinear al final cuando el resto esté estable.                                                                                                                                               |

---

## Cómo se generó

Búsqueda por regex de utilidades con corchetes en `*.tsx` (equivalente a clases Tailwind `*-[[...]]`). Revisar manualmente al migrar: algunas coincidencias pueden ser listas de propiedades (`transition-[...]`).
