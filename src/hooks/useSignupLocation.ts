import { useState } from "react";

export type SignupLocationStatus =
  | "idle"
  | "fetching"
  | "success"
  | "error"
  | "unsupported";

export interface SignupLocation {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  timestamp: number | null;
  errorMessage?: string;
}

const createEmptyLocation = (): SignupLocation => ({
  latitude: null,
  longitude: null,
  accuracy: null,
  timestamp: null,
  errorMessage: undefined,
});

export const useSignupLocation = () => {
  const [status, setStatus] = useState<SignupLocationStatus>("idle");
  const [location, setLocation] = useState<SignupLocation>(createEmptyLocation);

  const hasLocation = Boolean(location.latitude) && Boolean(location.longitude);

  const requestLocation = async (): Promise<boolean> => {
    if (typeof window === "undefined") return false;

    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      setLocation((prev) => ({
        ...prev,
        errorMessage: "Geolocation is not supported by this browser.",
      }));
      return false;
    }

    setStatus("fetching");

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy ?? null,
            timestamp: position.timestamp ?? Date.now(),
            errorMessage: undefined,
          });
          setStatus("success");
          resolve(true);
        },
        (error) => {
          setLocation((prev) => ({
            ...prev,
            errorMessage: error.message,
          }));
          setStatus("error");
          resolve(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    });
  };

  return { status, location, hasLocation, requestLocation };
};
