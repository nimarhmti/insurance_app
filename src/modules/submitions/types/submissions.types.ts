type submissionsDataModel = Record<string, unknown> & { id: string };

export interface submissionModel {
  columns: string[];
  data: submissionsDataModel[] | [];
}
