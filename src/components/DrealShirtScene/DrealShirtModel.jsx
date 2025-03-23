import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import {
  DoubleSide,
  MeshStandardMaterial,
  RepeatWrapping,
  Vector2,
  Vector3,
  Color,
} from "three";
import {
  animate,
  cubicBezier,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils.js";

import { motion } from "framer-motion-3d";

export const DrealShirtModel = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => {
      return {
        goForward,
        setCurrentShirtModel,
      };
    },
    []
  );

  const { nodes, materials } = useGLTF("/models/shirt/DrealShirt.glb");

  const [currentShirtModel, setCurrentShirtModel] = useState(0);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const rotationXRef = useRef(0);
  const draggingOffset = useRef(0);
  const previousDraggingOffset = useRef(0);

  // ScrollAnimaations and transformations

  const scrollYProgress = props.scrollYProgress;
  // const yVelocity = useVelocity(scrollYProgress);
  const yRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 4], {
    clamp: false,
  });

  const targetZRot = useRef(0);
  const groupRef = useRef();
  const meshRef = useRef();

  const previousScrollValue = useRef(0);

  //Material stuff

  // const maskMat = useTexture("/models/shirt/MaskForDrealShirt.png");
  const maskMat_lifestyle = useTexture(
    "/models/shirt/MaskForDrealShirt_lifestyle.png"
  );
  const maskMat_blueprint = useTexture(
    "/models/shirt/MaskForDrealShirt_blueprint.png"
  );

  // const albedoMap = materials.body_FRONT_5147.map;
  const albedoMap =
    currentShirtModel === 0 ? maskMat_lifestyle : maskMat_blueprint;
  const normalMap = useTexture("/models/shirt/fabricNormalMap.jpg");
  const normalMapScale = 25;
  const normalMapIntensity = 1;

  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(normalMapScale, normalMapScale);

  const shirtMaterial = new MeshStandardMaterial({
    map: albedoMap,
    side: DoubleSide,
    normalMap: normalMap,
    normalScale: new Vector2(normalMapIntensity, normalMapIntensity),
    roughness: 0.9,
  });

  const shirtColors_lifestyle = [
    {
      shirtColor: new Color("#d7d7d7"),
      designColor: new Color("#6D8D74"),
      textColor: new Color("#000000"),
      roughness: 0.6,
    },
    {
      shirtColor: new Color("#212121"),
      designColor: new Color("#479E89"),
      textColor: new Color("#ffffff"),
      roughness: 0.8,
    },
    {
      shirtColor: new Color("#958475"),
      designColor: new Color("#594b44"),
      textColor: new Color("#000000"),
      roughness: 0.6,
    },
  ];

  const shirtColors_blueprint = [
    {
      shirtColor: new Color("#d7d7d7"),
      designColor: new Color("#9c6325"),
      textColor: new Color("#000000"),
      roughness: 0.6,
    },
    {
      shirtColor: new Color("#212121"),
      designColor: new Color("#4c677f"),
      textColor: new Color("#ffffff"),
      roughness: 0.8,
    },
    {
      shirtColor: new Color("#958475"),
      designColor: new Color("#ffffff"),
      textColor: new Color("#000000"),
      roughness: 0.6,
    },
  ];

  shirtMaterial.uniforms = {
    uTwist: { value: 0 },
    uTime: { value: 0 },
    shirtColorPrev: { value: shirtColors_lifestyle[0].shirtColor },
    designColorPrev: { value: shirtColors_lifestyle[0].designColor },
    textColorPrev: { value: shirtColors_lifestyle[0].textColor },

    uProgress: { value: 0 },

    shirtColorNext: { value: shirtColors_lifestyle[1].shirtColor },
    designColorNext: { value: shirtColors_lifestyle[1].designColor },
    textColorNext: { value: shirtColors_lifestyle[1].textColor },
  };

  shirtMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uTwist = shirtMaterial.uniforms.uTwist;
    shader.uniforms.uTime = shirtMaterial.uniforms.uTime;
    shader.uniforms.shirtColorPrev = shirtMaterial.uniforms.shirtColorPrev;
    shader.uniforms.designColorPrev = shirtMaterial.uniforms.designColorPrev;
    shader.uniforms.textColorPrev = shirtMaterial.uniforms.textColorPrev;

    shader.uniforms.shirtColorNext = shirtMaterial.uniforms.shirtColorNext;
    shader.uniforms.designColorNext = shirtMaterial.uniforms.designColorNext;
    shader.uniforms.textColorNext = shirtMaterial.uniforms.textColorNext;

    shader.uniforms.uProgress = shirtMaterial.uniforms.uProgress;

    shader.vertexShader = shader.vertexShader
      .replace(
        `#define STANDARD`,
        `#define STANDARD
        uniform float uTwist;
        uniform float uTime;
        varying vec3 vWorldPosition;
        varying float vMask;

        // vec3 random3(vec3 c) {
        //   float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        //   vec3 r;
        //   r.z = fract(512.0*j);
        //   j *= .125;
        //   r.x = fract(512.0*j);
        //   j *= .125;
        //   r.y = fract(512.0*j);
        //   return r-0.5;
        // }

        // /* skew constants for 3d simplex functions */
        // const float F3 =  0.3333333;
        // const float G3 =  0.1666667;

        // /* 3d simplex noise */
        // float simplex3d(vec3 p) {
        //   /* 1. find current tetrahedron T and it's four vertices */
        //   /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
        //   /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/
          
        //   /* calculate s and x */
        //   vec3 s = floor(p + dot(p, vec3(F3)));
        //   vec3 x = p - s + dot(s, vec3(G3));
          
        //   /* calculate i1 and i2 */
        //   vec3 e = step(vec3(0.0), x - x.yzx);
        //   vec3 i1 = e*(1.0 - e.zxy);
        //   vec3 i2 = 1.0 - e.zxy*(1.0 - e);
            
        //   /* x1, x2, x3 */
        //   vec3 x1 = x - i1 + G3;
        //   vec3 x2 = x - i2 + 2.0*G3;
        //   vec3 x3 = x - 1.0 + 3.0*G3;
          
        //   /* 2. find four surflets and store them in d */
        //   vec4 w, d;
          
        //   /* calculate surflet weights */
        //   w.x = dot(x, x);
        //   w.y = dot(x1, x1);
        //   w.z = dot(x2, x2);
        //   w.w = dot(x3, x3);
          
        //   /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
        //   w = max(0.6 - w, 0.0);
          
        //   /* calculate surflet components */
        //   d.x = dot(random3(s), x);
        //   d.y = dot(random3(s + i1), x1);
        //   d.z = dot(random3(s + i2), x2);
        //   d.w = dot(random3(s + 1.0), x3);
          
        //   /* multiply d by w^4 */
        //   w *= w;
        //   w *= w;
        //   d *= w;
          
        //   /* 3. return the sum of the four surflets */
        //   return dot(d, vec4(52.0));
        // }
        `
      )
      .replace(
        `#include <common>`,
        `#include <common>
        varying vec3 vPosition;
        `
      )
      .replace(
        `void main() {`,
        `void main() {
          vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          vPosition = position;
          vec3 localPos = position;
          vec3 tempPos = localPos;
          tempPos.z += 1.0;
          float mask = length(tempPos);
          mask = smoothstep(.7, 4.0, mask);

          // tempPos *= .5;
          // tempPos.y += uTime / 2.;

          // float noise = simplex3d(tempPos * .3) * 2.;

          float twistAngle = sqrt(abs(uTwist) * 8.0 * mask) * sign(uTwist);
          float smoothTwistAngle = mix(0.0, -twistAngle, 0.5); // Lerp-like transition to smooth twist changes
      
          float cosTheta = cos(smoothTwistAngle);
          float sinTheta = sin(smoothTwistAngle);
      
          vec3 twistedPos = localPos;
          twistedPos.x = cosTheta * localPos.x - sinTheta * localPos.y;
          twistedPos.y = sinTheta * localPos.x + cosTheta * localPos.y;

      
          vec3 finalPos = mix(localPos, twistedPos, mask);`
      )

      .replace(
        `#include <project_vertex>`,
        `#include <project_vertex>
        vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(finalPos, 1.0);`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        `#define STANDARD`,
        `#define STANDARD
        varying vec3 vPosition;
        varying vec3 vWorldPosition;

        varying float vMask;

        uniform vec3 shirtColorPrev;
        uniform vec3 designColorPrev;
        uniform vec3 textColorPrev;


        uniform float uProgress;

        uniform vec3 shirtColorNext;
        uniform vec3 designColorNext;
        uniform vec3 textColorNext;

        vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

        float cnoise(vec2 P){
          vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
          vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
          Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
          vec4 ix = Pi.xzxz;
          vec4 iy = Pi.yyww;
          vec4 fx = Pf.xzxz;
          vec4 fy = Pf.yyww;
          vec4 i = permute(permute(ix) + iy);
          vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
          vec4 gy = abs(gx) - 0.5;
          vec4 tx = floor(gx + 0.5);
          gx = gx - tx;
          vec2 g00 = vec2(gx.x,gy.x);
          vec2 g10 = vec2(gx.y,gy.y);
          vec2 g01 = vec2(gx.z,gy.z);
          vec2 g11 = vec2(gx.w,gy.w);
          vec4 norm = 1.79284291400159 - 0.85373472095314 * 
            vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
          g00 *= norm.x;
          g01 *= norm.y;
          g10 *= norm.z;
          g11 *= norm.w;
          float n00 = dot(g00, vec2(fx.x, fy.x));
          float n10 = dot(g10, vec2(fx.y, fy.y));
          float n01 = dot(g01, vec2(fx.z, fy.z));
          float n11 = dot(g11, vec2(fx.w, fy.w));
          vec2 fade_xy = fade(Pf.xy);
          vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
          float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
          return 2.3 * n_xy;
        }


        `
      )
      .replace(
        `#include <map_fragment>`,
        `#ifdef USE_MAP
          vec4 sampledDiffuseColor = texture2D( map, vMapUv );
          #ifdef DECODE_VIDEO_TEXTURE
            sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
          #endif
          vec3 shirtFragment = shirtColorPrev * sampledDiffuseColor.r;
          vec3 accentFragment = designColorPrev * sampledDiffuseColor.g;
          vec3 textFragment = textColorPrev * sampledDiffuseColor.b;

          vec3 shirtFragmentNext = shirtColorNext * sampledDiffuseColor.r;
          vec3 accentFragmentNext = designColorNext * sampledDiffuseColor.g;
          vec3 textFragmentNext = textColorNext * sampledDiffuseColor.b;

          vec3 prevShirt = shirtFragment + accentFragment + textFragment;
          vec3 nextShirt = shirtFragmentNext + accentFragmentNext + textFragmentNext;

          float fractValue;

          if(uProgress < .99) {
            fractValue = fract(uProgress*2.);
          } else {
            fractValue = fract(.99);
          }

          float repeatingProgress = fractValue * 10.;

          float transitionDistance = .7;

          // Define the base mask with smoothstep
          float maskBase = 1.0 - smoothstep(-5. + repeatingProgress, -5. + transitionDistance + repeatingProgress, vWorldPosition.y);
          

          // Apply maskSideOne only near the edges of the smoothstep
          float maskEdgeFactor = smoothstep(-5.2 + repeatingProgress, -5. + transitionDistance + repeatingProgress, vWorldPosition.y) +
                                smoothstep(-3. + repeatingProgress, -2.+ repeatingProgress, vWorldPosition.y);

          // Calculate the edge-specific mask
          vec2 halftoneCoord = vWorldPosition.xy * 120.;
          
          float perlinNoise = cnoise(halftoneCoord);
          perlinNoise = smoothstep(0., .9, perlinNoise) / 1.5 * maskEdgeFactor; 

          // Combine the masks
          float mask = maskBase - perlinNoise;


          // Clamp the mask to ensure it's within valid bounds
          mask = clamp(mask, 0.0, 1.0);


          if (gl_FrontFacing) {
            diffuseColor.rgb *= mix(prevShirt, nextShirt, mask);
          } else {
            diffuseColor.rgb *= mix(shirtColorPrev, shirtColorNext, mask);
          }

          // diffuseColor.rgb = vec3(mask);

        #endif
      `
      );
  };

  const goForward = (forward) => {
    // IF TRUE GO FORWARD ELSE BACK
    const direction = !forward ? 1 : -1;
    animate(
      scrollYProgress,
      scrollYProgress.get() + (Math.PI / 16) * direction
    );
  };

  const handlePointerDown = (event) => {
    isDraggingRef.current = true;

    dragStartXRef.current = event.clientX || event.touches[0].clientX;
  };

  const handlePointerMove = (event) => {
    if (isDraggingRef.current) {
      const currentX = event.clientX || event.touches[0].clientX;
      const deltaX = currentX - dragStartXRef.current;
      rotationXRef.current += deltaX * 0.001;
      draggingOffset.current += deltaX * 0.01;
      // scrollYProgress.set(rotationXRef.current);
      dragStartXRef.current = currentX;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    const handleVelocityChange = () => {
      targetZRot.current = yRotation.get();
    };
    const unsub = scrollYProgress.on("change", handleVelocityChange);

    return () => unsub();
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current && groupRef.current) {
      const currentTwist = meshRef.current.material.uniforms.uTwist.value;
      meshRef.current.material.uniforms.uTime.value += delta;

      const currentScroll = scrollYProgress.get();

      let scrollVelocity =
        (currentScroll -
          previousScrollValue.current +
          (draggingOffset.current - previousDraggingOffset.current) / 30) *
        200;

      previousScrollValue.current = currentScroll;

      previousDraggingOffset.current = draggingOffset.current;

      // Smoothly interpolate to the target twist value
      const targetTwist = scrollVelocity;
      meshRef.current.material.uniforms.uTwist.value = lerp(
        currentTwist,
        targetTwist,
        6 * delta // Adjust the factor for more or less smoothing
      );

      var currentShirt = Math.floor(currentScroll * 2);

      const shirtColors =
        currentShirtModel === 0 ? shirtColors_lifestyle : shirtColors_blueprint;

      if (currentShirt < 2) {
        meshRef.current.material.uniforms.designColorPrev.value =
          shirtColors[currentShirt].designColor;
        meshRef.current.material.uniforms.shirtColorPrev.value =
          shirtColors[currentShirt].shirtColor;
        meshRef.current.material.uniforms.textColorPrev.value =
          shirtColors[currentShirt].textColor;

        meshRef.current.material.uniforms.designColorNext.value =
          shirtColors[currentShirt + 1]?.designColor;
        meshRef.current.material.uniforms.shirtColorNext.value =
          shirtColors[currentShirt + 1]?.shirtColor;
        meshRef.current.material.uniforms.textColorNext.value =
          shirtColors[currentShirt + 1]?.textColor;
      }

      // meshRef.current.material.roughness = shirtColors[currentShirt].roughness;

      meshRef.current.material.uniforms.uProgress.value = currentScroll;

      const currentRot = groupRef.current.rotation.z;
      groupRef.current.rotation.z = lerp(
        currentRot,
        targetZRot.current + draggingOffset.current,
        5 * delta
      );
    }
  });

  return (
    <group {...props} dispose={null}>
      <group
        rotation={[Math.PI / 2, 0, 0]}
        ref={groupRef}
        onPointerDown={handlePointerDown}
        onTouchStart={handlePointerDown}
      >
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          geometry={nodes["01_1"].geometry}
          material={shirtMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["01_2"].geometry}
          // material={materials.neck_FRONT_5158}
          material={shirtMaterial}
        />
      </group>
    </group>
  );
});

useGLTF.preload("/models/shirt/DrealShirt.glb");
