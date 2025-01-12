import { ChatMessageDocument } from './interfaces';
import { generateActions } from '../../services/generators';
import { ChatMessages } from './model';

const actions = generateActions<ChatMessageDocument>(ChatMessages)

export { actions };
