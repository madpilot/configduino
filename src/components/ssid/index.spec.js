import SSID from './index.js';
import { SCANNING, SCANNING_COMPLETE, SCANNING_FAILED } from './index.js';
import { Component } from 'preact';

describe("<SSID>", () => {
  let ssid, encryption, passkey, scan, onModeChange, onChange;

  let _obj = null;
  let obj = function() {
    if(_obj == null) {
      _obj = new SSID({
        ssid,
        encryption,
        passkey,
        scan,
        onModeChange,
        onChange
      });
    }
    return _obj;
  }

  let renderEl = function() {
    return renderHTML(obj().render());
  }

  let aps = [
    {"ssid":"OPTUSVD3C49EE8","rssi":-90,"encryption":"8"},
    {"ssid":"Dean&Carol.b","rssi":-92,"encryption":"7"},
    {"ssid":"NETGEAR19","rssi":-76,"encryption":"4"},
    {"ssid":"MyWifi","rssi":-60,"encryption":"4"},
    {"ssid":"OPTUS_B8EC72","rssi":-89,"encryption":"8"},
    {"ssid":"OPTUS_A49184","rssi":-85,"encryption":"8"}
  ];



  beforeEach(() =>{
    ssid = undefined;
    encryption = undefined;
    passkey = undefined;
    scan = true;
    onModeChange = sinon.stub();
    onChange = sinon.stub();
    _obj = null;
  });

  describe("#scan", () => {
    let json = aps;
    let changeApStub;

    beforeEach(() => {
      changeApStub = sinon.stub(obj(), 'changeAp');
    });

    afterEach(() =>{
      changeApStub.restore();
    });

    beforeEach(() => { scan = true });

    describe("on call", () => {
      beforeEach(() => obj().scan());
      it("sets connection mode to scanning", () => {
        expect(obj().state.connection).to.eq(SCANNING);
      });

      it("sets aps to []", () => {
        expect(obj().state.aps.length).to.eq(0);
      });
    });

    describe("on resolve", () => {
      let fetcher;

      beforeEach(() => {
        fetcher = sinon.stub(window, 'fetch').resolves({ ok: true, json: sinon.stub().resolves(json) });
      });

      afterEach(() =>{
        fetcher.restore();
      });

      it("sets connection mode to scanning complete", (done) => {
        obj().scan();
        setTimeout(() => {
          expect(obj().state.connection).to.eq(SCANNING_COMPLETE);
          done();
        });
      });

      it("sets the ap list", (done) => {
        obj().scan();
        setTimeout(() => {
          expect(obj().state.aps).to.eql(json);
          done();
        });
      });

      describe("ssid state set", () => {
        beforeEach(() => { obj().state.scanned.ssid = 'MyWifi' });

        it("should select the previous selected ap", (done) => {
          obj().scan();
          setTimeout(() => {
            expect(changeApStub).to.have.been.calledWith('MyWifi');
            done();
          });
        });
      });

      describe("ssid state not set", () => {
        beforeEach(() => { obj().state.scanned.ssid = 'nointhere' });

        it("should select the first ap", (done) => {
          obj().scan();
          setTimeout(() => {
            expect(changeApStub).to.have.been.calledWith(json[0].ssid)
            done();
          });
        });
      });
    });
  });

  describe("#render", () => {
    describe("scanning", () => {
      beforeEach(() => { scan = true });

      describe("SCANNING mode", () => {
        beforeEach(() => { obj().setState({ connection: SCANNING }) });

        it("disabled the SSID dropdown", () => {
          expect(renderEl().querySelector("select.select").disabled).to.eq(true);
        });

        it("the SSID dropdown says 'Scanning...", () => {
          expect(renderEl().querySelector("select.select > option").textContent).to.eq("Scanning…");
        });
      });

      describe("SCANNING_COMPLETE mode", () => {
        describe("ap list empty", () => {
          beforeEach(() => {
            obj().setState({ connection: SCANNING_COMPLETE, aps: [] });
          });

          it("disabled the SSID dropdown", () => {
            expect(renderEl().querySelector("select.select-ap").disabled).to.eq(true);
          });

          it("the SSID dropdown says 'No Access Points Found", () => {
            expect(renderEl().querySelector("select.select-ap > option").textContent).to.eq("No Access Points Found");
          });
        });

        describe("ap list not empty", () => {
          beforeEach(() => {
            obj().setState({ connection: SCANNING_COMPLETE, aps: [ {"ssid":"MYAP","rssi":-90,"encryption":"8"} ] });
          });

          it("enables the SSID dropdown", () => {
            expect(renderEl().querySelector("select.select-ap").disabled).to.eq(false);
          });

          it("the SSID dropdown should list the APS", () => {
            expect(renderEl().querySelector("select.select-ap > option").textContent).to.eq("MYAP");
          });
        });
      });

      describe("Unknown connection state", () =>{
        beforeEach(() => {
          obj().setState({ connection: SCANNING_FAILED, aps:[] });
        });

        it("disabled the SSID dropdown", () => {
          expect(renderEl().querySelector("select.select-ap").disabled).to.eq(true);
        });

        it("the SSID dropdown says 'No Access Points Found", () => {
          expect(renderEl().querySelector("select.select-ap > option").textContent).to.eq("No Access Points Found");
        });

      });

      describe("error", () => {
        describe("valid true", () => {
          beforeEach(() => {
            obj().setState({ valid: true });
          });

          it("is not rendered", () => {
            expect(renderEl().querySelector("span.error")).to.eq(null);
          });
        });

        describe("valid false", () => {
          beforeEach(() => {
            obj().setState({ valid: false, error: "not set" });
          });

          it("is not rendered", () => {
            expect(renderEl().querySelector("span.error")).to.eq(null);
          });
        });
      });
    });

    describe('manual', () => {
      beforeEach(() => { scan = false });

      describe("error", () => {
        describe("valid true", () => {
          beforeEach(() => {
            obj().setState({ valid: true });
          });

          it("is not rendered", () => {
            expect(renderEl().querySelector("span.error")).to.eq(null);
          });
        });

        describe("valid false", () => {
          beforeEach(() => {
            obj().setState({ valid: false, error: "not set" });
          });

          it("is rendered", () => {
            expect(renderEl().querySelector("span.error")).to.not.eq(null);
          });

          it("renders the error", () => {
            expect(renderEl().querySelector("span.error").textContent).to.eq("not set");
          });
        });
      });
    });

    describe("setScanMode", () => {
      let e;

      beforeEach(() => {
        e = {
          preventDefault: sinon.spy()
        }
      });

      it("calls props.onModeChange with false", () => {
        obj().setScanMode(e);
        expect(onModeChange).to.have.been.calledWith(true);
      });

      it("calls props.onChange with the manual state", () => {
        let scanned = sinon.stub();
        obj().state.scanned = scanned;
        obj().setScanMode(e);
        expect(onChange).to.have.been.calledWith(scanned)
      });
    });

    describe("setManualMode", () => {
      let e;

      beforeEach(() => {
        e = {
          preventDefault: sinon.spy()
        }
      });

      it("calls props.onModeChange with false", () => {
        obj().setManualMode(e);
        expect(onModeChange).to.have.been.calledWith(false);
      });

      it("calls props.onChange with the manual state", () => {
        let manual = sinon.stub();
        obj().state.manual = manual;
        obj().setManualMode(e);
        expect(onChange).to.have.been.calledWith(manual)
      });
    });

    describe("setScannedState", () => {
      let e, state, spy, merged;

      beforeEach(() => {
        e = {
          preventDefault: sinon.spy()
        }

        state = { ssid: 'new-ssid' }
        merged = Object.assign({}, obj().state.scanned, state);
        spy = sinon.spy(obj(), 'setState');
        obj().setScannedState(state);
      });

      it("merges the scanned state", () => {
        expect(spy).to.have.been.calledWith({ scanned: merged });
      });

      it("sends the updates state to onChange", () => {
        expect(onChange).to.have.been.calledWith(merged)
      });
    });

    describe("setManualState", () => {
      let e, state, spy, merged;

      beforeEach(() => {
        e = {
          preventDefault: sinon.spy()
        }

        state = { ssid: 'new-ssid' }
        merged = Object.assign({}, obj().state.manual, state);
        spy = sinon.spy(obj(), 'setState');
        obj().setManualState(state);
      });

      it("merges the manual state", () => {
        expect(spy).to.have.been.calledWith({ manual: merged });
      });

      it("sends the updates state to onChange", () => {
        expect(onChange).to.have.been.calledWith(merged)
      });
    });

    describe("changeAp", () => {
      it("Sets the scanned AP", () => {
        obj().state.aps = aps;
        let spy = sinon.spy(obj(), "setScannedState");
        obj().changeAp("MyWifi");
        expect(spy).to.have.been.calledWith({ ssid: "MyWifi", encryption: "4" });

      });
    });

    describe("onChangeAp", () => {
      let e;

      beforeEach(() => {
        e = {
          target: {
            value: "TestAp"
          }
        };
      });

      it("changes the AP", () => {
        let spy = sinon.spy(obj(), "changeAp");
        obj().onChangeAp(e);
        expect(spy).to.have.been.calledWith("TestAp");
      });
    });

    describe("changeManualSSID", () => {
      let e;

      beforeEach(() => {
        e = { 
          target: {
            value: "TestAp"
          }
        }
      });

      it("sets the manual state", () => {
        obj().changeManualSSID(e);
        expect(obj().state.manual.ssid).to.eq("TestAp");
      })
    });

    describe('onScan', () => {
      let e;

      beforeEach(() => {
        e = {
          preventDefault: sinon.stub()
        }
      });

      it("prevents default", () => {
        obj().onScan(e);
        expect(e.preventDefault).to.have.beenCalled;
      });

      it("re-scans", () => {
        let spy = sinon.spy(obj(), 'scan');
        obj().onScan(e);
        expect(spy).to.have.beenCalled;
      });
    });

    describe("validate", () => {
      it("proxies validate", () => {
        let state = sinon.stub();
        let spy = sinon.spy(obj(), 'setState');
        obj().validate(state);
        expect(spy).to.have.been.calledWith(state);
      });
    });
  });
});
