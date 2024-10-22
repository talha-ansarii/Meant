/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ProductOpenNight(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/product_Open_Night.glb"
  );
  const { actions } = useAnimations(animations, group);

  useGSAP(() => {
    gsap.to(group.current.position, {
      x: "+=0.1",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1,
    });
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Cube035"
          position={[-0.183, 0, 0.171]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={4.249}
        />
        <group
          name="Cube015"
          rotation={[0.873, 0, 0]}
          scale={[0.258, 0.262, 0.336]}
        >
          <mesh
            name="Cube015_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_1.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="Cube015_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_2.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cube016"
            castShadow
            receiveShadow
            geometry={nodes.Cube016.geometry}
            material={materials["Material.008"]}
            position={[0, 0.114, -0.223]}
            scale={[0.964, 1, 1.011]}
          />
          <mesh
            name="Cube017"
            castShadow
            receiveShadow
            geometry={nodes.Cube017.geometry}
            material={materials["Material.013"]}
            position={[0, 1.383, -3.517]}
            rotation={[-2.104, 0, 0]}
            scale={[1, 0.84, 1.218]}
          >
            <mesh
              name="Cube018"
              castShadow
              receiveShadow
              geometry={nodes.Cube018.geometry}
              material={materials["Material.015"]}
              position={[0, 0, 6.875]}
            >
              <mesh
                name="Plane015"
                castShadow
                receiveShadow
                geometry={nodes.Plane015.geometry}
                material={materials["Material.017"]}
                position={[0.023, 1.65, 0.174]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[-5.41, -5.334, -4.16]}
              />
            </mesh>
            <mesh
              name="Plane003"
              castShadow
              receiveShadow
              geometry={nodes.Plane003.geometry}
              material={materials["Material.021"]}
              position={[0.023, -0.092, 2.735]}
              rotation={[Math.PI, 0, 0]}
              scale={[-5.41, -5.334, -4.16]}
            />
          </mesh>
          <group
            name="Cube065"
            position={[3.943, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}
          >
            <mesh
              name="Cube066"
              castShadow
              receiveShadow
              geometry={nodes.Cube066.geometry}
              material={materials["Dull Silver Metal.002"]}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}
            >
              <mesh
                name="Cube067"
                castShadow
                receiveShadow
                geometry={nodes.Cube067.geometry}
                material={materials["Material.023"]}
                position={[0, -3.059, 0]}
              >
                <mesh
                  name="Cube070"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube070.geometry}
                  material={nodes.Cube070.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve009"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve009.geometry}
                  material={materials["Material.024"]}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder009"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder009.geometry}
                  material={nodes.Cylinder009.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}
                />
                <mesh
                  name="Plane001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane001.geometry}
                  material={materials["cap.001"]}
                  position={[-0.001, 0.358, 0.008]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
            <mesh
              name="Cube068"
              castShadow
              receiveShadow
              geometry={nodes.Cube068.geometry}
              material={materials["Material.026"]}
              position={[0, 0.044, 0]}
            >
              <mesh
                name="Cube069"
                castShadow
                receiveShadow
                geometry={nodes.Cube069.geometry}
                material={materials["Material.027"]}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
          </group>
          <group
            name="Cube072"
            position={[1.294, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}
          >
            <mesh
              name="Cube073"
              castShadow
              receiveShadow
              geometry={nodes.Cube073.geometry}
              material={materials["Dull Silver Metal.002"]}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}
            >
              <mesh
                name="Cube074"
                castShadow
                receiveShadow
                geometry={nodes.Cube074.geometry}
                material={materials["Material.023"]}
                position={[0, -3.059, 0]}
              >
                <mesh
                  name="Cube075"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube075.geometry}
                  material={nodes.Cube075.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve010"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve010.geometry}
                  material={materials["Material.024"]}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder010"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder010.geometry}
                  material={nodes.Cylinder010.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}
                />
                <mesh
                  name="Plane002"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane002.geometry}
                  material={materials["cap.001"]}
                  position={[-0.001, 0.358, 0.008]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
            <mesh
              name="Cube076"
              castShadow
              receiveShadow
              geometry={nodes.Cube076.geometry}
              material={materials["Material.026"]}
              position={[0, 0.044, 0]}
            >
              <mesh
                name="Cube077"
                castShadow
                receiveShadow
                geometry={nodes.Cube077.geometry}
                material={materials["Material.028"]}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
          </group>
          <group
            name="Cube079"
            position={[-1.446, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}
          >
            <mesh
              name="Cube080"
              castShadow
              receiveShadow
              geometry={nodes.Cube080.geometry}
              material={materials["Dull Silver Metal.002"]}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}
            >
              <mesh
                name="Cube081"
                castShadow
                receiveShadow
                geometry={nodes.Cube081.geometry}
                material={materials["Material.023"]}
                position={[0, -3.059, 0]}
              >
                <mesh
                  name="Cube082"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube082.geometry}
                  material={nodes.Cube082.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve011"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve011.geometry}
                  material={materials["Material.024"]}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder011"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder011.geometry}
                  material={nodes.Cylinder011.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}
                />
                <mesh
                  name="Plane017"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane017.geometry}
                  material={materials["cap.001"]}
                  position={[-0.001, 0.358, 0.008]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
            <mesh
              name="Cube084"
              castShadow
              receiveShadow
              geometry={nodes.Cube084.geometry}
              material={materials["Material.026"]}
              position={[0, 0.044, 0]}
            >
              <mesh
                name="Cube085"
                castShadow
                receiveShadow
                geometry={nodes.Cube085.geometry}
                material={materials["Material.029"]}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
          </group>
          <group
            name="Cube086"
            position={[-4.232, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}
          >
            <mesh
              name="Cube087"
              castShadow
              receiveShadow
              geometry={nodes.Cube087.geometry}
              material={materials["Material.026"]}
              position={[0, 0.044, 0]}
            >
              <mesh
                name="Cube088"
                castShadow
                receiveShadow
                geometry={nodes.Cube088.geometry}
                material={materials["Material.030"]}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
            <mesh
              name="Cube089"
              castShadow
              receiveShadow
              geometry={nodes.Cube089.geometry}
              material={materials["Dull Silver Metal.002"]}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}
            >
              <mesh
                name="Cube090"
                castShadow
                receiveShadow
                geometry={nodes.Cube090.geometry}
                material={materials["Material.023"]}
                position={[0, -3.059, 0]}
              >
                <mesh
                  name="Cube091"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube091.geometry}
                  material={nodes.Cube091.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve012"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve012.geometry}
                  material={materials["Material.024"]}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder012"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012.geometry}
                  material={nodes.Cylinder012.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}
                />
                <mesh
                  name="Plane018"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane018.geometry}
                  material={materials["cap.001"]}
                  position={[-0.001, 0.358, 0.008]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
          </group>
          <mesh
            name="Plane016"
            castShadow
            receiveShadow
            geometry={nodes.Plane016.geometry}
            material={materials["Material.017"]}
            position={[0.023, -1.071, 0.023]}
            scale={[5.825, 3.501, 3.461]}
          />
        </group>
        <group
          name="Cube093"
          position={[0.17, 0, 0.171]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={4.249}
        />
        <group
          name="Cube100"
          position={[0.056, 0, 0.171]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={4.249}
        />
        <group
          name="Cube107"
          position={[-0.063, 0, 0.171]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={4.249}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/product_Open_Night.glb");
