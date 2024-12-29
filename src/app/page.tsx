'use client';

import { BookingForm } from "@/components/modules/booking-form";
import { TrainCoach } from "@/components/modules/train-coach";
import { Train } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Train className="h-8 w-8" />
              <h1 className="text-3xl font-bold">Train Seat Booking</h1>
            </div>
            <p className="text-muted-foreground">
              Book up to 7 seats at once. Priority is given to booking seats in the same row.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr,300px] items-start">
            <TrainCoach />
            <div className="md:sticky md:top-8">
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}