import React, { useRef } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import { angleToRadians } from '../../utils/angles';

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

			<OrbitControls ref={orbitControlsRef} maxPolarAngle={angleToRadians(80)} minPolarAngle={angleToRadians(30)}/>
			{/* Ball */}
			<mesh position={[0, 0.5, 0]}>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshStandardMaterial color="#f1f1f1"/>
			</mesh>

			{/* Floor */}
			<mesh rotation={[-(angleToRadians(90)), 0, 0]}>
				<planeGeometry args={[6, 6]} />
				<meshStandardMaterial color="#A020F0"/>
			</mesh>

			{/* Ambient Light */}
			<ambientLight args={["#ffffff", 1]}/>
		</>
	);
}