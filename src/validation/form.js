import { h, Component } from 'preact';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.components = [];
  }

  getChildContext() {
    return {
      validation: {
        register: ((component) => {
          if(this.components.indexOf(component) == -1) {
            this.components.push(component);
          }
        }),

        unregister: ((component) => {
          this.components = this.components.filter((c) => { return c != component });
        }),

        valid: (() => {
          return this.components.reduce((acc, component) => { return acc && component.valid() }, true);  
        })
      }
    }
  }

  render() {
    return (
      <form {...this.props}>
        {this.props.children}
      </form>
    );
  }
}
