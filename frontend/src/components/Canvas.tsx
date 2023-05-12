import { useEffect, useRef } from "react";
import { useLocalProvider } from "../hooks";
import useSignerProvider from "../hooks/useSignerProvider";

const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

//   const {localProvider, localContract} = useLocalProvider()
  const {signer, signerContract: contract, signerProvider: provider} = useSignerProvider()

  //TODO: Get image data from the contract
  const uploadImageData = async () => {
      contract?.createRGBImage("Deneme", 2, 2, [[0,0,0],[0,0,0],[0,0,0],[0,0,0]])
      .catch((err: any) => console.log(err))

  }

  const getImageData = async () => {

    const imgData = await contract?.returnColors("0xa0Ee7A142d267C1f36714E4a8F75612F20a79720")
    console.log(imgData)
  } 

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      //Define image's width and height
      const imgData = context?.createImageData(10, 10);

      // With a for loop initialize every pixel of the image
      if (imgData) {
        for (var i = 0; i < imgData.data.length; i += 4) {
          imgData.data[i + 0] = i;
          imgData.data[i + 1] = i;
          imgData.data[i + 2] = i;
          imgData.data[i + 3] = 255;
        }

        context?.putImageData(imgData, 10, 10);
      }
    }
  }, []);

  return <>
    <canvas ref={canvasRef} {...props} className="" />
    <button onClick={() => uploadImageData()}>upload</button>
    <button onClick={() => getImageData()}>get</button>
  </>;
};

export default Canvas;
