//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract RGB {

    struct RGBPixel {
        //RED
        uint8 r;
        //GREEN
        uint8 g;
        //BLUE
        uint8 b;
    }
    // Color grading of the pixel with alpha
    struct RGBAPixel {
        //RED
        uint8 r;
        //GREEN
        uint8 g;
        //BLUE
        uint8 b;
        //ALPHA
        uint8 a;
    }
    
    struct RGBImage {
        //Name of the image
        string Name;
        //Count of the pixels in x-axis
        uint256 xLength;
        //Count of the pixels in y-axis
        uint256 yLength;
        //Array that stores the RGB values for every pixel
        uint8[3][] Colors; 
    }

    struct RGBAImage {
        //Name of the image
        string Name;
        //Count of the pixels in x-axis
        uint256 xLength;
        //Count of the pixels in y-axis
        uint256 yLength;
        //Array that stores the RGB values for every pixel
        uint8[4][] Colors; 
    }

    mapping(address => RGBImage) public rgbImage;
    mapping(address => RGBAImage) public rgbaImage;

    function createRGBImage(string memory _name, uint256 _xLength, uint256 _yLength, uint8[3][] memory _rgbPixelsArray) public {
        require(_xLength * _yLength == _rgbPixelsArray.length, "Length of the colors list doesn't match with x-length and y-length.");
        RGBImage memory _image;

        _image.Colors = new uint8[3][](_xLength * _yLength);
        for (uint i = 0; i < _rgbPixelsArray.length; i++) {
            _image.Colors[i] = _rgbPixelsArray[i];
        }

        _image.Name = _name;
        _image.xLength = _xLength;
        _image.yLength = _yLength;

        rgbImage[msg.sender] = _image;
    }

    function createRGBAImage(string memory _name, uint256 _xLength, uint256 _yLength, uint8[4][] memory _rgbaPixelsArray) public {
        require(_xLength * _yLength == _rgbaPixelsArray.length, "Length of the colors list doesn't match with x-length and y-length.");
        RGBAImage memory _image;

        _image.Colors = new uint8[4][](_xLength * _yLength);
        for (uint i = 0; i < _rgbaPixelsArray.length; i++) {
            _image.Colors[i] = _rgbaPixelsArray[i];
        }

        _image.Name = _name;
        _image.xLength = _xLength;
        _image.yLength = _yLength;

        rgbaImage[msg.sender] = _image;
    }

    function returnColors(address _address) public view returns (uint8[3][] memory) {
        return rgbImage[_address].Colors;
    }
}