const CanvasPixel = ({r, g, b} : {r: number, g: number, b: number}) => {
    
    return <div style={{backgroundColor: `rgb(${r}, ${g}, ${b})`}} className="w-4 h-4">
    </div>
}

export default CanvasPixel