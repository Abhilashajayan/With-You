import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const getUserMedia = async (constraints: MediaStreamConstraints) => {
  try {
    const stream : any = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error : any) {
    throw new Error("Error accessing media devices: " + error.message);
  }
};