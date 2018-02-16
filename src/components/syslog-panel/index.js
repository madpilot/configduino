import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';
import Select from '../select';

import * as Validation from '../../validation/validator.js';

import styles from './style.css';

const LEVELS = ["Emergency", "Alert", "Critical", "Error", "Warning", "Notice", "Information", "Debug"]
const TEXT_VALIDATORS = [ Validation.required(), Validation.length(255) ];

export default class SyslogPanel extends Component {
  update(state) {
    this.props.onUpdate(Object.assign({}, this.props, state));
  }

  onFieldChange(field) {
    return (e) => {
      let s = {}
      s[field] = e.target.value;
      this.update(s);
    }
  }

  onSyslogChange(e) {
    if(e.target.checked) {
      this.update({ syslog: true });
    } else {
      this.update({ syslog: false });
    }
  }

  renderForm() {
    if(this.props.syslog) {

      return (
        <div class={styles.form}>
          <section class={styles['server-port']}>
            <Input
              label="Server" 
              type="text" 
              name="syslogHost"
              placeholder="server.local" 
              autocomplete="off" 
              autocapitalize="off" 
              value={this.props.syslogHost} 
              onInput={this.onFieldChange('syslogHost').bind(this)} 
              className={styles.server} 
              validators={TEXT_VALIDATORS}
              />

            <Input 
              label="Port" 
              type="number" 
              name="syslogPort"
              placeholder="514" 
              min="0" 
              max="32768" 
              value={this.props.syslogPort} 
              onInput={this.onFieldChange('syslogPort').bind(this)} 
              className={styles.port} />
          </section>

          <Select label="Level" name="syslogLevel" onChange={this.onFieldChange('syslogLevel').bind(this)} value={this.props.syslogLevel}>
            {Object.keys(LEVELS).map((index) => { return <option value={index}>{LEVELS[index]}</option> })}
          </Select>
        </div>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>Syslog settings</h3>
        <BinaryInput 
          label="Send logs to a remote syslog server" 
          type="checkbox" 
          checked={this.props.syslog} 
          onChange={this.onSyslogChange.bind(this)} />
        {this.renderForm()}
      </section>
    );
  }
}
