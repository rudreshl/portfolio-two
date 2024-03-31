/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 human.gltf 
Author: Davyd Vidiger (https://sketchfab.com/cryunreal)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/super-human-7aa58e978b9f4357b8e73d8e0440c896
Title: Super Human
*/

import React, { useRef, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Center } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import Brain from "./Brain";
import Frames from "./Frames";
export default function Human(props) {
  const { nodes, materials } = useGLTF("/human.gltf");
  const [changed, setChanged] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ref = useRef();
  const { camera, mouse } = useThree();
  useFrame((state, delta) => {
    if (clicked & !changed) {
      // cameraRef.current.position.lerp
      state.camera.position.lerp(vec.set(3, 5, 0), 0.1);
      state.camera.updateProjectionMatrix();
      props?.lightRef.current.position.copy(vec.set(3, 5, 0));
      setTimeout(() => {
        setChanged(true);
      }, 1000);
    } else {
      ref.current.rotation.y += delta * 0.5;
    }
  });
  const vec = new THREE.Vector3();

  return (
    <group
      position={[0.5, -1.25, 0]}
      ref={ref}
      onClick={() => {
        setClicked(true);
      }}
    >
      <Center top>
        {clicked && (
          <group position={[0, 2.5, -0.6]} scale={0.8}>
            <Frames />
            <Brain />
          </group>
        )}
        <group {...props} dispose={null} position={[0, 0, 0]} scale={0.02}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Object_2.geometry}
              material={materials.blinn1SG}
            />
            <mesh
              geometry={nodes.Object_3.geometry}
              material={materials.blinn1SG}
            />
            <mesh
              geometry={nodes.Object_4.geometry}
              material={materials.temp_ldefault1}
            />
          </group>
        </group>
      </Center>
      <OrbitControls />
    </group>
  );
}

useGLTF.preload("/human.gltf");
