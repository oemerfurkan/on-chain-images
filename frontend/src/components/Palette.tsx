import { useState } from "react";

type Color = {
    r: number;
    g: number;
    b: number
}

const Palette = () => {
    const [palette, setPalette] = useState<Color>({r: 0, g: 0, b: 0})

    const changePalette = (_palette: Color) => {
        setPalette(_palette)
    }

    return<>
    <div className="bg-[#FF0000] w-10 h-10"></div>
    <div className="bg-[#00FF00] w-10 h-10"></div>
    <div className="bg-[#0000FF] w-10 h-10"></div>
    </>
}

export default Palette