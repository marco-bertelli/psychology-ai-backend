import { generateActions } from '../../services/generators';
import { ChatDocument } from './interfaces';
import { Chats } from './model';

const actions = generateActions<ChatDocument>(Chats)

export { actions };
