 import Form from './form.js';
 
 describe("<Form>", () => { 
  describe("getChildContext", () => {
    let component;

    describe("register", () => {
      let form, subject, component;

      beforeEach(() => {
        form = new Form();
        subject = form.getChildContext().validation.register;
        subject(component);
      });

      it("Adds the component to the list", () => {
        expect(form.components.indexOf(component)).to.equal(0)
      });

      it("Only add the compoment once ", () => {
        subject(component);
        expect(form.components.length).to.equal(1);
      });

      describe("unregister", () => {
        it("removes the component from the list", () => {
          form.getChildContext().validation.unregister(component);
          expect(form.components.length).to.equal(0);
        });
      });
    });

    describe("valid", () => {
      let components;

      let valid = {
        valid: () => { return true }
      }

      let invalid = {
        valid: () => { return false }
      }

      describe("no components", () => {
        beforeEach(() => { components = [] });

        it("returns true", () => {
          let form = new Form();
          form.components = components;
          expect(form.getChildContext().validation.valid()).to.equal(true);
        });
      });

      describe("all valid components", () => {
        beforeEach(() => { components = [ valid, valid ] });
        
        it("returns true", () => {
          let form = new Form();
          form.components = components;
          expect(form.getChildContext().validation.valid()).to.equal(true);
        });
      });

      describe("one invalid component", () => {
        beforeEach(() => { components = [ valid, invalid, valid ] });
        
        it("returns false", () => {
          let form = new Form();
          form.components = components;
          expect(form.getChildContext().validation.valid()).to.equal(false);
        });
      });
    });
  });
  
  describe("#render", () => {
    let renderForm = (() => {
      return renderHTML(<Form><button>Click me</button></Form>);
    });
    
    it("renders a form", () => {
      expect(renderForm().querySelector("form")).to.not.be.null;
    });

    it("renders children", () => {
      expect(renderForm().querySelector("button")).to.not.be.null;
    });
  });
});
