import React, {Component} from 'react';
import shopStore from '../Store/shopStore';

class Reduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    shopStore.getReduction(this.state.value);
    event.preventDefault();
  }

  render() {
    return (<form className="flex_r" onSubmit = {
      this.handleSubmit
    } > <input type = "text" size = "8" value = {
      this.state.value
    }
    onChange = {
      this.handleChange
    } /> <input type = "submit" value = "Ok" / > < /form>
    );
  }
}

export default Reduction;
