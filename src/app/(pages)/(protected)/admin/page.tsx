import { auth } from "../../../../../auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  if (session?.user?.role !== "Maid") {
    return <div>Not authorized</div>;
  }

  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
