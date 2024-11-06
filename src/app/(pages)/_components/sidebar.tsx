import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { label: "Inicio", path: "/inicio" },
    { label: "Incidencias", path: "/incidencias" },
    { label: "Perfil", path: "/profile" },
  ];

  return (
    <aside className="sidebar fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-gray-100 p-4 font-[family-name:var(--font-jost-medium)] z-10">
      <h6 className="mb-4">
        Hola Furro,
        <p className="font-[family-name:var(--font-jost-bold)]">
          ¿Qué quieres hacer hoy?
        </p>
      </h6>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className={"mb-2 font-semibold"}>
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
