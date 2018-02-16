import NetworkPanel from './index.js';
import { Component } from 'preact';

describe("<NetworkPanel>", () => {
  let dhcp, deviceName, ipAddress, dnsServer, gateway, subnet, onUpdate;

  beforeEach(() =>{
    dhcp = undefined;
    deviceName = undefined;
    ipAddress = undefined;
    dnsServer = undefined;
    gateway = undefined;
    subnet = undefined;
    onUpdate = sinon.stub();
  });

  let _obj = null;
  let obj = (() => {
    if(_obj == null) {
      _obj = new NetworkPanel({
        dhcp: dhcp,
        deviceName: deviceName,
        ipAddress: ipAddress,
        dnsServer: dnsServer,
        gateway: gateway,
        subnet: subnet,
        onUpdate: onUpdate
      });
    }
    return _obj;
  });

  beforeEach(() => { _obj = null });

  let renderEl = (() => {
    return renderHTML(
      <NetworkPanel
        dhcp={dhcp}
        deviceName={deviceName}
        ipAddress={ipAddress}
        dnsServer={dnsServer}
        gateway={gateway}
        subnet={subnet}
        onUpdate={onUpdate}
        />
    );
  });

  describe("onFieldChange", () => {
    it("sets the field state", () => {
      let f = obj().onFieldChange('ipAddress');
      f({ target: { value: '192.168.0.1' } });
      expect(onUpdate).to.have.been.calledWith(sinon.match({ ipAddress: '192.168.0.1' }));
    });
  });

  describe("onDCHPChange", () => {
    describe("dhcp select value is 1", () => {
      it("updates dhcp to true", () => {
        obj().onDHCPChange({ target: { value: '1' } });
        expect(onUpdate).to.have.been.calledWith(sinon.match({ dhcp: true }));
      });
    });

    describe("dhcp select value is 0", () => {
      it("updates dhcp to false", () => {
        obj().onDHCPChange({ target: { value: '0' } });
        expect(onUpdate).to.have.been.calledWith(sinon.match({ dhcp: false }));
      });
    });
  });

  describe("#render", () => {
    describe("section", () => {
      it("className is panel", () => {
        expect(renderEl().querySelector("section").className).to.eq("panel");   
      });
    });

    describe("h3", () => {
      it("className is heading", () => {
        expect(renderEl().querySelector("section > h3.heading")).to.not.eq(null);
      });

      it("has Network Settings as the title", () => {
        expect(renderEl().querySelector("section > h3.heading").textContent).to.eq("Network Settings");
      });
    });

    describe("deviceName", () => {
      beforeEach(() => { deviceName = 'wifiswitch' });
      it("renders", () => {
        expect(renderEl().querySelector("input[name='deviceName']")).to.not.eq(null);
      });

      it("value is set", () => {
        expect(renderEl().querySelector("input[name='deviceName']").value).to.eq(deviceName);
      });

      it("onInput triggers update", () => {
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("input", false, true);

        let input = renderEl().querySelector("input[name='deviceName']");
        input.value = "garage";
        input.dispatchEvent(evt);
        expect(onUpdate).to.have.been.calledWith(sinon.match({ deviceName: "garage" }))
      });
    });

    describe("group", () => {
      it("className is group", () => {
        expect(renderEl().querySelector("section > div.group")).to.not.eq(null);
      });
    });

    describe("Static Panel", () => {
      describe("dhcp is false", () => {
        beforeEach(() => { dhcp = false });

        it("renders static panel", () => {
          expect(renderEl().querySelector("div.static-panel")).to.not.eq(null)
        });
        
        [ 'staticIP', 'staticDNS', 'staticGateway', 'staticSubnet' ].forEach((key) => {
          describe(key, () => {
            it("onInput triggers update", () => {
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("input", false, true);

              let input = renderEl().querySelector("input[name='" + key + "']");
              input.value = "new value";
              input.dispatchEvent(evt);

              let m = {};
              m[key] = "new value";
              expect(onUpdate).to.have.been.calledWith(sinon.match(m))
            });
          });
        });
      });

      describe("dhcp is true", () => {
        beforeEach(() => { dhcp = true });

        it("does not render static panel", () => {
          expect(renderEl().querySelector("div.static-panel")).to.eq(null)
        });
      });
    });
  });
});
 
