/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 human.gltf 
Author: Davyd Vidiger (https://sketchfab.com/cryunreal)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/super-human-7aa58e978b9f4357b8e73d8e0440c896
Title: Super Human
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/human.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} >
        <mesh geometry={nodes.Object_2.geometry} material={materials.blinn1SG} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.blinn1SG} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.temp_ldefault1} />
      </group>
    </group>
  )
}

useGLTF.preload('/human.gltf')
