import MQTTPanel from './index.js';
import { AUTH_MODE_NONE, AUTH_MODE_USERNAME, AUTH_MODE_CERTIFICATE } from './index.js';

describe("<MQTTPanel>", () => {
  describe("#render", () => {
    let mqttAuthMode, mqttServerName, mqttPort, mqttTLS, mqttUsername, mqttPassword, mqttFingerprint, mqttPublishChannel, mqttSubscribeChannel, onUpdate;

    let renderEl = (() => {
      return renderHTML(<MQTTPanel mqttAuthMode={mqttAuthMode} mqttServerName={mqttServerName} mqttPort={mqttPort} mqttTLS={mqttTLS} mqttUsername={mqttUsername} mqttPassword={mqttPassword} mqttFingerprint={mqttFingerprint} mqttPublishChannel={mqttPublishChannel} mqttSubscribeChannel={mqttSubscribeChannel} onUpdate={onUpdate} />);
    });

    beforeEach(() => {
      mqttAuthMode = AUTH_MODE_NONE;
      mqttServerName = undefined;
      mqttPort = undefined;
      mqttTLS = false;
      mqttUsername = undefined;
      mqttPassword = undefined;
      mqttFingerprint = undefined;
      mqttPublishChannel = undefined;
      mqttSubscribeChannel = undefined;

      onUpdate = sinon.stub();
    });

    describe("#construct", () => {
      let obj = () => {
        return new MQTTPanel({
          mqttAuthMode,
          mqttServerName,
          mqttPort,
          mqttTLS,
          mqttUsername,
          mqttPassword,
          mqttFingerprint,
          mqttPublishChannel,
          mqttSubscribeChannel,
          onUpdate
        });
      };

      describe("empty port", () => {
        beforeEach(() => { mqttPort = "" });

        describe("mqttTLS is true", () => {
          beforeEach(() => { mqttTLS = true });

          it("updates the port to be 8883", () => {
            obj();
            expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "8883" }));
          });
        });

        describe("mqttTLS is false", () => {
          beforeEach(() => { mqttTLS = false });

          it("updates the port to be 1883", () => {
            obj();
            expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "1883" }));
          });
        });
      });

      describe("non-empty port", () => {
        beforeEach(() => { mqttPort = "1234" });

        it("should not update the port", () => {
          obj();
          expect(onUpdate).to.not.have.been.calledWith(sinon.match({ mqttPort: "1883" }));
        });
      });

      describe("SSL state", () => {
        describe("not certificate authentication", () => {
          beforeEach(() => { mqttAuthMode = AUTH_MODE_NONE });

          describe("mqttTLS is true", () => {
            beforeEach(() => { mqttTLS = true });

            it("sets ssl to true", () => {
              expect(obj().state.ssl).to.eq(true);
            });

            it("sets sslDisabled to false", () => {
              expect(obj().state.sslDisabled).to.eq(false);
            });

            it("sets portDefault to 8883", () => {
              expect(obj().state.portDefault).to.eq("8883");
            });
          });

          describe("mqttTLS is false", () => {
            beforeEach(() => { mqttTLS = false });

            it("sets ssl to false", () => {
              expect(obj().state.ssl).to.eq(false);
            });

            it("sets sslDisabled to false", () => {
              expect(obj().state.sslDisabled).to.eq(false);
            });

            it("sets portDefault to 1883", () => {
              expect(obj().state.portDefault).to.eq("1883");
            });
          });
        });

        describe("certificate authentication", () => {
          beforeEach(() => { mqttAuthMode = AUTH_MODE_CERTIFICATE });

          describe("mqttTLS is true", () => {
            beforeEach(() => { mqttTLS = true });

            it("sets ssl to true", () => {
              expect(obj().state.ssl).to.eq(true);
            });

            it("sets sslDisabled to true", () => {
              expect(obj().state.sslDisabled).to.eq(true);
            });

            it("sets portDefault to 8883", () => {
              expect(obj().state.portDefault).to.eq("8883");
            });
          });

          describe("mqttTLS is false", () => {
            beforeEach(() => { mqttTLS = false });

            it("sets ssl to true", () => {
              expect(obj().state.ssl).to.eq(true);
            });

            it("sets sslDisabled to true", () => {
              expect(obj().state.sslDisabled).to.eq(true);
            });

            it("sets portDefault to 8883", () => {
              expect(obj().state.portDefault).to.eq("8883");
            });
          });
        });
      });
    });

    describe("#componentWillReceiveProps", () => {
      let instance;
      let obj = () => {
        return new MQTTPanel({
          mqttAuthMode: "",
          mqttServerName: "",
          mqttPort: "",
          mqttTLS: "",
          mqttUsername: "",
          mqttPassword: "",
          mqttFingerprint: "",
          mqttPublishChannel: "",
          mqttSubscribeChannel: "",
          onUpdate: sinon.stub()
        });
      };

      beforeEach(() => { instance = obj() });

      let call = () => {
        instance.componentWillReceiveProps({
          mqttAuthMode,
          mqttServerName,
          mqttPort,
          mqttTLS,
          mqttUsername,
          mqttPassword,
          mqttFingerprint,
          mqttPublishChannel,
          mqttSubscribeChannel,
          onUpdate
        });
      }

      describe("SSL state", () => {
        describe("not certificate authentication", () => {
          beforeEach(() => { mqttAuthMode = AUTH_MODE_NONE });

          describe("mqttTLS is true", () => {
            beforeEach(() => { mqttTLS = true });

            it("sets ssl to true", () => {
              call();
              expect(instance.state.ssl).to.eq(true);
            });

            it("sets sslDisabled to false", () => {
              call();
              expect(instance.state.sslDisabled).to.eq(false);
            });

            it("sets portDefault to 8883", () => {
              call();
              expect(instance.state.portDefault).to.eq("8883");
            });
          });

          describe("mqttTLS is false", () => {
            beforeEach(() => { mqttTLS = false });

            it("sets ssl to false", () => {
              call();
              expect(instance.state.ssl).to.eq(false);
            });

            it("sets sslDisabled to false", () => {
              call();
              expect(instance.state.sslDisabled).to.eq(false);
            });

            it("sets portDefault to 1883", () => {
              call();
              expect(instance.state.portDefault).to.eq("1883");
            });
          });
        });

        describe("certificate authentication", () => {
          beforeEach(() => { mqttAuthMode = AUTH_MODE_CERTIFICATE });

          describe("mqttTLS is true", () => {
            beforeEach(() => { mqttTLS = true });

            it("sets ssl to true", () => {
              call();
              expect(instance.state.ssl).to.eq(true);
            });

            it("sets sslDisabled to true", () => {
              call();
              expect(instance.state.sslDisabled).to.eq(true);
            });

            it("sets portDefault to 8883", () => {
              call();
              expect(instance.state.portDefault).to.eq("8883");
            });
          });

          describe("mqttTLS is false", () => {
            beforeEach(() => { mqttTLS = false });

            it("sets ssl to true", () => {
              call();
              expect(instance.state.ssl).to.eq(true);
            });

            it("sets sslDisabled to true", () => {
              call();
              expect(instance.state.sslDisabled).to.eq(true);
            });

            it("sets portDefault to 8883", () => {
              call();
              expect(instance.state.portDefault).to.eq("8883");
            });
          });
        });
      });
    });

    describe("#render", () => {
      describe("mqttServerName", () => {
        beforeEach(() => { mqttServerName = "mqtt.local" });
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttServerName']")).to.not.eq(null);
        });

        it("value is set", () => {
          expect(renderEl().querySelector("input[name='mqttServerName']").value).to.eq(mqttServerName);
        });

        it("onInput triggers update", () => {
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);

          let input = renderEl().querySelector("input[name='mqttServerName']");
          input.value = "mqtt.com";
          input.dispatchEvent(evt);
          expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttServerName: "mqtt.com" }))
        });
      });

      describe("mqttPort", () => {
        describe("Empty", () => {
          beforeEach(() => { mqttPort = "" });

          describe("TLS is true", () => {
            beforeEach(() => { mqttTLS = true });

            it("sets the placeholder to 8883", () => {
              expect(renderEl().querySelector("input[name='mqttPort']").getAttribute('placeholder')).to.eq('8883');
            });
          });

          describe("TLS is false", () => {
            beforeEach(() => { mqttTLS = false });

            it("sets the placeholder to 1883", () => {
              expect(renderEl().querySelector("input[name='mqttPort']").getAttribute('placeholder')).to.eq('1883');
            });
          });

          describe("TLS changed", () => {
            beforeEach(() => { mqttTLS = false });

            let trigger = (() => {
              let evt = document.createEvent("HTMLEvents");
              evt.initEvent("change", false, true);

              let input = renderEl().querySelector("input[name='mqttTLS']");
              input.checked = true;
              input.dispatchEvent(evt);
            });
 
            it("changes value", () => {
              trigger();
              expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "8883" }))
            });

            it("displays and emtpy value", (done) => {
              trigger();
              
              setTimeout(function() {
                expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("");
                done();
              }, 0);
            });
          });
        });

        describe("Set", () => {
          beforeEach(() => { mqttPort = "1883" });

          let changePort = ((value) => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("input", false, true);

            let input = renderEl().querySelector("input[name='mqttPort']");
            input.value = value;
            input.dispatchEvent(evt);
          });
           
          let changeTLS = ((checked) => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);

            let input = renderEl().querySelector("input[name='mqttTLS']");
            input.checked = checked;
            input.dispatchEvent(evt);
          });
        
          it("renders", () => {
            expect(renderEl().querySelector("input[name='mqttPort']")).to.not.eq(null);
          });

          it("value is set", () => {
            expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq(mqttPort);
          });

          it("onInput triggers update", () => {
            changePort("8883");
            expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "8883" }))
          });

          describe("TLS changed", () => {
            beforeEach(() => { mqttTLS = false, mqttPort = "1234" });


            it("does not change value", () => {
              expect(onUpdate).to.have.not.been.calledWith(sinon.match({ mqttPort: "8883" }))
            });

            it("does not update value", () => {
              changeTLS(true);
              expect(onUpdate).to.have.not.been.calledWith(sinon.match({ mqttPort: "1234" }))
            });

            it("displays the same value", (done) => {
              changeTLS(true);
              
              setTimeout(function() {
                expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("1234");
                done();
              }, 0);
            });
          });

          describe("becomes empty", () => {
            describe("TLS false", () => {
              beforeEach(() => { mqttTLS = false });

              it("sets the port to 1883", () => {
                changePort("");
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "1883" }))
              });

              it("sets the port input value to empty", () => {
                changePort("");
                expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("");
              });
            });

            describe("TLS true", () => {
              beforeEach(() => { mqttTLS = true });

              it("sets the port to 8883", () => {
                changePort("");
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "8883" }))
              });

              it("sets the port input value to empty", () => {
                changePort("");
                expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("");
              });
            });
          });
        });
      });

      describe("mqttTLS", () => {
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttTLS']")).to.not.eq(null);
        });
        
        describe("true", () => {
          beforeEach(() => { mqttTLS = false });

          it("value is set", () => {
            expect(renderEl().querySelector("input[name='mqttTLS']").checked).to.eq(mqttTLS);
          });
        });

        describe("onChange", () => {
          let checked;

          let trigger = (() => {
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);

            let input = renderEl().querySelector("input[name='mqttTLS']");
            input.checked = checked;
            input.dispatchEvent(evt);
          });
 
          describe("empty port", () => {
            beforeEach(() => { mqttPort = "" });

            describe("becomes checked", () => {
              beforeEach(() => { mqttTLS = false; checked = true });

              it("set mqttTLS to true", () => {
                trigger();
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttTLS: true }))
              });
              
              describe("port", () => {
                it("is set to 8883", () => {
                  trigger();
                  expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "8883" }))
                });

                it("is empty", () => {
                  trigger();
                  expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("");
                });

                it("shows the placeholder", (done) => {
                  trigger();
                  setTimeout(function() {
                    expect(renderEl().querySelector("input[name='mqttPort']").getAttribute("placeholder")).to.eq("8883");
                    done();
                  }, 0);
                });
              });
            });

            describe("becomes unchecked", () => {
              beforeEach(() => { mqttTLS = true; checked = false });

              it("set mqttTLS to false", () => {
                trigger();
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttTLS: false }))
              });

              describe("port", () => {
                it("is set to 1883", () => {
                  trigger();
                  expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: "1883" }))
                });

                it("is empty", () => {
                  trigger();
                  expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("");
                });

                it("shows the placeholder", (done) => {
                  trigger();
                  setTimeout(function() {
                    expect(renderEl().querySelector("input[name='mqttPort']").getAttribute("placeholder")).to.eq("1883");
                    done();
                  }, 0);
                });
              });
            });
          });

          describe("non-empty port", () => {
            beforeEach(() => { mqttPort = "1234" });

            describe("becomes checked", () => {
              beforeEach(() => { mqttTLS = false; checked = true });

              it("set mqttTLS to true", () => {
                trigger();
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttTLS: true }))
              });
              
              describe("port", () => {
                it("is not set", () => {
                  trigger();
                  expect(onUpdate).to.have.not.been.calledWith(sinon.match({ mqttPort: "1234" }))
                });

                it("is not empty", () => {
                  trigger();
                  expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("1234");
                });

                it("does not change the placeholder", (done) => {
                  trigger();
                  setTimeout(function() {
                    expect(renderEl().querySelector("input[name='mqttPort']").getAttribute("placeholder")).to.eq("8883");
                    done();
                  }, 0);
                });
              });
            });

            describe("becomes unchecked", () => {
              beforeEach(() => { mqttTLS = true; checked = false });

              it("set mqttTLS to true", () => {
                trigger();
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttTLS: false }))
              });
              
              describe("port", () => {
                it("is not set", () => {
                  trigger();
                  expect(onUpdate).to.have.not.been.calledWith(sinon.match({ mqttPort: "1234" }))
                });

                it("is not empty", () => {
                  trigger();
                  expect(renderEl().querySelector("input[name='mqttPort']").value).to.eq("1234");
                });

                it("does not change the placeholder", (done) => {
                  trigger();
                  setTimeout(function() {
                    expect(renderEl().querySelector("input[name='mqttPort']").getAttribute("placeholder")).to.eq("1883");
                    done();
                  }, 0);
                });
              });
            });
          });
        });
      });

      describe("mqttPublishChannel", () => {
        beforeEach(() => { mqttPublishChannel = "mqtt/publish" });
        
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttPublishChannel']")).to.not.eq(null);
        });

        it("value is set", () => {
          expect(renderEl().querySelector("input[name='mqttPublishChannel']").value).to.eq(mqttPublishChannel);
        });

        it("onInput triggers update", () => {
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);

          let input = renderEl().querySelector("input[name='mqttPublishChannel']");
          input.value = "mqtt/publishChannel";
          input.dispatchEvent(evt);
          expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPublishChannel: "mqtt/publishChannel" }))
        });
      });

      describe("mqttSubscribeChannel", () => {
        beforeEach(() => { mqttSubscribeChannel = "mqtt/subscribe" });
        it("renders", () => {
          expect(renderEl().querySelector("input[name='mqttSubscribeChannel']")).to.not.eq(null);
        });

        it("value is set", () => {
          expect(renderEl().querySelector("input[name='mqttSubscribeChannel']").value).to.eq(mqttSubscribeChannel);
        });

        it("onInput triggers update", () => {
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("input", false, true);

          let input = renderEl().querySelector("input[name='mqttSubscribeChannel']");
          input.value = "mqtt/subscribeChannel";
          input.dispatchEvent(evt);
          expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttSubscribeChannel: "mqtt/subscribeChannel" }))
        });
      });
    });

    describe("mqttAuthMode", () => {
      let setAuthMode = ((mode) => {
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);

        let inputs = renderEl().querySelectorAll("input[name='mqttAuthMode']");
        let input = [].slice.call(inputs).filter((el) => el.value == mode)[0];
        input.dispatchEvent(evt);
      });
      
      describe("AUTH_MODE_NONE", () => {
        beforeEach(() => { mqttAuthMode = AUTH_MODE_NONE; });

        it("should not render Username", () => {
          expect(renderEl().querySelector("input[name='mqttUsername']")).to.eq(null);
        });
        
        it("should not render Password", () => {
          expect(renderEl().querySelector("input[name='mqttPassword']")).to.eq(null);
        });

        it("should not render the certificate uploader", () => {
          expect(renderEl().querySelector("input[name='mqttCertificateFile']")).to.eq(null);
        });

        it("should not render the key uploader", () => {
          expect(renderEl().querySelector("input[name='mqttKeyFile']")).to.eq(null);
        });

        describe("onChange", () => {
          it("sets auth mode to AUTH_MODE_NONE", () => {
            setAuthMode(AUTH_MODE_NONE);
            expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttAuthMode: AUTH_MODE_NONE }))
          });
          
          it("enables the mqttTLS checkbox", () => {
            setAuthMode(AUTH_MODE_NONE);
            expect(renderEl().querySelector("input[name='mqttTLS']").disabled).to.eq(false);
          });

          describe("mqttPort set", () => {
            beforeEach(() => { mqttPort = '1234' });
            
            it("does not send the port in the update", () => {
              setAuthMode(AUTH_MODE_NONE);
              expect(onUpdate).to.have.not.been.calledWith(sinon.match({ mqttPort: '1234' }))
            });
          });

          describe("mqttPort not set", () => {
            describe("mqttTLS true", () => {
              beforeEach(() => { mqttTLS = true, mqttPort = "" });

              it("sends 8883 in the update", () => {
                setAuthMode(AUTH_MODE_NONE);
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: '8883' }))
              });
            });

            describe("mqttTLS false", () => {
              beforeEach(() => { mqttTLS = false, mqttPort = "" });

              it("sends 1883 in the update", () => {
                setAuthMode(AUTH_MODE_NONE);
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: '1883' }))
              });
            });
          });
        });
      });

      describe("AUTH_MODE_USERNAME", () => {
        beforeEach(() => { mqttAuthMode = AUTH_MODE_USERNAME; });
        
        it("should render Username", () => {
          expect(renderEl().querySelector("input[name='mqttUsername']")).to.not.eq(null);
        });
        
        it("should render Password", () => {
          expect(renderEl().querySelector("input[name='mqttPassword']")).to.not.eq(null);
        });

        it("should not render the certificate uploader", () => {
          expect(renderEl().querySelector("input[name='mqttCertificateFile']")).to.eq(null);

        });

        it("should not render the key uploader", () => {
          expect(renderEl().querySelector("input[name='mqttKeyFile']")).to.eq(null);
        });

        describe("onChange", () => {
          it("sets auth mode to AUTH_MODE_USERNAME", () => {
            setAuthMode(AUTH_MODE_USERNAME);
            expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttAuthMode: AUTH_MODE_USERNAME }))
          });

          it("enables the mqttTLS checkbox", () => {
            setAuthMode(AUTH_MODE_USERNAME);
            expect(renderEl().querySelector("input[name='mqttTLS']").disabled).to.eq(false);
          });

          describe("mqttPort set", () => {
            beforeEach(() => { mqttPort = '1234' });
            
            it("does not send the port in the update", () => {
              setAuthMode(AUTH_MODE_USERNAME);
              expect(onUpdate).to.have.not.been.calledWith(sinon.match({ mqttPort: '1234' }))
            });
          });
              
          describe("mqttPort not set", () => {
            describe("mqttTLS true", () => {
              beforeEach(() => { mqttTLS = true, mqttPort = "" });

              it("sends 8883 in the update", () => {
                setAuthMode(AUTH_MODE_USERNAME);
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: '8883' }))
              });
            });

            describe("mqttTLS false", () => {
              beforeEach(() => { mqttTLS = false, mqttPort = "" });

              it("sends 1883 in the update", () => {
                setAuthMode(AUTH_MODE_USERNAME);
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: '1883' }))
              });
            });
          });
        });
      });

      describe("AUTH_MODE_CERTIFICATE", () => {
        beforeEach(() => { mqttAuthMode = AUTH_MODE_CERTIFICATE; });
        
        it("should not render Username", () => {
          expect(renderEl().querySelector("input[name='mqttUsername']")).to.eq(null);
        });
        
        it("should not render Password", () => {
          expect(renderEl().querySelector("input[name='mqttPassword']")).to.eq(null);
        });

        it("should render the certificate uploader", () => {
          expect(renderEl().querySelector("input[name='mqttCertificateFile']")).to.not.eq(null);
        });

        it("should render the key uploader", () => {
          expect(renderEl().querySelector("input[name='mqttKeyFile']")).to.not.eq(null);
        });

        describe("onChange", () => {
          it("sets auth mode to AUTH_MODE_CERTIFICATE", () => {
            setAuthMode(AUTH_MODE_CERTIFICATE);
            expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttAuthMode: AUTH_MODE_CERTIFICATE }))
          });

          describe("mqttPort set", () => {
            beforeEach(() => { mqttPort = '1234' });
            
            it("does not send the port in the update", () => {
              setAuthMode(AUTH_MODE_CERTIFICATE);
              expect(onUpdate).to.have.not.been.calledWith(sinon.match({ mqttPort: '1234' }))
            });
          });

          describe("mqttPort not set", () => {
            describe("mqttTLS true", () => {
              beforeEach(() => { mqttTLS = true, mqttPort = "" });

              it("sends 8883 in the update", () => {
                setAuthMode(AUTH_MODE_CERTIFICATE);
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: '8883' }))
              });
            });

            describe("mqttTLS false", () => {
              beforeEach(() => { mqttTLS = false, mqttPort = "" });

              it("sends 8883 in the update", () => {
                setAuthMode(AUTH_MODE_CERTIFICATE);
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttPort: '8883' }))
              });

              it("send mqttTLS as true", () => {
                setAuthMode(AUTH_MODE_CERTIFICATE);
                expect(onUpdate).to.have.been.calledWith(sinon.match({ mqttTLS: true }))
              });

              it("disables the mqttTLS checkbox", () => {
                setAuthMode(AUTH_MODE_CERTIFICATE);
                expect(renderEl().querySelector("input[name='mqttTLS']").disabled).to.eq(true);
              });
            });
          });
        });
      });
    });
  });
});
