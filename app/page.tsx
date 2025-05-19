"use client";

import CellWithContextMenu, {
  CellContextMenu,
} from "@/components/roster/CellWithContextMenu";
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/components/MainLayout";
import DataGrid from "@/components/roster/DataGrid";
import { CellClassParams, AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Daftarkan modul-modul yang dibutuhkan
ModuleRegistry.registerModules([AllCommunityModule]); // Daftarkan SelectEditorModule juga

interface RowDataType {
  NO: number;
  KARYAWAN: string;
  JABATAN: string;
  [key: string]: string | number | boolean;
}

// interface ColDefType {
//   headerCheckboxSelection?: boolean;
//   checkboxSelection?: boolean;
//   width?: number;
//   suppressMovable?: boolean;
//   field?: string;
//   valueGetter?: string | ((params: any) => any);
//   editable?: boolean;
//   cellEditor?: string | React.ComponentType;
//   cellEditorParams?: any;
//   valueFormatter?: (params: any) => string;
//   cellRenderer?: string;
//   minWidth?: number;
// }

const GridExample = () => {
  // Row Data: The data to be displayed.

  const [rowData, setRowData] = useState<RowDataType[]>([
    {
      NO: 1,
      KARYAWAN: "John Doe",
      JABATAN: "Manager",
      "1 Feb": "1",
      "2 Feb": "2",
      "3 Feb": "3",
      "4 Feb": "4",
      "5 Feb": "5",
      "6 Feb": "6",
      "7 Feb": "7",
      "8 Feb": "8",
      "9 Feb": "9",
      "10 Feb": "10",
      "11 Feb": "11",
    },
    {
      NO: 2,
      KARYAWAN: "Jane Smith",
      JABATAN: "Staff",
      "1 Feb": "Cuti",
      "2 Feb": "Cuti",
      "3 Feb": "Cuti",
      "4 Feb": "Cuti",
      "5 Feb": "Cuti",
      "6 Feb": "1",
      "7 Feb": "2",
      "8 Feb": "3",
      "9 Feb": "4",
      "10 Feb": "5",
      "11 Feb": "6",
    },
    {
      NO: 2,
      KARYAWAN: "Jane Smith",
      JABATAN: "Staff",
      "1 Feb": "",
      "2 Feb": "",
      "3 Feb": "",
      "4 Feb": "1",
      "5 Feb": "2",
      "6 Feb": "3",
      "7 Feb": "4",
      "8 Feb": "5",
      "9 Feb": "6",
      "10 Feb": "7",
      "11 Feb": "8",
    },
  ]);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "NO",
      valueGetter: "node.rowIndex + 1",
      width: 70,
      suppressMovable: true,
      cellClass: "ag-center-cols-container",
      pinned: 'left' as const,
    },
    { field: "KARYAWAN", minWidth: 150, pinned: 'left' as const, },
    { field: "JABATAN", width: 120, pinned: 'left' as const, },
  ]);

  useEffect(() => {
    const staticCols = [
      {
        field: "NO",
        valueGetter: "node.rowIndex + 1",
        width: 70,
        suppressMovable: true,
      },
      { field: "KARYAWAN", minWidth: 150, pinned: 'left' as const, },
      { field: "JABATAN", width: 120, pinned: 'left' as const, },
    ];

    const dynamicDateCols = generateDateColumns("2025-02-01", "2025-04-01");

    setColDefs([...staticCols, ...dynamicDateCols]);
  }, []);

  const gridRef = useRef<AgGridReact | null>(null);

  const onRowValueChanged = (event: { data: RowDataType }) => {
    console.log("Row data changed:", event.data);
  };

  const onCellValueChanged = (event: { data: RowDataType }) => {
    const data = event.data;

    // Recalculate TOTAL MATERIAL
    const qty = Number(data.QTY) || 0;
    const hargaSatuan = Number(data["HARGA SATUAN"]) || 0;
    const biayaLainnya = Number(data["BIAYA LAINNYA"]) || 0;

    const totalMaterial = qty * hargaSatuan;
    const totalMaterialPlusBiaya = totalMaterial + biayaLainnya;

    data["TOTAL MATERIAL"] = totalMaterial;
    data["TOTAL MATERIAL + BIAYA LAINNYA"] = totalMaterialPlusBiaya;

    // Trigger refresh
    gridRef.current?.api.applyTransaction({ update: [data] });

    console.log("Cell value changed:", event);
  };

  return (
    <MainLayout title="Roster Cuti" desktopOnly>
      <div className="space-y-5">

        {/* TABLE */}
        <DataGrid
          rowData={rowData}
          colDefs={colDefs}
          onCellValueChanged={onCellValueChanged}
          onRowValueChanged={onRowValueChanged}
          setRowData={setRowData}
        />

        <CellContextMenu />
      </div>
    </MainLayout>
  );
};

export default GridExample;

function generateDateColumns(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateCols = [];

  while (start <= end) {
    const day = start.getDate();
    const month = start.toLocaleString("id-ID", { month: "short" });
    const key = `${day} ${month}`; // e.g. "1 Feb"

    dateCols.push({
      field: key,
      editable: true,
      width: 80,
      // cellStyle: (params: CellClassParams) => {
      //   if (params.value === "Cuti") {
      //     return { backgroundColor: "red", color: "white" };
      //   } else if (params.value === "") {
      //     return { backgroundColor: "#ada6a6" };
      //   }
      //   return undefined;
      // },
      cellStyle: (params: CellClassParams) => {
        if (params.value === "Cuti") {
          return {
            backgroundColor: 'red',
            color: 'white',
          };
        } else if(params.value === "") {
          return { backgroundColor: "#ada6a6", color: 'black' };
        } else {
          return {
            backgroundColor: 'white',
            color: 'black'
          };
        }
      },
      
      cellRenderer: CellWithContextMenu,
    });

    start.setDate(start.getDate() + 1);
  }

  return dateCols;
}
