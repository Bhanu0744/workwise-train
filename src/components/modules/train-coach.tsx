'use client';

import { useBookingStore } from "@/lib/store";
import { Seat } from "./seat";

export function TrainCoach() {
  const seats = useBookingStore(state => state.seats);
  
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg shadow-lg">
      <div className="grid gap-6">
        {Array.from({ length: 11 }, (_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          const rowSeats = seats.filter(seat => seat.row === rowNumber);
          
          return (
            <div key={rowNumber} className="flex gap-2 justify-center">
              {rowSeats.map(seat => (
                <Seat
                  key={seat.id}
                  seatNumber={seat.seatNumber}
                  isBooked={seat.isBooked}
                  row={seat.row}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}