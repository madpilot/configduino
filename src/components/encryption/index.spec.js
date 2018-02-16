import Encryption from './index.js';

describe("<Encryption>", () => {
  describe("#render", () => {
    let value, onChange;

    let renderEl = (() => {
      return renderHTML(<Encryption value={value} onChange={onChange} />);
    });
    
    describe("options", () => {
      describe("None", () => {
        it("value is 7", () => {
          expect(renderEl().querySelector("option[value='7']").textContent).to.eq("None");
        });
      });

      describe("WEP", () => {
        it("value is 1", () => {
          expect(renderEl().querySelector("option[value='1']").textContent).to.eq("WEP");
        });
      });
      
      describe("WPA Personal", () => {
        it("value is 2", () => {
          expect(renderEl().querySelector("option[value='2']").textContent).to.eq("WPA Personal");
        });
      });
      
      describe("WPA2 Personal", () => {
        it("value is 4", () => {
          expect(renderEl().querySelector("option[value='4']").textContent).to.eq("WPA2 Personal");
        });
      });

      describe("label", () => {
        it("is Security", () => {
          expect(renderEl().querySelector("label").textContent).to.eq("Security");
        });
      });

      describe("value", () => {
        beforeEach(() => { value = "2" });

        it("selected the option that matches value", () => {
          expect(renderEl().querySelector("select").value).to.eq('2');  
        });
      });

      describe("onChange", () => {
        beforeEach(() => { 
          onChange = sinon.spy();
          value = "2";
          
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("change", false, true);
          renderEl().querySelector("select").dispatchEvent(evt);
        });

        it("is triggered with the selected value", () => {
          expect(onChange).to.have.been.calledWith('2');
        });
      });
    });
  });
});
