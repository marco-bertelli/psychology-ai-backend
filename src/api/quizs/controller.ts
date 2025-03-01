import { generateActions } from '../../services/generators';
import { QuizsDocument } from './interfaces';
import { Quizs } from './model';

const actions = generateActions<QuizsDocument>(Quizs)

export { actions };
