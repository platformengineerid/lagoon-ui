import React from 'react';

import { faker } from '@faker-js/faker';

import { ProblemIdentifier } from '../../../.storybook/mocks/mocks';
import Problems from './index';

export default {
  component: Problems,
  title: 'Components/Problems',
  tags: ['autodocs'],
};

const problemData = Array.from({
  length: faker.number.int({
    min: 1,
    max: 10,
  }),
}).map(() => {
  return ProblemIdentifier();
})[0].problems;

export const Default = () => <Problems problems={problemData} />;

export const NoProblems = () => <Problems problems={[]} />;
