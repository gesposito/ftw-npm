import {
  sinon,
  assert,
  expect
} from './test_helper.js';

import filters from '../lib/filters.js';
import mock from '../mocks/doc.js';

describe('Filters', () => {
  it('should fire up', () => {
    expect(true).to.be.true;
  });

  it('should match keyword in doc.name', () => {
    expect(filters.name(mock[0], 'react-native')).to.be.undefined;
    expect(filters.name(mock[1], 'react-native')).to.be.true;
    expect(filters.name(mock[2], 'react-native')).to.be.true;
    expect(filters.name(mock[3], 'react-native')).to.be.undefined;
    expect(filters.name(mock[4], 'react-native')).to.be.true;
    expect(filters.name(mock[5], 'react-native')).to.be.true;
  });

  it('should contain keyword in doc.keywords', () => {
    expect(filters.keyword(mock[0], 'react-native')).to.be.undefined;
    expect(filters.keyword(mock[1], 'react-native')).to.be.true;
    expect(filters.keyword(mock[2], 'react-native')).to.be.true;
    expect(filters.keyword(mock[3], 'react-native')).to.be.true;
    expect(filters.keyword(mock[4], 'react-native')).to.be.true;
    expect(filters.keyword(mock[5], 'react-native')).to.be.true;
  });

  it('should match keyword in doc.dependencies || doc.devDependencies || doc.peerDependencies', () => {
    expect(filters.dep(mock[0], 'react-native')).to.be.true;
    expect(filters.dep(mock[1], 'react-native')).to.be.undefined;
    expect(filters.dep(mock[2], 'react-native')).to.be.undefined;
    expect(filters.dep(mock[3], 'react-native')).to.be.true;
    expect(filters.dep(mock[4], 'react-native')).to.be.true;
    expect(filters.dep(mock[5], 'react-native')).to.be.true;
  });

  it('should contain keyword among doc keys', () => {
    expect(filters.module(mock[0], 'react-native-module')).to.be.undefined;
    expect(filters.module(mock[1], 'react-native-module')).to.be.true;
    expect(filters.module(mock[2], 'react-native-module')).to.be.undefined;
    expect(filters.module(mock[3], 'react-native-module')).to.be.undefined;
    expect(filters.module(mock[4], 'react-native-module')).to.be.undefined;
    expect(filters.module(mock[5], 'react-native-module')).to.be.undefined;
  });

});
