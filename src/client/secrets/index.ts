export type Secret = {
  id: string;
  _id: string;
  workspace: string;
  environment: string;
  version: number;
  type: string;
  secretKey: string;
  secretValue: string;
  secretComment: string;
  secretReminderNote: string;
  secretReminderRepeatDays: number;
  skipMultilineEncoding: boolean;
  metadata: any;
  createdAt: string;
  updatedAt: string;
  secretPath: string;
  tags: {
    id: string;
    slug: string;
    color: string;
    name: string;
  }[];
}
export type Import = {
  secretPath: string;
  environment: string;
  folderId: string;
  secrets: Exclude<Secret, "tags">[];  
}

export type StandardSecretQueryFilters = {
  workspaceId?: string;
  workspaceSlug?: string;
  environment?: string;
  secretPath?: string;
  expandSecretRefrences?: boolean;
  include_imports?: boolean;
}