import type {LoaderFunction} from "@remix-run/node";
import {redirect} from "@remix-run/node";

export const loader: LoaderFunction =  () => {
  return redirect("/app")
}

export default function Index() {
  return null
}