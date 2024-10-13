import { PersonalityDocument } from "../interfaces";
import { QuestionTemplates } from "../../question-templates/model";

export async function checkTemplatesBeforeDelete(this: PersonalityDocument, next: Function): Promise<void> {
    const questionTemplatesCount = await QuestionTemplates.countDocuments({ personality: this._id });

    if (questionTemplatesCount > 0) {
        return next('Cannot delete personality with associated question templates');
    }

    return next();
}