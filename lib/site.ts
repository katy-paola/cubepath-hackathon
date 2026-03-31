/**
 * Base URL para metadata que requieren URL absoluta (Open Graph, canonical, etc.).
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
 */
export function getMetadataBase(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    try {
      return new URL(explicit);
    } catch {
      // ignore invalid env
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export const SITE_DESCRIPTION =
  "Rutina de running personalizada: genera y adapta tu plan con IA, entrena día a día y sigue tu progreso.";
