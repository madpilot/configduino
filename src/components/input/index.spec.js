import Input from './index.js';
import { Component } from 'preact';

describe("<Input>", () => {
  describe("#render", () => {
    let value, label, className, onInvalid, onInput, validators, props;

    beforeEach(() =>{
      value = undefined;
      label = undefined;
      className = undefined;
      onInput = undefined;
      validators = undefined;
      props = {};
    });

    let renderEl = (() => {
      return renderHTML(
        <Input 
          label={label} 
          value={value} 
          className={className}
          onInvalid={onInvalid}
          onInput={onInput}
          validators={validators}
          {...props} 
          />
      );
    });

    describe("div", () => {
      describe("className", () => {
        describe("default", () => {
          it("className is container", () => {
            expect(renderEl().querySelector("div").className).to.eq("container");
          });
        });

        describe("supplied", () => {
          beforeEach(() => { className = "supplied" });
          
          it("className is appended", () => {
            expect(renderEl().querySelector("div").className.split(" ")).to.include("supplied");
          });

          it("container is still in the className", () => {
            expect(renderEl().querySelector("div").className.split(" ")).to.include("container");
          });
        });
      });
    });

    describe("label", () => {
      describe("is set", () => {
        beforeEach(() => { label = "Test" });

        it("is rendered", () => {
          expect(renderEl().querySelector("label")).to.not.eq(null);
        });

        it("for is equal to id", () => {
          expect(renderEl().querySelector("label").getAttribute('for')).to.eq(renderEl().querySelector("input").getAttribute('id'));
        });

        it("className is label", () => {
          expect(renderEl().querySelector("label").className).to.eq("label");
        });
      });

      describe("is not set", () => {
        it("is not rendered", () => {
          expect(renderEl().querySelector("label")).to.eq(null);
        });
      });
    });

    describe("validations", () => {
      let valid, error, changed, validators;
      let input = null;

      let inputObj = (() => {
        if(input == null) {
          input = new Input({ label: label, validators: validators });
          input.setState({ valid: valid, error: error, changed: changed });
        }
        return input;
      });
      
      let el = (() => {
        return renderHTML(inputObj().render());
      });
      
      beforeEach(() => { 
        input = null, 
        validators = [], 
        valid = true, 
        changed = false,
        error = "" 
      });

      describe("error", () => {
        describe("label is set", () => {
          beforeEach(() => { label = "test" });

          describe("valid is true", () => {
            beforeEach(() => { valid = true; });

            describe("changed is false", () => {
              beforeEach(() => { changed = false });

              it("is not rendered", () => {
                expect(el().querySelector("span.error")).to.eq(null);
              });
            });
            
            describe("changed is true", () => {
              beforeEach(() => { changed = true });
              
              it("is not rendered", () => {
                expect(el().querySelector("span.error")).to.eq(null);
              });
            });
          });

          describe("valid is false", () => {
            beforeEach(() => { valid = false; error = "Message", changed = false });

            describe("changed is false", () => {
              beforeEach(() => { changed = false; });
              
              it("is not rendered", () => {
                expect(el().querySelector("span.error")).to.eq(null);
              });
            });
            
            describe("changed is true", () => {
              beforeEach(() => { changed = true; });
              
              it("is rendered", () => {
                expect(el().querySelector("span.error")).to.not.eq(null);
              });

              it("renders the message", () => {
                expect(el().querySelector("span.error").textContent).to.eq("Message");
              });
            });
          });
        });

        describe("label is not set", () => {
          it("is not rendered", () => {
            expect(el().querySelector("span.error")).to.eq(null);
          });
        });
      });
    });
  });
});
