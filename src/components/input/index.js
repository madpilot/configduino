import { h, Component } from 'preact';
import ValidatedInput from '../validated-input/index.js';
import styles from './style.css';
import Validator from '../../validation/validator.js';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this._id = "input_" + Math.random().toString(36).substring(2, 7);

    this.state = {
      valid: false,
      error: '',
      changed: false
    }
  }

  renderError() {
    if(this.state.changed && !this.state.valid) {
      return (
        <span className={styles.error}>{this.state.error}</span>
      );
    } else {
      return "";
    }
  }

  renderLabel() {
    if(typeof(this.props.label) != "undefined") {
      return (
        <label for={this._id} className={styles.label}>
          {this.props.label}
          {this.renderError()}
        </label>
      );
    } else {
      return "";
    }
  }

  render() {
    let props = Object.assign({}, this.props);
    delete props['label'];
    delete props['className'];

    let className = styles.container;
    if(this.props.className) {
      className += " " + this.props.className;
    }

    return (
      <div className={className}>
        {this.renderLabel()}
        <span className={styles.wrapper}>
          <ValidatedInput id={this._id} {...props} className={styles.input} onValidate={this.setState.bind(this)} />
        </span>
      </div>
    );
  }
}
