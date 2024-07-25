"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function ProductClosed(props) {
  const group = useRef()
  const [hoveredCorner, setHoveredCorner] = useState(null);


  const { nodes, materials, animations } = useGLTF('/models/product_closed.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (hoveredCorner) {
      gsap.to(hoveredCorner.position, {
        z: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(group.current.children, {
        z: 0,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  }, [hoveredCorner]);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHoveredCorner(e.object);
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHoveredCorner(null);
  };  

  useGSAP(() => {
    gsap.to(group.current.position, {
      x: "+=0.1",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1
    });
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group  name="Scene">
        <group name="Cube049"
          
         scale={[0.258, 0.262, 0.336]}>
          <mesh
            name="Cube049_1"
            castShadow
            receiveShadow
            
            geometry={nodes.Cube049_1.geometry}
            material={materials['Material.020']}
          />
          <mesh
            name="Cube049_2"
            castShadow
            receiveShadow
            
            geometry={nodes.Cube049_2.geometry}
            material={materials['Material.022']}
          />
          <group
            name="Cube035"
            position={[-4.232, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}>

            <mesh
              name="Cube114"
              castShadow
              receiveShadow
              geometry={nodes.Cube114.geometry}
              material={materials['Dull Silver Metal.001']}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}>
              <mesh
                name="Cube115"
                castShadow
                receiveShadow
                geometry={nodes.Cube115.geometry}
                material={materials['Material.014']}
                position={[0, -3.059, 0]}>
                <mesh
                  name="Cube116"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube116.geometry}
                  material={nodes.Cube116.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve016"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve016.geometry}
                  material={materials['Material.009']}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder016"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder016.geometry}
                  material={nodes.Cylinder016.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}>
                  <mesh
                    name="Cube117"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube117.geometry}
                    material={materials['Material.012']}
                    position={[0, -1.345, 0]}
                    rotation={[0, 0, 3.025]}
                    scale={[0.002, 0.287, 0.002]}
                  />
                </mesh>
                <mesh
                  name="Plane022"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane022.geometry}
                  material={materials['cap.002']}
                  position={[-0.001, 0.358, 0.009]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
            <mesh
              name="Cube118"
              castShadow
              receiveShadow
              
              geometry={nodes.Cube118.geometry}
              material={materials['Material.011']}
              position={[0, 0.044, 0]}>
              <mesh
                name="Cube119"
                castShadow
                receiveShadow
                geometry={nodes.Cube119.geometry}
                material={materials['Material.010']}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
          </group>
          <mesh
            name="Cube047"
            castShadow
            receiveShadow
            geometry={nodes.Cube047.geometry}
            material={materials['Material.018']}
            position={[0, 1.383, -3.517]}>
            <mesh
              name="Cube046"
              castShadow
              receiveShadow
              geometry={nodes.Cube046.geometry}
              material={materials['Material.016']}
              position={[0, 0, 6.875]}>
              <mesh
                name="Plane007"
                castShadow
                receiveShadow
                geometry={nodes.Plane007.geometry}
                material={materials['Material.001']}
                position={[0.023, 1.65, 0.174]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[-5.41, -5.334, -4.16]}
              />
            </mesh>
            <mesh
              name="Plane014"
              castShadow
              receiveShadow
              geometry={nodes.Plane014.geometry}
              material={materials['Material.006']}
              position={[0.023, -0.092, 2.735]}
              rotation={[Math.PI, 0, 0]}
              scale={[-5.41, -5.334, -4.16]}
            />
          </mesh>
          <mesh
            name="Cube048"
            castShadow
            receiveShadow
            geometry={nodes.Cube048.geometry}
            material={materials['Material.019']}
            position={[0, 0.114, -0.223]}
            scale={[0.964, 1, 1.011]}
          />
          <group
            name="Cube093"
            position={[3.943, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}>
            <mesh
              name="Cube094"
              castShadow
              receiveShadow
              geometry={nodes.Cube094.geometry}
              material={materials['Material.011']}
              position={[0, 0.044, 0]}>
              <mesh
                name="Cube095"
                castShadow
                receiveShadow
                geometry={nodes.Cube095.geometry}
                material={materials['Material.007']}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
            <mesh
              name="Cube096"
              castShadow
              receiveShadow
              geometry={nodes.Cube096.geometry}
              material={materials['Dull Silver Metal.001']}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}>
              <mesh
                name="Cube097"
                castShadow
                receiveShadow
                geometry={nodes.Cube097.geometry}
                material={materials['Material.014']}
                position={[0, -3.059, 0]}>
                <mesh
                  name="Cube098"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube098.geometry}
                  material={nodes.Cube098.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve013"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve013.geometry}
                  material={materials['Material.009']}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder013"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder013.geometry}
                  material={nodes.Cylinder013.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}>
                  <mesh
                    name="Cube099"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube099.geometry}
                    material={materials['Material.012']}
                    position={[0, -1.345, 0]}
                    rotation={[0, 0, 3.025]}
                    scale={[0.002, 0.287, 0.002]}
                  />
                </mesh>
                <mesh
                  name="Plane019"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane019.geometry}
                  material={materials['cap.002']}
                  position={[-0.001, 0.358, 0.009]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
          </group>
          <group
            name="Cube100"
            position={[1.294, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}>
            <mesh
              name="Cube101"
              castShadow
              receiveShadow
              geometry={nodes.Cube101.geometry}
              material={materials['Material.011']}
              position={[0, 0.044, 0]}>
              <mesh
                name="Cube102"
                castShadow
                receiveShadow
                geometry={nodes.Cube102.geometry}
                material={materials['Material.005']}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
            <mesh
              name="Cube103"
              castShadow
              receiveShadow
              geometry={nodes.Cube103.geometry}
              material={materials['Dull Silver Metal.001']}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}>
              <mesh
                name="Cube104"
                castShadow
                receiveShadow
                geometry={nodes.Cube104.geometry}
                material={materials['Material.014']}
                position={[0, -3.059, 0]}>
                <mesh
                  name="Cube105"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube105.geometry}
                  material={nodes.Cube105.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve014"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve014.geometry}
                  material={materials['Material.009']}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder014"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder014.geometry}
                  material={nodes.Cylinder014.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}>
                  <mesh
                    name="Cube106"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube106.geometry}
                    material={materials['Material.012']}
                    position={[0, -1.345, 0]}
                    rotation={[0, 0, 3.025]}
                    scale={[0.002, 0.287, 0.002]}
                  />
                </mesh>
                <mesh
                  name="Plane020"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane020.geometry}
                  material={materials['cap.002']}
                  position={[-0.001, 0.358, 0.009]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
          </group>
          <group
            name="Cube107"
            position={[-1.446, 0.043, 3.027]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[98.284, 75.563, 96.903]}>
            <mesh
              name="Cube108"
              castShadow
              receiveShadow
              geometry={nodes.Cube108.geometry}
              material={materials['Material.011']}
              position={[0, 0.044, 0]}>
              <mesh
                name="Cube109"
                castShadow
                receiveShadow
                geometry={nodes.Cube109.geometry}
                material={materials['Material.004']}
                rotation={[0, -0.017, 0]}
                scale={0.996}
              />
            </mesh>
            <mesh
              name="Cube110"
              castShadow
              receiveShadow
              geometry={nodes.Cube110.geometry}
              material={materials['Dull Silver Metal.001']}
              position={[0, 0.079, -0.001]}
              rotation={[-0.006, 0, 0]}
              scale={0.009}>
              <mesh
                name="Cube111"
                castShadow
                receiveShadow
                geometry={nodes.Cube111.geometry}
                material={materials['Material.014']}
                position={[0, -3.059, 0]}>
                <mesh
                  name="Cube112"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube112.geometry}
                  material={nodes.Cube112.material}
                  position={[0, -0.486, 0]}
                  scale={[0.996, 1, 0.996]}
                />
                <mesh
                  name="Curve015"
                  castShadow
                  receiveShadow
                  geometry={nodes.Curve015.geometry}
                  material={materials['Material.009']}
                  position={[-0.4, 1.936, 1.254]}
                  rotation={[1.577, -Math.PI / 2, 0]}
                  scale={0.563}
                />
                <mesh
                  name="Cylinder015"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder015.geometry}
                  material={nodes.Cylinder015.material}
                  position={[0, -2.395, 0.008]}
                  scale={[74.864, 1.468, 74.864]}>
                  <mesh
                    name="Cube113"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube113.geometry}
                    material={materials['Material.012']}
                    position={[0, -1.345, 0]}
                    rotation={[0, 0, 3.025]}
                    scale={[0.002, 0.287, 0.002]}
                  />
                </mesh>
                <mesh
                  name="Plane021"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane021.geometry}
                  material={materials['cap.002']}
                  position={[-0.001, 0.358, 0.009]}
                  rotation={[-1.565, 0, 1.676]}
                  scale={0.961}
                />
              </mesh>
            </mesh>
          </group>
          <group name="Plane005" position={[0.023, -1.071, 0.023]} scale={[5.825, 3.501, 3.461]}>
            <mesh
              name="Plane008"
              castShadow
              receiveShadow
              geometry={nodes.Plane008.geometry}
              material={materials['Material.001']}
            />
            <mesh
              name="Plane008_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane008_1.geometry}
              material={materials['Material.001']}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/product_closed.glb')
