'use client';

import { cn } from "@/lib/utils";

interface SeatProps {
  seatNumber: number;
  isBooked: boolean;
  row: number;
}

export function Seat({ seatNumber, isBooked, row }: SeatProps) {
  return (
    <div
      className={cn(
        "w-12 h-12 rounded-t-lg border-2 flex items-center justify-center transition-colors relative",
        isBooked 
          ? "bg-destructive text-destructive-foreground border-destructive cursor-not-allowed" 
          : "bg-secondary hover:bg-secondary/80 border-border cursor-pointer"
      )}
      title={`Row ${row}, Seat ${seatNumber}`}
    >
      <span className="text-sm font-medium">{seatNumber}</span>
      {row === 1 && (
        <span className="absolute -top-6 text-xs text-muted-foreground">
          Row {row}
        </span>
      )}
    </div>
  );
}