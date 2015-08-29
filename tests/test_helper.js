import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

let { assert, expect } = chai;

chai.should();
chai.use(sinonChai);

export {
  chai,
  sinon,
  sinonChai,
  assert,
  expect
}