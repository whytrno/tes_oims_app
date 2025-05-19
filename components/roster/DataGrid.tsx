"use client";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, CellValueChangedEvent, ColDef, RowValueChangedEvent } from "ag-grid-community";
import { useRef } from "react";

interface DataGridProps {
  rowData: any[];
  colDefs: ColDef[];
  onCellValueChanged: (event: CellValueChangedEvent) => void;
  onRowValueChanged: (event: RowValueChangedEvent) => void;
  setRowData: React.Dispatch<React.SetStateAction<any[]>>;
}

const DataGrid: React.FC<DataGridProps> = ({
  rowData,
  colDefs,
  onCellValueChanged,
  onRowValueChanged,
}) => {
  const gridRef = useRef<AgGridReact | null>(null);

  

  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        ref={gridRef}
        modules={[AllCommunityModule]}
        rowData={rowData}
        rowSelection="multiple"
        columnDefs={colDefs}
        suppressRowClickSelection={true}
        editType="fullRow"
        onCellValueChanged={onCellValueChanged}
        onRowValueChanged={onRowValueChanged}
      />
    </div>
  );
};

export default DataGrid;
