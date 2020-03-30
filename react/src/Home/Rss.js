import React, {Component} from 'react';
import client from '../Store/client';
import { Markup } from 'interweave';


class Rss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rss: false
    }
  }

  componentDidMount() {
    client.getRss().then(data => {
      this.setState({rss: data.items})
    })
  }

  render() {
    return (<div className="rss">
    {
          this.state.rss
            ? this.state.rss.slice(0, this.props.nbNews).map((a, i) => {
              return (
                <p className="givemespace box_light1"><a href={a.link}>{a.title} </a> <Markup content={a.description} /></p>
              )
            })
            : "non"
        }
    </div>)

  }
}

export default Rss;
