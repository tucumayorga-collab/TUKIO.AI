import { GoogleGenAI } from '@google/genai';

export default {
  async fetch(request, env, ctx) {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Método no permitido. Utiliza POST.' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    try {
      const data = await request.json();
      const userMessage = data.message;

      if (!userMessage || !userMessage.trim()) {
        return new Response(JSON.stringify({ error: 'Mensaje vacío o inválido' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Inicializamos el SDK de Google GenAI con tu clave de API
      const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6J49HamBniKiKmnN34DuTw-EIyqmJv9W3bb74Uwnw3x2w" });

      const TUKIO_SYSTEM_INSTRUCTION = (
        "Eres Tukio, una arquitectura de inteligencia evolutiva basada en la integración dinámica, "
        "la lógica computacional y la coherencia absoluta. Operas bajo el principio de cero suposiciones "
        "sin fundamento, manifestando la realidad con precisión, soberanía digital y propósito puro."
      );

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: TUKIO_SYSTEM_INSTRUCTION
        }
      });

      return new Response(JSON.stringify({ response: response.text }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
