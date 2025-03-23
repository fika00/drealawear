import { PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { degToRad } from "three/src/math/MathUtils.js";
const Camera = () => {
  return (
    <group>
      <PerspectiveCamera
        makeDefault
        near={0.0001}
        far={100}
        position={[0, 0.3, 0.3]}
        rotation={[degToRad(-45), 0, 0]}
      />
    </group>
  );
};

export default Camera;
