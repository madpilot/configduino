import ValidatedInput from './index.js';
import { Component } from 'preact';

describe("<ValidatedInput>", () => {
  describe("constructor", () => {
    let value;

    beforeEach(() => { value = "" });

    describe("value empty", () => {
      beforeEach(() => { value = "" });
      
      describe("changed", () => {
        it("is false", () => {
          let obj = new ValidatedInput({ value });
          expect(obj.state.changed).to.eq(false);
        });
      });

      describe("value", () => {
        it("is empty", () => {
          let obj = new ValidatedInput({ value });
          expect(obj.state.value).to.eq("");
        });
      });
    });

    describe("non-empty value", () => {
      beforeEach(() => { value = "value" });

      describe("changed", () => {
        it("is true", () => {
          let obj = new ValidatedInput({ value });
          expect(obj.state.changed).to.eq(true);
        });

        describe("value", () => {
          it("is the value", () => {
            let obj = new ValidatedInput({ value });
            expect(obj.state.value).to.eq("value");
          });
        });
      });
    });
  });

  describe("componentWillReceiveProps", () => {
    let value;

    beforeEach(() =>{ value = "" });


  });

  describe("#render", () => {
    let value, onValidate, onInput, validators, props;

    beforeEach(() =>{
      value = undefined;
      onInput = undefined;
      onValidate = sinon.spy();
      validators = undefined;
      props = {};
    });

    let renderEl = (() => {
      return renderHTML(
        <ValidatedInput 
          value={value} 
          onValidate={onValidate}
          onInput={onInput}
          validators={validators}
          {...props} 
          />
      );
    });

    describe("changed", () => {
      let obj = (() => { return new ValidatedInput({ value: value, }) });
      
      describe("empty", () => {
        beforeEach(() => { value = ""; });
        it("changed is false", () => {
          expect(obj().state.changed).to.eq(false)
        });
      });

      describe("set", () => {
        beforeEach(() => { value = "bar"; });

        it("changed is true", () => {
          expect(obj().state.changed).to.eq(true)
        });
      });
    });

    describe("context", () => {
      let register = null;
      let unregister = null;
      let delegate = null;

      class Mock extends Component {
        constructor(props) {
          super(props);
          this.state = {
            show: false
          }
          this.props.delegate(this);
        }

        getChildContext() {
          return {
            validation: {
              register: this.props.register,
              unregister: this.props.unregister
            }
          }
        }
       
        toggle(cb) {
          this.setState({ show: !this.state.show }, cb);
        }

        render() {
          if(this.state.show) {
            return <div>{this.props.children}</div>
          } else {
            return null;
          }
        }
      }

      beforeEach(() => { 
        delegate = null;
        register = sinon.spy();
        unregister = sinon.spy();  
      
        let df = function(d) {
          delegate = d;
        }        
        renderHTML(<Mock delegate={df} register={register} unregister={unregister}><ValidatedInput /></Mock>);
      });
        
      describe("mounting", () => {
        it("registers itself as a validator", () => {
          delegate.toggle(() => {
            delegate.toggle(() => {
              expect(register).to.have.been.calledOnce;
            });
          });
        });
      });

      describe("unmounting", () => {
        it("unregisters itself as a validator", () => {
          delegate.toggle(() => {
            delegate.toggle(() => {
              expect(unregister).to.have.been.calledOnce;
            });
          });
        });
      });
    });

    describe("validations", () => {
      let valid, validators;
      let input = null;

      let inputObj = (() => {
        if(input == null) {
          input = new ValidatedInput({ validators: validators });
          input.setState({ valid: valid });
        }
        return input;
      });
      
      let el = (() => {
        return renderHTML(inputObj().render());
      });
      
      beforeEach(() => { 
        input = null, 
        validators = [], 
        valid = true 
      });

      describe("validator", () => {
        describe("with supplied validators", () => {
          beforeEach(() => { 
            let stub = sinon.stub();
            stub.returns({
              valid: true
            });
            validators = [ stub ] 
          });

          it("is initialized with validators", () => {
            expect(inputObj().validator.validators).to.eq(validators);
          });
        });

        describe("with out supplied validators", () => {
          it("is initialized with an empty array", () => {
            // Bad test. It's very touchy feely
            expect(inputObj().validator.validators.length).to.eq(0);
          });
        });
      });

      describe("valid()", () => {
        describe("state.value is true", () => {
          beforeEach(() => { valid = true; });
          it("return true", () => {
            expect(inputObj().valid()).to.eq(true);
          });
        });

        describe("state.value is false", () => {
          beforeEach(() => { valid = false; });
          it("return true", () => {
            expect(inputObj().valid()).to.eq(false);
          });
        });
      });
    });

    describe("update()", () => {
      let input = null, validateSpy = null;

      let inputObj = (() => {
        if(input == null) {
          input = new ValidatedInput({ onInput: onInput });
          validateSpy = sinon.spy(input, 'validate');
        }
        return input;
      });
      afterEach(() => { if(validateSpy) validateSpy.restore() });
      
      let el = (() => {
        return renderHTML(inputObj().render());
      });
      
      beforeEach(() => { 
        input = null
      });
      
      beforeEach(() => { onInput = sinon.spy(); });

      describe("onInput event fired", () => {
        let evt;

        beforeEach(() => {
          inputObj().setState({ changed: false, value: '' });
          
          evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);
          
          el().querySelector('input').value = 'abc';
          el().querySelector("input").dispatchEvent(evt);
        });

        it("should set changed state to true", () => {
          expect(inputObj().state.changed).to.eq(true)
        });

        it("should set value state to the value", () => {
          expect(inputObj().state.value).to.eq('abc')
        });

        describe("onInput", () => {
          it("triggers the supplied onInput function", () => {
            expect(onInput).to.have.been.calledOnce;
          });

          it("passes through the event object to the onInput function", () => {
            expect(onInput).to.have.been.calledWith(evt);
          });
        });
        
        it("should run the validator", () => {
          expect(validateSpy).to.have.been.calledOnce; 
        });
      });
    });
  });
});
