"use client";
function Error({ error }: { error: Error }) {
  return (
    <div>
      <h1>Algo salio mal</h1>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;
