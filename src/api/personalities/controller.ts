import { PersonalityDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { Personality } from './model';

import * as _ from 'lodash';

const actions = generateActions<PersonalityDocument>(Personality)

export { actions };
