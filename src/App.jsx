import Three from './components/three';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css'

function App() {
	return (
		<Canvas id="three-canvas-container">
			<Suspense fallback={null}>
				<Three />
			</Suspense>
		</Canvas>
  )
}

export default App
