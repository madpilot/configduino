import 'regenerator-runtime/runtime';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
//import sinonAsPromised from 'sinon-as-promised';
import assertJsx, { options } from 'preact-jsx-chai';
import { h, render } from 'preact';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

// when checking VDOM assertions, don't compare functions, just nodes and attributes:
options.functions = false;

// activate the JSX assertion extension:
chai.use(assertJsx);
chai.use(sinonChai);

delete global.expect;
global.NODE_ENV = 'test';
global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
global.h = h;
global.render = render;
global.sleep = ms => new Promise( resolve => setTimeout(resolve, ms) );
global.fetch = (() => { return new Promise((resolve, reject) => {}); });

// Setup JSDOM
const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;;

for(var key in global.window) {
  if(!global.window.hasOwnProperty(key)) continue;
  if(key in global) continue;

  global[key] = global.windown[key];
}

let dom = null;
global.renderHTML = ((component) => {
  if(dom === null) {
    global.document.body.innerHTML = '';
    render(component, global.document.body);
    dom = global.document.body;
  }
  return dom;
});

beforeEach(() => {
  dom = null;
});
