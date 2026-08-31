import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { copy } from "~/game/copy";
import stylesheet from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  // The ?v= is a cache key: browsers keep favicons in a separate store that a
  // hard reload does not clear, so bump it whenever the icon changes.
  { rel: "icon", href: "/favicon.png?v=2", type: "image/png" },
];

export const meta: MetaFunction = () => [
  { title: copy.windowTitle },
  {
    name: "description",
    content:
      "Buscaminas porteño: pisá las baldosas de la vereda sin encontrar una floja.",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bliss min-h-screen font-chrome">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
