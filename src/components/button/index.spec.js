import Button from './index.js'
import { Component } from 'preact';

describe("<Button>", () => {
  describe("#render", () => {
    let disabled;
    let className;
    let context;
    
    beforeEach(() => {
      disabled = undefined;
      className = undefined;
      context = undefined;
    })

    let renderButton = (() => {
      return renderHTML(<Button className={className} disabled={disabled}>Test</Button>);
    });

    let button = (() => {
      return renderButton().querySelector("button");
    });

    let container = (() => {
      return renderButton().querySelector("div");
    });

    describe("container", () => {
      it("is rendered", () => {
        expect(container()).to.not.eq(null);
      });
      
      it("has container className", () => {
        expect(container().className).to.eq("container");
      });
    });

    describe("button", () => {
      it("contains a button", () => {
        expect(button()).to.not.eq(null);
      })

      it("outputs children", () => {
        expect(button().textContent).to.eq("Test");
      });
    });
      

    describe("disabled", () => {
      describe("set to false", () => {
        beforeEach(() => { disabled = false });

        it("doesn't render disabled", () => {
          expect(button().getAttribute('disabled')).to.eq(null);
        });
      });

      describe("set to true", () => {
        beforeEach(() => { disabled = true });

        it("renders disabled", () => {
          expect(button().getAttribute('disabled')).to.not.eq(null);
        });
      });

      describe("with context", () => {
        let valid;

        class Mock {
          getChildContext() {
            return {
              validation: {
                valid: () => { return this.props.valid }
              }
            }
          }

          render() {
            return <div>{this.props.children}</div>
          }
        }

        let mocked = (() => {
          return renderHTML(<Mock valid={valid}><Button className={className} disabled={disabled}>Test</Button></Mock>).querySelector('button');
        });

        describe("where valid() is true", () => {
          beforeEach(() => { valid = true });

          it("doesn't render disabled", () => {
            expect(mocked().getAttribute('disabled')).to.eq(null);
          });
        });

        describe("where valid() is false", () => {
          beforeEach(() => { valid = false });

          it("renders disabled", () => {
            expect(mocked().getAttribute('disabled')).to.not.eq(null);
          });
        });
      });
    });

    describe("supplied className", () => {
      beforeEach(() => { className = 'supplied' });

      it("has the supplied classname", () => {
        expect(container().className.split(" ")).to.include("supplied");
      });

      it("has the original classname", () => {
        expect(container().className.split(" ")).to.include("container");
      });
    })
  });
});
