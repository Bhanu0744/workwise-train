'use client';

import { useState } from "react";
import { useBookingStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
export function BookingForm() {
  const [seats, setSeats] = useState<number>(1);
  const { bookSeats, resetBookings } = useBookingStore();

  const handleBooking = () => {
    const result = bookSeats(seats);
    // toast({
    //   title: result.success ? "Booking Successful" : "Booking Failed",
    //   description: result.message,
    //   variant: result.success ? "default" : "destructive",
    // });
    toast(result.success ? "Booking Successful" : "Booking Failed")
  };

  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="seats">Number of Seats</Label>
        <Input
          id="seats"
          type="number"
          min={1}
          max={7}
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleBooking} className="flex-1">
          Book Seats
        </Button>
        <Button onClick={resetBookings} variant="outline">
          Reset All
        </Button>
      </div>
    </div>
  );
}