import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, Float, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { performanceImages, performanceImgPositions } from '../constants'

const PerformanceItem = ({ src, position, index }) => {
    const ref = useRef()

    // Subtle parallax effect based on mouse or scroll
    useFrame((state) => {
        if (!ref.current) return
        const time = state.clock.getElapsedTime()
        ref.current.position.y = position[1] + Math.sin(time + index) * 0.1
        ref.current.position.x = position[0] + Math.cos(time * 0.5 + index) * 0.05
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Image
                ref={ref}
                url={src}
                position={position}
                scale={[3, 2]} // Adjusted based on expected aspect ratio
                transparent
                opacity={0.8}
            />
        </Float>
    )
}

const PerformanceScene = () => {
    const { viewport } = useThree()

    // Map performance positions to 3D space
    const items = useMemo(() => {
        return performanceImgPositions.map((pos, i) => {
            const img = performanceImages.find(img => img.id === pos.id)
            if (!img) return null

            // Map percentage positions to 3D world space
            // Assuming viewport.width/height matches the section container
            const x = (pos.left !== undefined ? (pos.left / 100) * viewport.width : (1 - pos.right / 100) * viewport.width) - viewport.width / 2
            const y = (pos.bottom / 100) * viewport.height - viewport.height / 2
            const z = i * -1 // Depth layering

            return {
                ...img,
                position: [x, y, z]
            }
        }).filter(Boolean)
    }, [viewport])

    return (
        <>
            <Environment preset="city" />
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {items.map((item, i) => (
                <PerformanceItem
                    key={item.id}
                    src={item.src}
                    position={item.position}
                    index={i}
                />
            ))}
        </>
    )
}

const Performance3D = () => {
    return (
        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
            <Canvas>
                <PerformanceScene />
            </Canvas>
        </div>
    )
}

export default Performance3D
