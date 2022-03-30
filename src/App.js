import './App.css';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { config, useSpring, animated } from '@react-spring/three';

/**
 * Boxコンポーネント 
 * @param {*} props 
 * @returns 
 */
function Box(props) {
  const ref = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const [hovered, setHoverd] = useState(false);

  const { scale } = useSpring({
    scale: isClicked ? 2 : 1, 
    config: config.wobbly
  });
  
  useFrame(() => ref.current.rotation.x += 0.01);

  return (
    <animated.mesh
      {...props}
      ref={ref}
      scale={scale}
      onClick={() => setIsClicked(!isClicked)}
      onPointerOver={() => setHoverd(true)}
      onPointerOut={() => setHoverd(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </animated.mesh>
  );
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Box position={[-1.6, 0, 0]} />
        <Box position={[1.6, 0, 0]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
      </Canvas>
    </div>
  );
}

export default App;
