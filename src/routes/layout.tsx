import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import type { Person } from "~/types";
import { UserContext } from "~/contexts";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const users = useSignal<Array<Person>>([
    {
      name: "John",
      age: 30,
    },
  ]);

  useContextProvider(UserContext, users);
  return (
    <div class="">
      <Slot />
    </div>
  );
});
