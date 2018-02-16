import FirmwarePanel from './index.js';

describe("<FirmwarePanel>", () => {
  describe("#render", () => {
    let renderEl = (() => {
      return renderHTML(<FirmwarePanel />);
    });

    describe("section", () => {
      it("className is panel", () => {
        expect(renderEl().querySelector("section").className).to.eq("panel");
      });
    });

    describe("h3", () => {
      it("className is header", () => {
        expect(renderEl().querySelector("h3").className).to.eq("heading");
      });

      it("text is Update the firware", () => {
        expect(renderEl().querySelector("h3").textContent).to.eq("Update the firmware");
      });
    });

    describe("input", () => {
      it("is rendered", () => {
        expect(renderEl().querySelector("input[type=file]")).to.not.eq(null);
      });
    });
  });
});
