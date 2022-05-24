import { PerspectiveCamera } from '@react-three/drei';
import { angleToRadians } from '../../utils/angles';

export default function Three() {
	return (
		<>
			{/* Camera */}
			<PerspectiveCamera makeDefault position={[0, 1, 5]}/>

			{/* Ball */}
			<mesh position={[0, 0.5, 0]}>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshStandardMaterial color="#ffffff"/>
			</mesh>

			{/* Floor */}
			<mesh rotation={[-(angleToRadians(90)), 0, 0]}>
				<planeGeometry args={[6, 6]} />
				<meshStandardMaterial color="#A020F0"/>
			</mesh>

			{/* Ambient Light */}
			<ambientLight args={["#fff000", 1]}/>
		</>
	);
}