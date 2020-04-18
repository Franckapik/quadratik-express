import {TextureLoader} from 'three';
import React, {useRef} from 'react'
import {useLoader} from 'react-three-fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import accroche from './accroche.gltf';

const Accroche = ({
  dif,
  ...alls
}) => {
  const gltf = useLoader(GLTFLoader, accroche);
  const map = useLoader(TextureLoader, dif.matiere);
  const group = useRef()
  const {nodes} = gltf;
  console.log(nodes.accroche.geometry);
  return (<group ref={group} dispose={null}>
    <mesh geometry = {nodes.accroche.geometry} {...alls} >
        <meshStandardMaterial attach="material" color ={dif.couleur}  map={map} roughness="0.8"/>
    </mesh>
  </group>)
}

export default Accroche;
