import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const BoxModel = () => {
  const model = useLoader(GLTFLoader, '/models/product_closed.glb')
  const ref = useRef()

  useFrame(() => {
    if (isOpen) {
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <>
      <primitive object={model.scene} ref={ref} scale={[1, 1, 1]} />
      <OrbitControls />
    </>
  )
}

export default BoxModel
