export interface Seat {
    id: number;
    row: number;
    seatNumber: number;
    isBooked: boolean;
    bookingId?: string;
  }
  
  export interface BookingRequest {
    numberOfSeats: number;
  }