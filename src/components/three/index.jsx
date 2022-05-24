import React, { useRef } from 'react';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../../utils/angles';
import * as THREE from "three";

export default function Three() {

	const orbitControlsRef = useRef(null)
	useFrame((state) => {
		if (!!orbitControlsRef.current) {
			const { x, y } = state.mouse;
			orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(90));
			orbitControlsRef.current.setPolarAngle((y + 0.9) * angleToRadians(60));
			orbitControlsRef.current.update();
		}
	});

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
			<mesh position={[0, 0.5, 0]} castShadow>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.3}/>
			</mesh>

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