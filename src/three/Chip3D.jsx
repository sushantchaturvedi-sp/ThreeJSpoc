import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const Chip3D = () => {
    const meshRef = useRef()

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
        }
    })

    return (
        <group scale={1.5}>
            <Float speed={5} rotationIntensity={1} floatIntensity={1}>
                {/* Main Chip Body */}
                <RoundedBox ref={meshRef} args={[1, 1, 0.2]} radius={0.05} smoothness={4}>
                    <meshStandardMaterial color="#2d2d2d" metalness={0.8} roughness={0.2} />
                </RoundedBox>

                {/* Chip Pins/Details */}
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshStandardMaterial color="#333" />
                </mesh>

                {/* "M4" Label */}
                <Text
                    position={[0, 0, 0.12]}
                    fontSize={0.2}
                    color="#fff"
                    font="/fonts/bold.otf"
                    anchorX="center"
                    anchorY="middle"
                >
                    M4
                </Text>

                {/* Outer Glow / Circuitry effect */}
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[1.1, 1.1, 0.1]} />
                    <MeshDistortMaterial
                        color="#6d00ff"
                        speed={2}
                        distort={0.4}
                        radius={1}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
            </Float>
        </group>
    )
}

export default Chip3D
