import React,{useState} from 'react'

const ColorBox = ({ color, hasBackgroundImage, onClick }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleClick = () => {
    // Set the background image URL
    console.log("Clicked")
    setBackgroundImage(choose);
    
  };
  return (
    <div
    className={`box ${color}`}
    style={{
      backgroundImage: hasBackgroundImage ? `url(${hasBackgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    onClick={onClick}
  >
        {color}
      </div>
  )
}

export default ColorBox
