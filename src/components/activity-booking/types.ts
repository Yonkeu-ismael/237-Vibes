import { type activities } from "@/lib/mock-data";

export type Activity = (typeof activities)[number];

export type PaymentMethodId = "mtn" | "orange" | "wave";
