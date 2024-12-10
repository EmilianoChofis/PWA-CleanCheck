"use client";
import React, { useEffect, useState } from "react";
import Title from "@/app/_components/title";
import Searchbar from "../../_components/searchbar";
import CategoryButton from "../../_components/category_button";
import IncidencesTable from "../../_components/incidences_table";
import { useIncidenceContext } from "../../../context/IncidencesContext";
import { getIncidences } from "@/app/utils/incidence-service";
import { useRouter } from "next/navigation";
import { Incidence } from "@/app/types/Incidence";

export default function Incidences() {
  const { setSelectedIncidence } = useIncidenceContext();
  const [reports, setReports] = useState([]);
  const [categories, setCategories] = useState([
    { label: "Todas", value: "all", active: true },
    { label: "En proceso", value: "in-process", active: false },
    { label: "Deshabilitadas", value: "disabled", active: false },
    { label: "Disponibles", value: "available", active: false },
  ]);

  const fetchIncidences = async () => {
    try {
      const response = await getIncidences();
      setReports(response.data);
    } catch (error) {
      throw new Error("Error al obtener las incidencias: " + error);
    }
  };

  useEffect(() => {
    fetchIncidences();
  }, []);

  const router = useRouter();
  const handleReportClick = (report: Incidence) => {
    setSelectedIncidence(report);
    router.push(`/maid/incidences/details`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleCategoryClick = (clickedCategory: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        active: category.value === clickedCategory,
      }))
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 gap-16 w-full font-[family-name:var(--font-jost-regular)]">
      <main className="container-fluid">
        <Title className="text-2xl text-primary" title="Lista de incidencias" />
        <div className="py-2">
          <Searchbar label="Buscar incidencia" onChange={handleSearchChange} />
          <CategoryButton
            categories={categories}
            onCategoryClick={(category) => handleCategoryClick(category)}
          />
        </div>
        <div className="py-2">
          <IncidencesTable reports={reports} onClick={handleReportClick} />
        </div>
      </main>
    </div>
  );
}
