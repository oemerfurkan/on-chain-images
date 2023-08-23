import { useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { address } from "../abi/address.json"
import abi from "../abi/abi.json"

type RGBColor = [r: number, g: number, b: number];

type RGBAColor = [r: number, g: number, b: number, a: number];

const Canvas = () => {
  const [brush, setBrush] = useState<RGBColor>([0, 0, 0]);

  // Create an array of arrays to represent the pixels
  const [array, setArray] = useState<RGBColor[][]>(
    Array(100).fill(Array(1).fill([132, 132, 132]))
  );

  const handlePixelClick = (row: number, col: number) => {
    // Create a new copy of the array and update the clicked pixel
    const newArray = array.map((rowArray, rowIndex) =>
      rowArray.map((pixel, colIndex) =>
        rowIndex === row && colIndex === col ? brush : pixel
      )
    );
    setArray(newArray);
    console.log(newArray)
  };

  const { config } = usePrepareContractWrite({
    address: `0x${address.slice(2,42)}`,
    abi: abi,
    functionName: "createRGBImage",
    args: ["Deneme", 10, 10, array[0]]
  })

  const {write: createImage} = useContractWrite(config)

  return (
    <>
      <div className="flex flex-wrap w-[10rem]">
        {array.map((rowArray, rowIndex) =>
          rowArray.map((val, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handlePixelClick(rowIndex, colIndex)}
              style={{ backgroundColor: `rgb(${val[0]},${val[1]},${val[2]})` }}
              className="w-[1rem] h-[1rem]"
            ></div>
          ))
        )}
      </div>

      <div className="flex gap-5 p-5">
        <div
          onClick={() => setBrush([255, 0, 0])}
          className="bg-[#FF0000] w-10 h-10 rounded-full"
        ></div>
        <div
          onClick={() => setBrush([0, 255, 0])}
          className="bg-[#00FF00] w-10 h-10 rounded-full"
        ></div>
        <div
          onClick={() => setBrush([0, 0, 255])}
          className="bg-[#0000FF] w-10 h-10 rounded-full"
        ></div>
      </div>

      <button onClick={() => createImage?.()} className="bg-gray-500 w-32 h-10 hover:bg-gray-700">Create Image</button>
    </>
  );
};

export default Canvas;
