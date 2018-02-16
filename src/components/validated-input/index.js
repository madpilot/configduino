import { h, Component } from 'preact';
import Validator from '../../validation/validator.js';

export default class ValidatedInput extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validator(props.validators || []);

    this.state = this.validate({
      valid: false,
      changed: props.value != "",
      value: props.value
    });
  }

  componentWillReceiveProps(props) {
    if(this.state.value != props.value) {
      this.setStateAndValidate({
        value: props.value
      });
    }
  }

  componentWillMount() {
    if(this.context.validation) {
      this.context.validation.register(this);
    }
  }

  componentWillUnmount() {
    if(this.context.validation) {
      this.context.validation.unregister(this);
    }
  }

  validate(state) {
    return this.validator.validate(state);
  }

  setStateAndValidate(state) {
    state = Object.assign({}, this.state, state);
    state = this.validate(state);
    this.setState(state);

    if(this.props.onValidate) {
      this.props.onValidate({
        changed: state.changed,
        valid: state.valid,
        error: state.error
      })
    }
  }

  valid() {
    return this.state.valid;
  }

  update() {
    var context = this;

    return function(e) {
      context.setStateAndValidate({ value: e.target.value, changed: true });

      if(context.props.onInput) {
        context.props.onInput.apply(this, arguments);
      }
    }
  }

  render() {
    let props = Object.assign({}, this.props);
    delete props['validators'];

    props.onInput = this.update();

    return (
      <input {...props} />
    );
  }
}
