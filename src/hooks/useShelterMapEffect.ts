"use client";
import { useMapStore } from "@/store/useMapStore";
import { useShelterStore } from "@/store/useShelterStore";
import { useEffect } from "react";

export const useShelterMapEffect = () => {
  const { shelters, fetchSheltersData } = useShelterStore();
  const setCenter = useMapStore(state => state.setCenter);

  useEffect(() => {
    fetchSheltersData();
  }, [fetchSheltersData]);

  useEffect(() => {
    if (shelters.length > 0) {
      const shelter = shelters[0];
      setCenter({ lat: shelter.lat, lng: shelter.lng });
    }
  }, [shelters, setCenter]);
};
