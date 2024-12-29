import { LAST_ROW_SEATS, ROWS, SEATS_PER_ROW } from "./constants";
import { Seat } from "./types";


export function generateSeatId(row: number, seatNumber: number): number {
  return (row - 1) * SEATS_PER_ROW + seatNumber;
}

export function findBestAvailableSeats(
  seats: Seat[],
  numberOfSeats: number
): Seat[] | null {
  // First try: Find seats in the same row
  for (let row = 1; row <= ROWS; row++) {
    const rowSeats = seats.filter(
      (seat) => seat.row === row && !seat.isBooked
    );
    const seatsInCurrentRow = row === ROWS ? LAST_ROW_SEATS : SEATS_PER_ROW;
    
    if (rowSeats.length >= numberOfSeats && seatsInCurrentRow >= numberOfSeats) {
      // Sort by seat number to ensure we get consecutive seats
      return rowSeats
        .sort((a, b) => a.seatNumber - b.seatNumber)
        .slice(0, numberOfSeats);
    }
  }

  // Second try: Find closest available seats across rows
  const availableSeats = seats.filter((seat) => !seat.isBooked);
  if (availableSeats.length >= numberOfSeats) {
    // Sort by row and seat number to get closest possible seats
    return availableSeats
      .sort((a, b) => a.row === b.row 
        ? a.seatNumber - b.seatNumber 
        : a.row - b.row)
      .slice(0, numberOfSeats);
  }

  return null;
}