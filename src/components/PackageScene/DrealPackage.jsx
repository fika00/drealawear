import React, { useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { animate, useTransform, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import {
  Color,
  DoubleSide,
  MeshBasicMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  Vector2,
} from "three";
import bgColor from "../backgroundcolor";
import isMobile from "../utils/isMobile";
export function DrealPackage(props) {
  const { nodes, materials } = useGLTF("/models/DrealBox_2.glb");

  //Normal map logic

  // const normalMapScale = 5;
  // const normalMapIntensity = 0.4;

  // const normalMap = useTexture("models/paperNormal2.png");

  // normalMap.wrapS = RepeatWrapping;
  // normalMap.wrapT = RepeatWrapping;
  // normalMap.repeat.set(normalMapScale, normalMapScale);

  // materials.boxMaterial.normalMap = normalMap;
  // materials.boxMaterial.normalScale = new Vector2(
  //   normalMapIntensity,
  //   normalMapIntensity
  // );

  const insideMaterial = new MeshBasicMaterial({
    color: bgColor,
    side: DoubleSide,
  });
  const topRef = useRef();
  const flapRef = useRef();

  materials.boxMaterial.clearcoatRoughness = 0.4;

  materials.boxMaterial.roughness = 0.8;

  const flapRotation = useTransform(
    props.progress,
    [0, 0.85, 1],
    [degToRad(-15), degToRad(-30), degToRad(-90)]
  );

  const boxPosition = useTransform(props.progress, [0, 1], [0.2, 0]);
  const boxRotation = {
    x: useTransform(props.progress, [0, 1], [degToRad(30), degToRad(-10)]),
    y: useTransform(props.progress, [0, 1], [degToRad(180), degToRad(195)]),
  };
  const topRotation = useTransform(props.progress, [0, 1], [degToRad(90), 0]);

  const scale = isMobile ? 0.7 : 1;

  return (
    <motion.group
      position-z={boxPosition}
      position-y={boxPosition}
      rotation-x={boxRotation.x}
      // rotation-z={boxRotation.z}
      rotation-y={boxRotation.y}
      rotation={[0, degToRad(180), 0]}
      {...props}
      dispose={null}
      castShadow
      scale={[scale, scale, scale]}
    >
      <group position={[0, 0.025, 0]}>
        <mesh
          castShadow
          //   receiveShadow
          geometry={nodes.box_1.geometry}
          material={materials.boxMaterial}
        />
        <mesh
          castShadow
          //   receiveShadow
          geometry={nodes.box_2.geometry}
          material={insideMaterial}
        />
      </group>
      <motion.mesh
        castShadow
        // receiveShadow
        geometry={nodes.top.geometry}
        material={materials.boxMaterial}
        position={[0, 0.05, 0.095]}
        ref={topRef}
        rotation={[degToRad(90), 0, 0]}
        rotation-x={topRotation}
      >
        <motion.mesh
          castShadow
          //   receiveShadow
          geometry={nodes.frontflap.geometry}
          material={materials.boxMaterial}
          position={[0, 0, -0.19]}
          rotation={[degToRad(-30), 0, 0]}
          ref={flapRef}
          rotation-x={flapRotation}
        >
          <mesh
            castShadow
            // receiveShadow
            geometry={nodes.frontflap_l.geometry}
            material={materials.boxMaterial}
            position={[0.143, 0, -0.025]}
            rotation={[0, 0, -Math.PI / 2]}
          />
          <mesh
            castShadow
            // receiveShadow
            geometry={nodes.frontflap_r.geometry}
            material={materials.boxMaterial}
            position={[-0.143, 0, -0.025]}
            rotation={[0, 0, 1.57]}
          />
        </motion.mesh>
        <mesh
          castShadow
          //   receiveShadow
          geometry={nodes.sideflap_l.geometry}
          material={materials.boxMaterial}
          position={[0.14, 0, -0.095]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          castShadow
          //   receiveShadow
          geometry={nodes.sideflap_r.geometry}
          material={materials.boxMaterial}
          position={[-0.14, 0, -0.095]}
          rotation={[0, 0, Math.PI / 2]}
        />
      </motion.mesh>
    </motion.group>
  );
}

export default DrealPackage;

useGLTF.preload("/models//DrealBox_2.glb");
