import React from 'react'
import Rss from './Rss'
import News from './News'

export default function SectionValeurs() {
  return (
  <section id="valeurs">
    <div className="flex_c style_dark fullsize" style={{
        justifyContent: 'space-evenly'
      }}>
      <div className=" flex_c center ">
        <h1> | 0<sub>4</sub> | </h1>
        <h2> <span className="letter_special">a</span>ctualité sonore </h2>
      </div>
      <div className="flex_r flex_w fullsize">

        <div className="flex_c w50">
          <News first="0" second="1" page='home'></News>
          <News first="1" second="2" page='home'></News>
        </div>

        <div className="flex_c w50 mobile_hide">

            <Rss nbNews="1" url='https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffr.audiofanzine.com%2Fnews%2Fa.rss.xml'></Rss>
            <Rss nbNews="1" url='https://api.rss2json.com/v1/api.json?rss_url=http://www.lesinrocks.com/musique/feed/'></Rss>

        </div>

      </div>

    </div>
  </section>)
}
