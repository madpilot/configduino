import Tab from './index.js';

describe("<Tab>", () => {
  describe("#render", () => {
    let current, name;
    
    beforeEach(() => {
      current = undefined;
      name = undefined;
    });
    
    let renderTab = (() => {
      return renderHTML(<Tab name={name} current={current}><h1>Test</h1></Tab>);
    });

    describe("name", () => {
      beforeEach(() => { name = "name" });

      describe("matches current prop", () => {
        beforeEach(() => { current = "name" });
        it("Renders the tab", () => {
          expect(renderTab().querySelector("div")).to.not.eq(null);
        });
     
       describe("className", () => {
          it("is set to container", () => {
            expect(renderTab().querySelector("div").className).to.eq("container");
          });
        });

        describe("children", () => {
          it("are rendered", () => {
            expect(renderTab().querySelector("h1")).to.not.eq(null);
          });
        });
     });

      describe("does not match current prop", () => {
        beforeEach(() => { current = "notname" });
        
        it("Render nothing", () => {
          expect(renderTab().querySelector("div")).to.eq(null);
        });
      });
    });
  })
});
