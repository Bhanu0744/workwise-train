import { create } from 'zustand';
import { Seat } from './types';
import { 
  LAST_ROW_SEATS, 
  MAX_SEATS_PER_BOOKING, 
  ROWS, 
  SEATS_PER_ROW 
} from './constants';
import { findBestAvailableSeats, generateSeatId } from './seat-utils';

const initializeSeats = (): Seat[] => {
  const seats: Seat[] = [];
  
  for (let row = 1; row <= ROWS; row++) {
    const seatsInRow = row === ROWS ? LAST_ROW_SEATS : SEATS_PER_ROW;
    for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
      seats.push({
        id: generateSeatId(row, seatNum),
        row,
        seatNumber: seatNum,
        isBooked: false,
      });
    }
  }
  return seats;
};

interface BookingStore {
  seats: Seat[];
  bookSeats: (numberOfSeats: number) => { success: boolean; message: string };
  resetBookings: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  seats: initializeSeats(),
  
  bookSeats: (numberOfSeats: number) => {
    if (numberOfSeats > MAX_SEATS_PER_BOOKING) {
      return { 
        success: false, 
        message: `Cannot book more than ${MAX_SEATS_PER_BOOKING} seats at once` 
      };
    }

    if (numberOfSeats < 1) {
      return {
        success: false,
        message: 'Must book at least one seat'
      };
    }

    const seats = [...get().seats];
    const seatsToBook = findBestAvailableSeats(seats, numberOfSeats);

    if (!seatsToBook) {
      return {
        success: false,
        message: 'Not enough consecutive seats available'
      };
    }

    const bookingId = Math.random().toString(36).substring(7);
    const allInSameRow = seatsToBook.every(seat => seat.row === seatsToBook[0].row);
    
    set(state => ({
      seats: state.seats.map(seat =>
        seatsToBook.some(s => s.id === seat.id)
          ? { ...seat, isBooked: true, bookingId }
          : seat
      ),
    }));

    return {
      success: true,
      message: allInSameRow
        ? `Successfully booked ${numberOfSeats} seats in row ${seatsToBook[0].row}`
        : `Successfully booked ${numberOfSeats} seats across rows ${seatsToBook[0].row} to ${seatsToBook[seatsToBook.length - 1].row}`
    };
  },

  resetBookings: () => {
    set({ seats: initializeSeats() });
  },
}));