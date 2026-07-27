import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fradim.com.br"),
  title: {
    default: "Marcelo Fradim — Inteligência Artificial, Inovação e Negócios",
    template: "%s | Marcelo Fradim",
  },
  description:
    "Marcelo Fradim explora a interseção entre inteligência artificial, inovação, negócios, marketing, tecnologia, cultura e memória.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "https://fradim.com.br",
    title: "Marcelo Fradim — Human Creativity × Artificial Intelligence",
    description:
      "Um laboratório digital sobre criatividade humana, inteligência artificial, tecnologia, negócios e projetos reais.",
    siteName: "Marcelo Fradim",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo Fradim — Human Creativity × Artificial Intelligence",
    description:
      "Inteligência artificial, inovação, negócios, tecnologia, cultura e experimentação.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
