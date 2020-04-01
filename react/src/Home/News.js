import React, {Component} from 'react';
import client from '../Store/client';
import {Markup} from 'interweave';

function BoxNews(props) {
  return (
    <div className="box_light1 box_news flex_c givemespace">
      <div className="flex_r">

        <img src={props.img} className="givemespace vignette mobile_hide"></img>

        <div className="flex_c">
          <a href={props.link}>
            <h3>{props.title}</h3>
          </a>
          <div className="noImg"><Markup content={props.description}/></div>
        </div>
      </div>
    </div>
  );
}

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: false
    }
  }

  componentDidMount() {
    client.newsFetch(this.props.page)
    .then(data => {
      this.setState({news: data})
    })
  }

  render() {
    return (<div>
      {
        this.state.news
        ? this.state.news.sort(function (a, b) { return b.id - a.id;}).slice(this.props.first,this.props.second).map((a, i) => {
            return (
              <BoxNews img={a.img} title={a.titre} description={a.description}></BoxNews>
            )
          })
          : "Chargement"
      }
    </div>)

  }
}

export default News;
export {
  BoxNews
};
