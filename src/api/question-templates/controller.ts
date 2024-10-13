import { QuestionTemplateDocument } from './interfaces';
import { QuestionTemplates } from './model';
import { generateActions } from '../../services/generators';

import * as _ from 'lodash';

const actions = generateActions<QuestionTemplateDocument>(QuestionTemplates, ['personality'])

export { actions };
