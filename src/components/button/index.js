import { h, Component } from 'preact';
import styles from './style.css';

export default class Button extends Component {
  render() {
    let containerClassName = styles.container;
    if(this.props.className) {
      containerClassName += " " + this.props.className;
    }

    let disabled = !!this.props.disabled;
    if(this.context.validation) {
      disabled = !this.context.validation.valid();
    }

    return (
      <div className={containerClassName}>
        <button className={styles.button} disabled={disabled}>{this.props.children}</button>
      </div>
    );
  }
}
