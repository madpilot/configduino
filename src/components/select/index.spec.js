import Select from './index.js';

describe("<Select>", () => {
  describe("#render", () => {
    let value, label, props;

    beforeEach(() =>{
      value = undefined;
      label = undefined;
      props = {};
    });

    let renderEl = (() => {
      return renderHTML(<Select label={label} value={value} {...props}><option value="1">One</option><option value="2">Two</option><option value="3">Three</option></Select>);
    });

    describe("select", () => {
      it("className is select", () => {
        expect(renderEl().querySelector("select").className).to.eq("select");
      });
        
      it("id is set", () => {
        expect(renderEl().querySelector("select").getAttribute('id')).to.match(/input_.{5}/);
      });

      describe("props", () => {
        beforeEach(() => { props = { title: 'Test' } });
        it("are passed though", () => {
           expect(renderEl().querySelector("select").getAttribute('title')).to.eq('Test');
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
          expect(renderEl().querySelector("label").getAttribute('for')).to.eq(renderEl().querySelector("select").getAttribute('id'));
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

    describe("value", () => {
      describe("is set", () => {
        beforeEach(() => { value = '2' });

        it("should select the supplied value", () => {
          expect(renderEl().querySelector("select").value).to.eq('2');
        });
      });
    });
  });
});
