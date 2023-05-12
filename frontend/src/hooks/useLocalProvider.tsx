import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { address } from "../abi/address.json";
import abi from "../abi/abi.json";

const useLocalProvider = () => {
  const [localProvider, setLocalProvider] = useState<
    ethers.providers.BaseProvider | undefined
  >(undefined);
  const [localContract, setLocalContract] = useState<
    ethers.Contract | undefined
  >(undefined);

  const _provider = ethers.providers.getDefaultProvider(
    "http://localhost:8545"
  );
  const _contract = new ethers.Contract(address, abi, _provider);

  useEffect(() => {
    setLocalProvider(_provider);
    setLocalContract(_contract);
  }, []);

  return { localContract, localProvider };
};

export default useLocalProvider;
