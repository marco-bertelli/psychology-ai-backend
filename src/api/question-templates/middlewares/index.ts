import { QuestionTemplateDocument } from "../interfaces";
import { QuestionTemplates } from "../model";

export async function calculateDefaultOrder(this: QuestionTemplateDocument, next: Function): Promise<void> {
    if (this.order) {
        return next();
    }

    const lastOrderItem = await QuestionTemplates.findOne({ order: { $exists: true } }, 'order').sort({ order: -1 }).lean();

    this.order = lastOrderItem ? lastOrderItem.order + 1 : 1;

    next();
}