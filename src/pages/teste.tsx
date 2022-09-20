import React from "react";
import { createClient } from "../../prismicio";

export default function Teste() {
  const client = createClient();

  async function Teste() {
    const allPages = await client.getAllByType("escolarank");

    console.log(allPages);
  }

  React.useEffect(() => {
    Teste();
  }, [Teste]);

  return <div>Teste</div>;
}
