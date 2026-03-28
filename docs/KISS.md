# KISS (Keep It Simple, Stupid)

## Qué es

**KISS** es un principio de diseño que favorece soluciones **simples** frente a alternativas innecesariamente complejas. El código (y la arquitectura) más simple suele ser más fácil de entender, mantener y depurar.

- Evitar **over-engineering**: abstracciones, patrones o capas que no aportan valor claro ahora.
- Aplicar el principio sobre todo en **lógica de negocio** y **algoritmos**: la primera solución clara que funcione suele ser la mejor candidata hasta que aparezca una necesidad real de generalizar.

## Relación con otras ideas

- **Navaja de Occam**: ante varias explicaciones, suele ser razonable probar primero la más simple (incluido al depurar: causas simples antes que hipótesis raras).
- **YAGNI** (“You Aren’t Gonna Need It”): no construir para un futuro hipotético; encaja con KISS al recortar complejidad no justificada.

## Cómo usarlo en este proyecto (Stridia)

1. **Antes de abstraer**: ¿el duplicado es real o imaginario? ¿Un helper o componente nuevo reduce líneas *y* claridad?
2. **Estado y efectos en React**: preferir estado derivado o un solo lugar de verdad antes que varios `useEffect` que se sincronicen entre sí (menos cascadas, más simple de razonar).
3. **UI**: mismos patrones de layout y tokens ya usados en `app/globals.css` y componentes compartidos antes de inventar variantes nuevas.
4. **Performance**: medir o tener síntoma claro (LCP, bundle) antes de micro-optimizar; KISS no es “sin optimizar”, es **no complicar sin evidencia**.
5. **Estructura**: evitar componentes “demo” que solo componen primitivas para una página; en rutas críticas (`app/page.tsx`) preferir **imports directos** al archivo del componente en lugar de barrels grandes cuando ayude al bundle y a la lectura.

## Referencias

- Guía de ingeniería de software (fundamentos, reglas generales de código — sección KISS): [davichuder.github.io/software-engineering-guide/manuales/fundamentos](https://davichuder.github.io/software-engineering-guide/manuales/fundamentos)
- React — “You might not need an effect”: [react.dev/learn/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)

---

*Documento interno del equipo; alineado con material consultado vía Context7 (`/websites/davichuder_github_io_software-engineering-guide`).*
