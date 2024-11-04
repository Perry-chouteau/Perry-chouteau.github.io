import * as THREE from 'three';

export const adjustSphere = () => {
  let position = [0, 0, 0];
  let rotation = [-Math.PI / 360 * 140, -Math.PI/360*-20, -2*Math.PI/360*180];
  let scale = [1, 1, 1];
  
  return [position, rotation, scale];
}

/**
 * 
 * @param radius  sphere radius
 * @param theta spherical coordinate theta
 * @param phi  spherical coordinate phi
 */
export const addElementOnSphereByCoordinate = (radius: number, theta: number, phi: number) => {
  // Convert theta and phi to radians if they are in degrees
  const thetaRad = -theta * (Math.PI / 180);
  const phiRad = phi * (Math.PI / 180);

  // Calculate position
  return new THREE.Vector3(
    radius * Math.sin(phiRad) * Math.cos(thetaRad),
    -radius * Math.cos(phiRad),
    radius * Math.sin(phiRad) * Math.sin(thetaRad)
  );
}

// Function to orient the sphere so a specific point faces the origin
export const orientSphereToPointAtOrigin = (sphere: any, radius: number, theta: number, phi: number) => {
  // Calculate the target point on the sphere
  const targetPoint = addElementOnSphereByCoordinate(radius, theta, phi);
  
  // Calculate the direction vector from the sphere's center to the target point
  const direction = targetPoint.clone().normalize();

  // Calculate the rotation quaternion to align the sphere
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
  sphere.quaternion.copy(quaternion);
}