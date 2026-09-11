import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Porta fixa e exclusiva: esta máquina roda vários projetos "portifolioN" em
  // paralelo na porta padrão 5173 — strictPort evita que este vá parar em outra
  // porta silenciosamente, ou pior, que outro projeto seja confundido com este.
  server: { port: 5273, strictPort: true },
  preview: { port: 5273, strictPort: true },
});
