import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Stage } from '@react-three/drei';

function Model() {
  const gltf = useGLTF('/Bigscreen.glb');
  return <primitive object={gltf.scene} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 45 }}
        style={{ background: '#111' }}
      >
        <Stage environment="city" intensity={0.6}>
          <Model />
        </Stage>
        <OrbitControls 
          autoRotate={false}
          enableZoom={true}
          enablePan={true}
          minDistance={2}
          maxDistance={20}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}