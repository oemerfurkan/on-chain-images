import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { useAccount } from "wagmi";
import { address } from "../abi/address.json";
import abi from "../abi/abi.json";

import { useEffect, useState } from "react";

import { CanvasPixel } from "../components";

type RGBColor = [r: number, g: number, b: number];

type RGBAColor = [r: number, g: number, b: number, a: number];

const rgbArrayExample: RGBColor[] = Array(100).fill(Array(3).fill(0));

console.log(rgbArrayExample);
console.log(`0x${address.slice(2, 42)}`);

const AddImage = () => {
  const [rgbImageData, setRgbImageData] = useState<RGBColor[]>();

  const { address: myAddress } = useAccount();
  //TODO: Get image from the user with image input

  //TODO: Extract the ImageData.data and assign it into a uint8[4][] array

  //TODO: Upload it to the contract with createRGBAImage() method

  const { config } = usePrepareContractWrite({
    address: `0x${address.slice(2, 42)}`,
    abi: abi,
    functionName: "createRGBImage",
    args: ["Name", 10, 10, rgbArrayExample],
  });

  const { write: createRGBImage } = useContractWrite(config);

  const { data: myData } = useContractRead({
    address: `0x${address.slice(2, 42)}`,
    abi: abi,
    functionName: "returnColors",
    args: [myAddress],
    onSettled(data: RGBColor[] | undefined, error) {
      try {
        setRgbImageData(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    console.log(rgbImageData, myData);
  }, []);
  return (
    <>
      <ConnectButton />
      <button
        className="w-32 h-12 bg-gray-500"
        onClick={() => createRGBImage?.()}
      >
        Create Array
      </button>
      <div className="flex w-[10rem] flex-wrap">
      {myData?.map((val: RGBColor) => {
        return <CanvasPixel r={val[0]} g={val[0]} b={val[0]} />;
      })}
      </div>
    </>
  );
};

export default AddImage;
