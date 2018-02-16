import BinaryInput from './index.js';

describe("<BinaryInput>", () => {
  describe("#render", () => {
    let label, props;
    
    beforeEach(() => {
      label = undefined;
      props = {};
    });

    let renderInput = (() => {
      return renderHTML(<BinaryInput label={label} {...props} />);
    });

    let labelEl = (() => {
      return renderInput().querySelector("label");
    });

    let inputEl = (() => {
      return renderInput().querySelector("input");
    });

    describe("id", () => {
      it("is randomly set", () => {
        expect(inputEl().getAttribute("id")).to.match(/input_.{5}/)
      });

      it("sets the for value for the label", () => {
        expect(inputEl().getAttribute("id")).to.eq(labelEl().getAttribute("for"));
      });
    });

    describe("label", () => {
      describe("not set", () => {
        it("is blank", () => {
          expect(labelEl().textContent).to.eq("");
        });
      });

      describe("set", () => {
        beforeEach(() => { label = "Test" });
        
        it("is set to the prop", () => {
          expect(labelEl().textContent).to.eq("Test");
        });
      });
    });

    describe("className", () => {
      describe("label", () => {
        it("is set to label", () => {
          expect(labelEl().className).to.eq("label");
        });
      });
      
      describe("input", () => {
        it("is set to input", () => {
          expect(inputEl().className).to.eq("input");
        });
      });
    });

    describe("props", () => {
      beforeEach(() => { props = { title: "test" } });

      it("passes the props through", () => {
        expect(inputEl().getAttribute('title')).to.eq("test");
      });

      it("doesn't pass the label", () => {
        expect(inputEl().getAttribute('label')).to.eq(null);
      });
    });
  });
});
