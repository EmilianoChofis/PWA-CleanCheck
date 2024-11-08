"use client";
import Title from "@/app/_components/title";
import Breadcrumb from "../../_components/breadcrumb";
import CategoryButton from "../../_components/category_button";

export default function Building() {
  const handleCategoryClick = (category: string) => {
    console.log(`Clicked on ${category || "all"}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-5 w-full font-[family-name:var(--font-jost-regular)]">
      <Breadcrumb
        items={[
          { label: "Inicio", link: "/home" },
          { label: "Edificio" },
          { label: "Habitaciones", disabled: true },
        ]}
      />
      <main className="container-fluid">
        <Title className="text-2xl text-primary" title="Habitaciones" />
        <div className="px-2 py-2">
          <CategoryButton
            categories={[
              { label: "Todas", active: true },
              { label: "Sin limpiar", active: false },
              { label: "Limpias", active: false },
              { label: "Reportadas", active: false },
              { label: "Deshabilitadas", active: false },
            ]}
            onCategoryClick={(category) => handleCategoryClick(category)}
          />
        </div>
      </main>
    </div>
  );
}
