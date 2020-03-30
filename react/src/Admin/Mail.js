import React, {Component} from 'react';
import client from '../Store/client';
import { Markup } from 'interweave';

function MailType(props) {
  return (
    <div className="box_light4 flex_c">
    <h4>{props.title}</h4>
    <button  className="givemespace" onClick={() => props.sendMail(props.userid, 0, props.type)}>Prévisualisation</button>
    <button className="givemespace" onClick={() => props.sendMail(props.userid, 1, props.type)}>Envoi du mail</button>
    </div>
  );
}

class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: "",
      html : "<p>Prévisualisation</p>"
    }
  }
  sendMail = (id, envoi, type) => {
    return client.sendMailStatus(id, envoi, type)
    .then(res => {
      if (res.error) {
        console.log(res.error);
        this.setState({msg: res.error.response})
      } else {
        console.log(res);
        this.setState({msg: "Message envoyé",
        html : res})
      }
    });
  }

  render() {

    return (<div className="center">

      <h3>Envoi de mail</h3>

      {
        this.props.match.params.userid
          ? <>
          <div className="flex_r flex_w box_light1">

<MailType title='Je confirme la commande' type='order' sendMail={this.sendMail} userid={this.props.match.params.userid} ></MailType>
<MailType title='Je confirme le paiement' type='paiement' sendMail={this.sendMail} userid={this.props.match.params.userid} ></MailType>
<MailType title='La commande est prête' type='readytoship' sendMail={this.sendMail} userid={this.props.match.params.userid} ></MailType>
<MailType title='La commande est envoyée' type='ship' sendMail={this.sendMail} userid={this.props.match.params.userid} ></MailType>
              </div>

<div className="box_dark4"><Markup content={this.state.html} /></div>
</>

              : 'aucun envoi de mail possible'
      }

    </div>)
  }
}

export default Mail;
