import React, { useEffect, useRef } from 'react';
import { Environment, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../../utils/angles';
import * as THREE from "three";
import gsap from 'gsap';
import Car from '../car';

export default function Three() {
	
	// Using Textures
	//const colorMapTexture = useTexture();

	const orbitControlsRef = useRef(null)

	// Code to move camera according to mouse
	// useFrame((state) => {
	// 	if (!!orbitControlsRef.current) {
	// 		const { x, y } = state.mouse;
	// 		orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(90));
	// 		orbitControlsRef.current.setPolarAngle((y + 0.9) * angleToRadians(60));
	// 		orbitControlsRef.current.update();
	// 	}
	// });

	// Animation
	const ballRef = useRef();
	useEffect(() => {
		if(!!ballRef.current) {

			// Timeline
			const timeline = gsap.timeline();

			// x axis movement
			timeline.from(ballRef.current.position, {
				x: -2,			
				duration: 1.5,				
			});

			// y axis movement
			timeline.from(ballRef.current.position, {
				y: 2.5,			
				duration: 1.2,
				ease: "bounce.out"
			}, "<");
		}
	}, [])

	return (
		<>
			{/* Camera */}
			<PerspectiveCamera makeDefault position={[0, 1, 8]}/>

			<OrbitControls 
				ref={orbitControlsRef} 
				maxPolarAngle={angleToRadians(80)} 
				minPolarAngle={angleToRadians(30)}
			/>

			{/* Ball */}
			<mesh position={[0, 0.5, 0]} castShadow ref={ballRef}>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3}/>
			</mesh>

			{/* Car */}			
			<Car />
			
			{/* Floor */}
			<mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial color="#1ea3d8" />
			</mesh>

			{/* Ambient Light */}
			<ambientLight args={["#ffffff", 0.25]}/>

			{/* Spot light */}
			<spotLight 
				args={["#ffffff", 0.6, 0, angleToRadians(20), 0.3]} 
				position={[-6, 4, 0]} 
				castShadow 
			/>

			{/* Enviroment */}
			<Environment background>
				<mesh scale={100}>
					<sphereGeometry args={[1, 64, 64]} />
					<meshBasicMaterial side={THREE.BackSide} color="#2266cc"/>
				</mesh>
			</Environment>
		</>
	);
}