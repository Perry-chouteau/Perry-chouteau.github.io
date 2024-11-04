import { useState, useRef } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { addElementOnSphereByCoordinate} from '../utils/three';
import { Coordinate, coordinates, Vector2 } from '../constants';


const Country = ({index, coordinate}:{index:number, coordinate: Coordinate}) => {
  const radius = 1.07;  // Distance from the center of the sphere
  const position = addElementOnSphereByCoordinate(radius, coordinate.x, coordinate.y);
  const geometry = new THREE.SphereGeometry(0.0125);
  const material = new THREE.MeshStandardMaterial({color: 0xff0000, transparent: true, opacity: 0.8});
  material.transparent = true;
  const [showText, setShowText] = useState(false); // State to control text visibility
  console.log(coordinate);
  return(
      <group key={index}>
          <mesh position={position} geometry={geometry} material={material} 
          onPointerOver={() => {setShowText(true)}}
          onPointerOut={() => {setShowText(false)}}
          />
          {
            coordinate.points.map((point: Vector2) => {
              const position = addElementOnSphereByCoordinate(radius, coordinate.x+point.x, coordinate.y+point.y);
              const geometry = new THREE.SphereGeometry(0.0075);
              const material = new THREE.MeshStandardMaterial({color: coordinate.color, transparent: true, opacity: (showText)? 1 : 0.5});
              return(
                <mesh position={position} geometry={geometry} material={material}/>
              )
            })
          }
          {/* 3D Text */}          
        </group>
  );
};

export default Country;