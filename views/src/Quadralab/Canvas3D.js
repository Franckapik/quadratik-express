import React, {Suspense} from 'react';
import '../styles/App.scss';
import {Canvas, extend, useThree,useLoader, Dom} from 'react-three-fiber';
import { TextureLoader} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Accroche from './Accroche';
extend({ OrbitControls })

const Carreau = ({diffuseur : dif, ...alls}) => {
  const map = useLoader(TextureLoader, dif.matiere);
  return (
    <mesh {...alls}>
      <boxBufferGeometry attach="geometry" args={[dif.largeurC, dif.largeurC, dif.epaisseur]}/>
      <meshPhongMaterial attachArray="material" color ={dif.couleur}  map={map} roughness="0.8"/>
      <meshPhongMaterial attachArray="material" color ={dif.couleur}  map={map} roughness="0.8"/>
      <meshPhongMaterial attachArray="material" color ={dif.couleur}  map={map} roughness="0.8"/>
      <meshPhongMaterial attachArray="material" color ={dif.couleur}  map={map} roughness="0.8"/>
      <meshPhongMaterial attachArray="material" name="avant" color ={dif.couleur}  map={map} roughness="0.8"/>
      <meshPhongMaterial attachArray="material" name="arriere" color={dif.bothSide ? dif.couleur : "white"} map={map} roughness="0.8"/>
    </mesh>
  )
}

const Peigne = ({diffuseur : dif, ...alls}) => {
  const map = useLoader(TextureLoader, dif.matiere);
  return (
    <mesh {...alls}>
      <boxBufferGeometry attach="geometry" args={[dif.largeurP, dif.longueurP, dif.epaisseur]}/>
        <meshStandardMaterial attach="material" color ={dif.couleur}  map={map} roughness="0.8"/>
    </mesh>
  )
}

const Cadre = ({diffuseur : dif, ...alls}) => {
  const map = useLoader(TextureLoader, dif.matiere);
  return (
    <mesh {...alls} >
      <boxBufferGeometry attach="geometry" args={[dif.largeurP, dif.longueurP + dif.epaisseur,dif.epaisseur]}/>
        <meshStandardMaterial attach="material" color ={dif.couleur}  map={map} roughness="0.8"/>
    </mesh>
  )
}

const Scene = () => {
  const { camera, gl: { domElement} } = useThree()
  camera.position.set(0, 0, 0.5);
  return <orbitControls args={[camera, domElement]} />
}

const Canvas3D = ({dif, clicked, profondeur}) => {
  console.log(profondeur);
    return (
    <div className="fullsize">
      <Canvas>
        <Scene/>
        <ambientLight intensity="0.2" />
        <pointLight position={[0,0,1]} intensity="0.8"/>
        <pointLight position={[0,0,-1]} intensity="0.8"/>
        <group position={[(-dif.longueurP/2) + dif.largeurC/2, (-dif.longueurP/2) + dif.largeurC/2, -dif.largeurP/2]}>

          <Suspense fallback={<Dom>loading...</Dom>}>

          {dif.nbCarreaux.map((d, i) => {
              const x = (i % dif.rangee) * (dif.largeurC + dif.epaisseur);
              const y = Math.floor(i / dif.rangee) * (dif.largeurC + dif.epaisseur);
              const z = profondeur[i] - dif.epaisseur/2;

              return (
                <Carreau diffuseur={dif} bothside={dif.bothSide} position={[x, y, z]} name={"c" + (Number(d.id) + 1)} onClick={()=> console.log(d.id)} rotation={[0,0,Math.PI/(Math.floor(Math.random() * 2) + 1  )]}/>
              )
            })}

        {dif.nbPeignes.map((d, i) => {
          const x = (dif.largeurC /2 )+( (i % (dif.rangee-1)) * (dif.largeurC+dif.epaisseur));
          const y = dif.longueurP/2 - (dif.largeurC/2);
          const z = dif.largeurP/2;

          return (
            <>
            <Peigne diffuseur={dif} position={[x, y, z]} key={"hor"+d.id} rotation={[0,Math.PI/2,0]}/>
            <Peigne diffuseur={dif} position={[y, x, z]} key={"ver"+d.id} rotation={[Math.PI/2,0,Math.PI/2]}/>
          </>)
        })}
        <Cadre diffuseur={dif} position={[-(dif.largeurC/2), (dif.longueurP/2 - (dif.largeurC/2)), dif.largeurP/2]} rotation={[0, Math.PI/2,0]} />
        <Cadre diffuseur={dif} position={[dif.longueurP-(dif.largeurC/2), (dif.longueurP/2 - (dif.largeurC/2)), dif.largeurP/2]} rotation={[0, Math.PI/2,0]} />
        <Cadre diffuseur={dif} position={[(dif.longueurP/2 - (dif.largeurC/2)),-(dif.largeurC/2) , dif.largeurP/2]} rotation={[Math.PI/2, 0,Math.PI/2]} />
        <Cadre diffuseur={dif} position={[(dif.longueurP/2 - (dif.largeurC/2)), dif.longueurP-(dif.largeurC/2) , dif.largeurP/2]} rotation={[Math.PI/2, 0,Math.PI/2]} />
        <Accroche dif={dif} visible={dif.accroche} position={[3 * dif.largeurC + 2 * dif.epaisseur, dif.longueurP - (2 * dif.largeurC) - 2* dif.epaisseur, 0.001]} rotation={[0, 0,Math.PI]} />
        </Suspense></group>

      </Canvas>

    </div>)
}

export default Canvas3D;
