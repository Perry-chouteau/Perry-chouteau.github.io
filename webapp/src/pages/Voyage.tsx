import React, { useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { useRef } from 'react';
import { Suspense } from 'react'; 

//import Loader from '../components/Loader';
import Earth from '../models/Earth';

import { adjustSphere, addElementOnSphereByCoordinate, orientSphereToPointAtOrigin} from '../utils/three';
import { Vector2, Coordinate, coordinates } from '../constants';
import CTA from '../components/CTA';
import Country from '../components/Country';

const Voyage = () => {
  const [earthPos, earthRot, earthScale] = adjustSphere();
  const material = new THREE.Color(0x000000);
  
  return (
    <section className='max-container-no-padding min-h-screen h-full  p-0 m-0'>
      <div className='px-8 z-0'>
        <h1 className='head-text'>Around the <span className='font-semibold drop-shadow text-blue-500'>World</span> <span className='bg-orange-500 text-lg'>/!\Building/!\</span></h1>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>You can <span className='font-semibold'>follow my trips</span> all arround the world</p>
        </div>
      </div>
      {/* ThreeJs */}
      <div className='w-full h-screen m-0 p-0'>
      <Canvas camera={{ position: [0, 0, 3]}}>
        <Suspense fallback={null}>
          <directionalLight position={[1,10,5]} intensity={2.5} />
          <ambientLight intensity={0.5}/>
          <hemisphereLight color='#b1e1ff' groundColor="#000000" intensity={2} />

          <Earth position={earthPos} rotation={earthRot} scale={earthScale} castShadow />
          <OrbitControls autoRotate autoRotateSpeed={-0.2}
          enablePan={false} enableRotate={true}
          maxPolarAngle={Math.PI / 5 * 3} minPolarAngle={Math.PI / 3}
          enableZoom={false} minDistance={1.5} maxDistance={2}
          zoomSpeed={0.5}
          />
          {
              coordinates.map((coordinate: Coordinate, index:number) => {
                return <Country {...{index,coordinate}} />
              })
          }
        </Suspense>
      </Canvas>
      </div>
    </section>
  );
};

export default Voyage;