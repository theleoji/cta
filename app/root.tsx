import type { V2_MetaFunction } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import tailwind from "./tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: "https://use.typekit.net/ifo6hqw.css" },
    { rel: "stylesheet", href: tailwind },
  ];
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Transit Tracker",
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-navigo">
        <div className="w-full h-full min-h-screen max-w-screen">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
