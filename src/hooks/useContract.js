import { useMemo } from 'react';
import { ethers } from 'ethers';
import { getProvider } from '../utils/kaia';
import CarSharingData from '../contracts/CarSharing.json';
import VehicleNFTData from '../contracts/VehicleNFT.json';

export function useContract() {
  const getCarSharing = useMemo(() => async (withSigner = false) => {
    const provider = getProvider();
    const runner = withSigner ? await provider.getSigner() : provider;
    return new ethers.Contract(CarSharingData.address, CarSharingData.abi, runner);
  }, []);

  const getVehicleNFT = useMemo(() => async (withSigner = false) => {
    const provider = getProvider();
    const runner = withSigner ? await provider.getSigner() : provider;
    return new ethers.Contract(VehicleNFTData.address, VehicleNFTData.abi, runner);
  }, []);

  return { getCarSharing, getVehicleNFT };
}
