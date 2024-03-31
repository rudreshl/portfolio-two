import logo from "./logo.svg";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import Earth from "./Earth";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Center,
  PerspectiveCamera,
  Stars,
  Clouds,
  Cloud,
  Stage,
  useGLTF,
} from "@react-three/drei";
import Human from "./Human";
import { useControls } from "leva";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import Frames from "./Frames";
import { easing, geometry } from "maath";
function App() {
  // const cameraRef = useRef();
  const cameraRef = useRef();
  const lightRef = useRef();
  // const vec = new THREE.Vector3();
  // useFrame((state) => {
  //   if (position) {
  //     state.camera.lookAt(cameraRef?.current?.position);
  //     // cameraRef.current.position.lerp
  //     state.camera.position.lerp(vec.set(0, 4, 0), 0.01);
  //     state.camera.updateProjectionMatrix();
  //   }
  // });
  const { dash, count, radius } = useControls({
    dash: { value: 0.9, min: 0, max: 0.99, step: 0.01 },
    count: { value: 50, min: 0, max: 200, step: 1 },
    radius: { value: 50, min: 1, max: 100, step: 1 },
  });

  return (
    <div>
      <Canvas>
        <PerspectiveCamera
          ref={cameraRef}
          position={[0, 0, 4]}
          fov={100}
          makeDefault
        />

        <color attach="background" args={["#101020"]} />
        {/* <Lines
          dash={dash}
          count={count}
          radius={radius}
          colors={[
            [10, 0.5, 2],
            [1, 2, 10],
            "#A2CCB6",
            "#FCEEB5",
            "#EE786E",
            "#e0feff",
          ]}
        /> */}
        <Clouds material={THREE.MeshBasicMaterial}>
          <Cloud segments={1} bounds={[10, 20, 2]} volume={5} color="orange" />
          <Cloud seed={1} scale={2} volume={3} color="hotpink" fade={80} />
          <Cloud seed={1} scale={2} volume={3} color="gray" fade={80} />
        </Clouds>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {/* <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
          
        /> */}
        <color attach="background" args={["#101020"]} />
        {/* <Lines
          dash={dash}
          count={count}
          radius={radius}
          colors={[
            [10, 0.5, 2],
            [1, 2, 10],
            "#A2CCB6",
            "#FCEEB5",
            "#EE786E",
            "#e0feff",
          ]}
        /> */}
        {/* <fog attach="fog" args={["#353535", 5, 20]} /> */}
        <directionalLight ref={lightRef} position={[0, -2, 0]} />
        {/* <camera position={[0, 4, 0]} ref={cameraRef}></camera> */}

        <Human lightRef={lightRef} />
        {/* <Frames /> */}
        <OrbitControls />
        {/* <Environment preset="sunset" /> */}
        {/* <ContactShadows
          position={[0, -2, 0]}
          opacity={1}
          scale={10}
          blur={1}
          far={20}
          resolution={256}
          color={"#000"}
        /> */}
      </Canvas>
    </div>
  );
}
// function Lines({
//   dash,
//   count,
//   colors,
//   radius = 50,
//   rand = THREE.MathUtils.randFloatSpread,
// }) {
//   const lines = useMemo(() => {
//     return Array.from({ length: count }, () => {
//       const pos = new THREE.Vector3(rand(radius), rand(radius), rand(radius));
//       const points = Array.from({ length: 10 }, () =>
//         pos
//           .add(new THREE.Vector3(rand(radius), rand(radius), rand(radius)))
//           .clone()
//       );
//       const curve = new THREE.CatmullRomCurve3(points).getPoints(300);
//       return {
//         color: colors[parseInt(colors.length * Math.random())],
//         width: Math.max(radius / 100, (radius / 50) * Math.random()),
//         speed: Math.max(0.1, 1 * Math.random()),
//         curve: curve.flatMap((point) => point.toArray()),
//       };
//     });
//   }, [colors, count, radius]);
//   return lines.map((props, index) => (
//     <Fatline key={index} dash={dash} {...props} />
//   ));
// }
// function Fatline({ curve, width, color, speed, dash }) {
//   const ref = useRef();
//   useFrame(
//     (state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 10)
//   );
//   return (
//     <mesh ref={ref}>
//       <meshLineGeometry points={curve} />
//       <meshLineMaterial
//         transparent
//         lineWidth={width}
//         color={color}
//         depthWrite={false}
//         dashArray={0.25}
//         dashRatio={dash}
//         toneMapped={false}
//       />
//     </mesh>
//   );
// }

export default App;
