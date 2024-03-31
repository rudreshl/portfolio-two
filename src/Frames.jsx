import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
  rounded,
  Text,
} from "@react-three/drei";
import { easing, geometry } from "maath";

export default function Frames() {
  return (
    // <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
    <group>
      {/* <fog attach="fog" args={["#a79", 8.5, 12]} /> */}
      <ScrollControls pages={4} infinite>
        {/* <Rig rotation={[0, 0, 0.15]}> */}
        <Carousel />
        {/* </Rig> */}
        {/* <Banner position={[0, -0.15, 0]} /> */}
      </ScrollControls>
    </group>
    //   <Environment preset="dawn" background blur={0.5} />
    // </Canvas>
  );
}
function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}
function Carousel({ radius = 2.5, count = 7 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${Math.floor(i % 7) + 1}_.png`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
}
function Card({ url, ...props }) {
  const ref = useRef();
  const lightRef = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => (e.stopPropagation(), hover(true));
  const pointerOut = () => hover(false);
  const { camera, mouse } = useThree();

  useFrame((state) => {
    console.log("Camera------->", mouse, lightRef);
    lightRef.current.position.copy(mouse);
  });
  // useFrame((state, delta) => {
  //   easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
  //   easing.damp(
  //     ref.current.material,
  //     "radius",
  //     hovered ? 0.25 : 0.1,
  //     0.2,
  //     delta
  //   );
  //   easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  // });
  return (
    // <Image
    //   ref={ref}
    //   url={url}
    //   transparent
    //   side={THREE.DoubleSide}
    //   onPointerOver={pointerOver}
    //   onPointerOut={pointerOut}
    //   {...props}
    // >
    <group
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <mesh>
        <boxGeometry args={[2, 1, 0.1]} />
        <pointLight ref={lightRef} position={[mouse?.x, mouse?.y]} />
        <Text
          scale={[0.1, 0.1, 0.1]}
          color="white" // default
          anchorX="center" // default
          anchorY="middle" // default
          bo
        >
          HELLO WORLD
        </Text>
        <meshPhongMaterial color="#08ff08" opacity={0.1} transparent />
      </mesh>
    </group>
    //    <BentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    //  </Image>
  );
}
