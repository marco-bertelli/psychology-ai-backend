import { UserDocument } from "../users/interfaces"

export type CustomRequest = Request & {
    user: UserDocument,
    bodymen: any,
    querymen: any,
    params: Record<string, string>,
    body: Record<string, unknown>,
    headers: Record<string, string>,
}