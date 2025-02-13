import { component$, useContext } from "@builder.io/qwik";
import { UserContext } from "../../contexts";

export default component$(() => {
  // const users = useContext(UserContext);
  // const theme = useSignal("light");

  const contextUsers = useContext(UserContext);
  return (
    <>
      <div>Dashboard</div>
      <div>
        {contextUsers.value.map((user) => (
          <p key={user.name}>{user.name}</p>
        ))}
      </div>
    </>
  );
});
