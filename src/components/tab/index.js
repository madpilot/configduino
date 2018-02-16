import { h, Component } from 'preact';

import styles from './style.css';

export default class Tab extends Component {
  render() {
    if(this.props.current == this.props.name) {
      return (
        <div className={styles.container}>
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}
