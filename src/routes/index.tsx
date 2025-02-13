import { component$, $, useContext, useSignal } from "@builder.io/qwik";
import { Link, type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { UserContext } from "~/contexts";

export default component$(() => {
  const userData = useSignal<any>(null);
  const investments = useSignal<any>(null);
  const navigate = useNavigate();

  const users = useContext(UserContext);

  const email = "alexamara97@gmail.com";

  const getUserByEmail = $(async () => {
    const response = await fetch(
      `/userServer/api/User/getUserByEmail?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Errore nella richiesta:", response.statusText);
      return;
    }

    userData.value = await response.json();
  });

  const getInvestments = $(async () => {
    const response = await fetch(`/process-api/api/admin/getInvestments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Errore nella richiesta:", response.statusText);
      return;
    }

    investments.value = await response.json();
  });

  const generateFirstAccessLink = $(async () => {
    const response = await fetch(
      `/authapi/api/IdentityUsers/getFirstAccessLink`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData.value),
      }
    );

    if (!response.ok) {
      console.error("Errore nella richiesta:", response.statusText);
      return;
    }

    const res = await response.json();
    console.log(res);
  });

  return (
    <>
      <h1 class="text-3xl font-bold underline hover:text-red-500">Main page</h1>

      <div>
        {users.value.map((user) => (
          <p key={user.name}>
            {user.name} {user.age}
          </p>
        ))}

        <button
          onClick$={() =>
            (users.value = [...users.value, { name: "Jane", age: 20 }])
          }
        >
          add new people
        </button>
        <p>Current person count: {users.value.length}</p>
        <br />

        <Link class="text-blue-500 underline " href="/dashboard">
          Dashboard
        </Link>
        <button
          onClick$={() => navigate("/dashboard")}
          class="bg-blue-500 text-white p-2 rounded-md"
        >
          Dashboard
        </button>
        <br />
        <br />
        <br />
        <button onClick$={() => getUserByEmail()}>Get user by email</button>
        <br />
        <br />
        <br />
        <button onClick$={() => generateFirstAccessLink()}>
          Generate first access link
        </button>
        <br />
        <br />
        <br />
        <button onClick$={() => getInvestments()}>Get investments</button>
        <br />
        <br />
        <br />
        <button class="text-red-500" onClick$={() => (investments.value = {})}>
          Clear investments
        </button>
        <p>Investments: {JSON.stringify(investments.value)}</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
