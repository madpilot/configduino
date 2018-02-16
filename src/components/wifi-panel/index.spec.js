import WifiPanel from './index.js';
import { Component } from 'preact';

describe("<WifiPanel>", () => {
  let scan, ssid, encryption, passkey, onUpdate;

  beforeEach(() =>{
    scan = undefined;
    ssid = undefined;
    encryption = undefined;
    passkey = undefined;
    onUpdate = undefined;
  });

  let _obj = null;
  let obj = (() => {
    if(_obj == null) {
      _obj = new WifiPanel({
        scan: scan,
        ssid: ssid,
        encryption: encryption,
        passkey: passkey,
        onUpdate: onUpdate
      });
    }
    return _obj;
  });

  beforeEach(() => { _obj = null });

  let renderEl = (() => {
    return renderHTML(
      <WifiPanel
        scan={scan} 
        ssid={ssid}
        encryption={encryption}
        passkey={passkey}
        onUpdate={onUpdate}
        />
    );
  });
  
  describe("#render", () => {
    describe("section", () => {
      describe("className", () => {
        it("is panel", () => {
          expect(renderEl().querySelector("section").className).to.eq("panel");
        });
      });
    });

    describe("h3", () => {
      describe("className", () => {
        it("is heading", () => {
          expect(renderEl().querySelector("h3").className).to.eq("heading");
        });
      });

      describe("Text", () => {
        it("is WiFi Settings", () => {
          expect(renderEl().querySelector("h3").textContent).to.eq("WiFi Settings");
        });
      });
    });

    describe("SSID", () => {
      beforeEach(() => {
        ssid = "MyIntenet";
        encryption = "7";
        passkey = "password";
        scan = true;
      });

      it("passes the ssid", () => {
        expect(obj().renderSSID().attributes.ssid).to.eq("MyIntenet");
      });
      
      it("passes the encryption", () => {
        expect(obj().renderSSID().attributes.encryption).to.eq("7");
      });

      it("passes the passkey", () => {
        expect(obj().renderSSID().attributes.passkey).to.eq("password");
      });
      
      it("passes the scan", () => {
        expect(obj().renderSSID().attributes.scan).to.eq(true);
      });

      it("sets onModeChange to toggleScan");
      it("sets onChange to updateAP");
    });

    describe("Encryption", () => {
      describe("scan mode", () => {
        beforeEach(() => { scan = true; encryption = "4" });
        
        it("is not rendered", () => {
          expect(obj().renderEncryption()).to.eq(''); 
        });
      });

      describe("manual mode", () => {
        beforeEach(() => { scan = false; encryption = "4" });
        
        it("is rendered", () => {
          expect(obj().renderEncryption()).to.not.eq('');
        });

        it("passes the encryption value", () => {
          expect(obj().renderEncryption().attributes.value).to.eq("4");
        });

        it("passes the change encryption function");
      });
    });

    describe("Passkey", () => {
      beforeEach(() => { passkey = "abc123" });

      describe("encryption mode is 7", () => {
        beforeEach(() => { encryption = "7" });
        
        it("is not rendered", () => {
          expect(obj().renderPasskey()).to.eq(''); 
        });
      });

      describe("encryption mode is not 7", () => {
        beforeEach(() => { encryption = "4" });
        
        it("is rendered", () => {
          expect(obj().renderPasskey()).to.not.eq('');
        });

        it("sets label to Password", () => {
          expect(obj().renderPasskey().attributes.label).to.eq("Password");
        });
        
        it("sets type to password", () => {
          expect(obj().renderPasskey().attributes.type).to.eq("password");
        });

        it("passes the value", () => {
          expect(obj().renderPasskey().attributes.value).to.eq("abc123");
        });

        it("sets autocomplete to off", () => {
          expect(obj().renderPasskey().attributes.autocomplete).to.eq("off");
        });

        it("sets autocapitalize to off", () => {
          expect(obj().renderPasskey().attributes.autocapitalize).to.eq("off");
        });

        it("passes in onInput");
        it("sets the validators");
      });
    });

    describe("updateAP", () => {
      let state;
      let setStateSpy;

      beforeEach(() => {
        ssid = "MyIntenet";
        encryption = "7";
        passkey = "password";
        scan = true;
      });

      beforeEach(() => { 
        state = { scan: false }; 
        onUpdate = sinon.spy();
      });

      afterEach(() => { setStateSpy.restore() });

      it("calls setState with the supplied state", () => {
        setStateSpy = sinon.spy(obj(), 'setState');
        obj().updateAP(state);
        expect(setStateSpy).to.be.calledWith(state);
      });

      describe("encryption not set", () => {
        beforeEach(() => { encryption = "7" });

        it("calls onUpdate", () => {
          obj().updateAP(state);
          expect(onUpdate).to.be.calledWith({
            scan: false,
            ssid: ssid,
            encryption: "7",
            passkey: "" 
          });
        });
      });

      describe("encryption set", () => {
        beforeEach(() => { encryption = "4" });
        
        it("calls onUpdate", () => {
          obj().updateAP(state);
          expect(onUpdate).to.be.calledWith({
            scan: false,
            ssid: ssid,
            encryption: "4",
            passkey: passkey 
          });
        });
      });
    });

    describe("changePasskey", () => {
      let stub;
      beforeEach(() => { 
        stub = sinon.stub(obj(), 'updateAP') 
      });
      afterEach(() => { stub.restore() });

      it("calls updateAP", () => {
        obj().changePasskey({ target: { value: "abc123" } });
        expect(stub).to.have.been.calledWith({ passkey: "abc123" });
      });

    });

    describe("changeEncryption", () => {
      let stub;
      beforeEach(() => { 
        stub = sinon.stub(obj(), 'updateAP') 
      });
      afterEach(() => { stub.restore() });

      it("calls updateAP", () => {
        obj().changeEncryption("7");
        expect(stub).to.have.been.calledWith({ encryption: "7" });
      });

    });

    describe("toggleScan", () => {
      let stub;
      beforeEach(() => { 
        stub = sinon.stub(obj(), 'updateAP') 
      });
      afterEach(() => { stub.restore() });

      it("calls updateAP", () => {
        obj().toggleScan(true);
        expect(stub).to.have.been.calledWith({ scan: true });
      });
    });
  });
});
