import { h, Component } from 'preact';
import styles from './style.css';

export default class Select extends Component {
   constructor() {
    super();
    this._id = "input_" + Math.random().toString(36).substring(2, 7);
  }

  renderOption(option) {
    if(this.props.value == option.attributes.value) {
      option.attributes.selected = "selected";
    }

    return option;
  }

  renderLabel() {
    if(this.props.label) {
      return (
        <label for={this._id} className={styles.label}>
          {this.props.label}
        </label>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <div>
        {this.renderLabel()}

        <span className={styles.wrapper}>
          <select {...this.props} id={this._id} className={styles.select}>
            {this.props.children.map((c) => { return this.renderOption(c) })}
          </select>
        </span>
      </div>
    );
  }
}
