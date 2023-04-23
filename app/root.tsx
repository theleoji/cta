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
          <header className="w-full h-20 bg-gray-900 font-underground dark:bg-gray-950">
            <div className="max-w-5xl mx-auto h-full flex items-center justify-between">
              <div className="flex items-end">
                <h1 className="text-2xl text-gray-100">Transit</h1>
                <h2 className="text-xl text-gray-400 ml-4">
                  A proof of concept for a transit tracker
                </h2>
              </div>
            </div>
          </header>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
