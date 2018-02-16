import SyslogPanel from './index.js';

describe("<SyslogPanel>", () => {
  describe("#render", () => {
    let syslog, syslogHost, syslogPort, syslogLevel, onUpdate;

    beforeEach(() => {
      syslog = false;
      syslogHost = "";
      syslogPort = "";
      syslogLevel = "",
      onUpdate = sinon.stub();
    });

    let renderEl = (() => {
      return renderHTML(<SyslogPanel syslog={syslog} syslogHost={syslogHost} syslogPort={syslogPort} syslogLevel={syslogLevel} onUpdate={onUpdate} />);
    });

    describe("section", () => {
      it("has a className of panel", () => {
        expect(renderEl().querySelector("section").className).to.eq("panel");
      });
    });

    describe("h3", () => {
      it("has a className of heading", () => {
        expect(renderEl().querySelector("h3").className).to.eq("heading");
      });

      it("text is Syslog settings", () => {
        expect(renderEl().querySelector("h3").textContent).to.eq("Syslog settings");
      });
    });

    describe("BinaryInput", () => {
      describe("syslog is true", () => {
        beforeEach(() => { syslog = true });

        it("is checked", () => {
          expect(renderEl().querySelector("input[type='checkbox']").checked).to.eq(true);
        });
      })

      describe("syslog is false", () => {
        beforeEach(() => { syslog = false });

        it("is checked", () => {
          expect(renderEl().querySelector("input[type='checkbox']").checked).to.eq(false);
        });
      });

      describe("onChange", () => {
        [ "true", "false" ].forEach((bool) => {
          describe("checked is " + bool, () => {
            beforeEach(() => { 
              syslog = (bool == "true" ? false : true);
              
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("change", false, true);

              let el = renderEl();
              let input = el.querySelector("input[type='checkbox']");
              input.checked = !syslog;
              input.dispatchEvent(evt);
            });
         
            it("triggers the component onUpdate event", () => {
              expect(onUpdate).to.have.been.calledWith(sinon.match({ syslog: !syslog }))
            });
          });
        });
      });
    });

    describe('renderform', () => {
      describe('syslog is false', () => {
        beforeEach(() => { syslog = false });
        it("does not render", () => {
          expect(renderEl().querySelector("div.form")).to.eq(null);
        });
      });

      describe("syslog is true", () => {
        beforeEach(() => { syslog = true, syslogHost = '10.0.0.1', syslogPort = '123', syslogLevel = '4' });
        it("renders", () => {
          expect(renderEl().querySelector("div.form")).to.not.eq(null);
        });

        describe("syslogHost", () => {
          it("renders", () => {
            expect(renderEl().querySelector("input[name='syslogHost']")).to.not.eq(null);
          });

          it("value is set", () => {
            expect(renderEl().querySelector("input[name='syslogHost']").value).to.eq(syslogHost);
          });

          it("onInput triggers update", () => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("input", false, true);

            let input = renderEl().querySelector("input[name='syslogHost']");
            input.value = "172.16.1.2";
            input.dispatchEvent(evt);
            expect(onUpdate).to.have.been.calledWith(sinon.match({ syslogHost: "172.16.1.2" }))
          });
        });

        describe("syslogPort", () => {
          it("renders", () => {
            expect(renderEl().querySelector("input[name='syslogPort']")).to.not.eq(null);
          });

          it("value is set", () => {
            expect(renderEl().querySelector("input[name='syslogPort']").value).to.eq(syslogPort);
          });

          it("onInput triggers update", () => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("input", false, true);

            let input = renderEl().querySelector("input[name='syslogPort']");
            input.value = "514";
            input.dispatchEvent(evt);
            expect(onUpdate).to.have.been.calledWith(sinon.match({ syslogPort: "514" }))
          });
        });

        describe("syslogLevel", () => {
          it("renders", () => {
            expect(renderEl().querySelector("select[name='syslogLevel']")).to.not.eq(null);
          });

          it("value is set", () => {
            expect(renderEl().querySelector("select[name='syslogLevel']").value).to.eq(syslogLevel);
          });

          it("onChange triggers update", () => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);

            let input = renderEl().querySelector("select[name='syslogLevel']");
            input.value = "5";
            input.dispatchEvent(evt);
            expect(onUpdate).to.have.been.calledWith(sinon.match({ syslogLevel: "5" }))
          });
        });
      });
    });
  });
});

