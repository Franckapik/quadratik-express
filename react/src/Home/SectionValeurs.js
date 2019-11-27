import React from 'react'

export default function SectionValeurs() {
  return (<section id="valeurs">
    <div className="flex_c flex_w style_dark fullsize"  style={{justifyContent:'space-evenly'}}>
      <div className=" flex_c center ">
        <h1>
          | 0<sub>4</sub>
          |
        </h1>
        <h2>
          Les
          <span className="letter_special">v</span>aleurs de l'Atelier
        </h2>
      </div>

      <div className="flex_r" style={{justifyContent:'center'}}>

        <img className="valeurs_img_atelier center mobile_hide" src="images/Fab2.jpg" alt="Aperçu de l'espace de travail de l'atelier"/>

        <div className="valeurs_text">
          <span className="mobile_hide">Un studio de musique est<br></br>
            un espace intime
            <br></br>où l'art et la création gouverne. L'esthétique et l’inspiration sont
            <br></br>des éléments essentiels
            <br></br>
            dans nos activités.<br></br>
          </span>
          Nous sommes fiers<br></br>
          de proposer un matériel répondant
          <br></br>
          aux attentes des personnes passionées par le son,<br></br>
          avec un respect du travail de l'artisan,<br></br>
          de sa santé et de l’environnement.
        </div>
      </div>
    </div>
  </section>)
}
