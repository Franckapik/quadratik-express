import React, {Component} from 'react';
import client from '../Store/client';
import {Markup} from 'interweave';
import {BoxNews} from './News'

class Rss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rss: false
    }
  }

  componentDidMount() {
    client.getRss(this.props.url).then(data => {
      this.setState({rss: data.items})
    })
  }

  render() {
    return (<div>
      {
        this.state.rss
          ? this.state.rss.slice(0, this.props.nbNews).map((a, i) => {
            return (
              <BoxNews img={a.enclosure.link ? a.enclosure.link: a.thumbnail} title={a.title} description={a.description}></BoxNews>
            )
          })
          : "Chargement"
      }
    </div>)

  }
}

export default Rss;
