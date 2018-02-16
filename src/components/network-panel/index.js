import { h, Component } from 'preact';
import Input from '../input';
import BinaryInput from '../binary-input';
import * as Validation from '../../validation/validator.js';

const FIELDS = { staticIP: "IP Address", staticDNS: "DNS Server", staticGateway: "Gateway", staticSubnet: "Subnet" };
const TEXT_VALIDATORS = [ Validation.required(), Validation.length(255) ];

import styles from './style.css';

export default class NetworkPanel extends Component {
  onFieldChange(field) {
    return (e) => {
      let s = {}
      s[field] = e.target.value;
      this.props.onUpdate(s);
    }
  }

  onDHCPChange(e) {
    this.props.onUpdate({ dhcp: e.target.value == "1" });
  }

  renderStaticPanel() {
    if(!this.props.dhcp) {
      return (
        <div className={styles['static-panel']}>
          {Object.keys(FIELDS).map((key) => {
            return <Input key={key} name={key} label={FIELDS[key]} type="text" autocomplete="off" autocapitalize="off" value={this.props[key]} onInput={this.onFieldChange(key).bind(this)} validators={TEXT_VALIDATORS} />
          })}
        </div>
      );
    } else {
      return ""
    }
  }

  render() {
    return (
      <section className={styles.panel}>
        <h3 className={styles.heading}>Network Settings</h3>
        <Input label="Device Name" name="deviceName" type="text" placeholder="device" value="" autocomplete="off" autocapitalize="off" value={this.props.deviceName} onInput={this.onFieldChange('deviceName').bind(this)} validators={TEXT_VALIDATORS}  />

				<div className={styles.group}>
          <BinaryInput type="radio" name="dhcp" label="DHCP" value="1" checked={this.props.dhcp} onChange={this.onDHCPChange.bind(this)} />
          <BinaryInput type="radio" name="dhcp" label="Static" value="0" checked={!this.props.dhcp} onChange={this.onDHCPChange.bind(this)} />
				</div>

        {this.renderStaticPanel()}
      </section>
    );
  }
}
