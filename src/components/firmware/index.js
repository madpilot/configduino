import { h, Component } from 'preact';
import Input from '../input';
import Button from '../button';
import * as Validation from '../../validation/validator.js';
import styles from './style.css';

export default class FirmwarePanel extends Component {
  fileSelect(e) {
    console.log(e.target.value)
  }

  render() {
    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>Update the firmware</h3>
        <Input name="file" label="Firmware" type="file" onChange={this.fileSelect.bind(this)} validators={[ Validation.required() ]} />
      </section>
    );
  }
}
