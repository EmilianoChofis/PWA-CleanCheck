import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { label: "Inicio", path: "/inicio" },
    { label: "Incidencias", path: "/incidencias" },
    { label: "Perfil", path: "/profile" },
  ];

  return (
    <aside className="sidebar w-64 bg-gray-100 h-full p-4 font-[family-name:var(--font-jost-medium)]">
      <h6 className="mb-4">
        Hola Furro,
        <p className="font-[family-name:var(--font-jost-bold)]">¿Qué quieres hacer hoy?</p>
      </h6>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={"mb-2 font-semibold"}
            >
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
