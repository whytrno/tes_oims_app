"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useGridCellEditor } from "ag-grid-react";

const isCharNumeric = (charStr: string | null) => {
  return charStr != null && /^\d+$/.test(charStr);
};

const NumericCellEditor = memo(
  ({
    value,
    onValueChange,
    eventKey,
    cellStartedEdit,
  }: {
    value: number | null;
    onValueChange: (val: number | null) => void;
    eventKey: string | null;
    cellStartedEdit: boolean;
  }) => {
    const refInput = useRef<HTMLInputElement | null>(null);

    const updateValue = useCallback(
      (val: string) => {
        onValueChange(val === "" ? null : parseInt(val));
      },
      [onValueChange]
    );

    useEffect(() => {
      if (isCharNumeric(eventKey)) {
        updateValue(eventKey!);
      } else {
        updateValue(value?.toString() ?? "");
      }

      if (cellStartedEdit) {
        refInput.current?.focus();
        refInput.current?.select();
      }
    }, [eventKey, value, cellStartedEdit, updateValue]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key.length === 1 && !isCharNumeric(event.key)) {
        event.preventDefault();
      }
    };

    const focusIn = useCallback(() => {
      refInput.current?.focus();
      refInput.current?.select();
    }, []);

    const focusOut = useCallback(() => {
      console.log("Focus Out from Numeric Editor");
    }, []);

    useGridCellEditor({
      focusIn,
      focusOut,
    });

    return (
      <input
        ref={refInput}
        value={value == null ? "" : value}
        onChange={(e) => updateValue(e.target.value)}
        onKeyDown={onKeyDown}
        className="ag-input-field-input"
      />
    );
  }
);

NumericCellEditor.displayName = "NumericCellEditor";

export default NumericCellEditor;
