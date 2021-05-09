// import { config, CloudWatchLogs, SharedIniFileCredentials } from 'aws-sdk';
// export const listTableNames = async ({
//   profile,
//   region
// }: {
//   profile?: string;
//   region?: string;
// }): Promise<string[]> => {
//   if (profile) {
//     config.credentials = new SharedIniFileCredentials({ profile });
//   }
//   const cw = new CloudWatchLogs({ region });
//   try {
//     const { TableNames = [] } = await cw.describeLogGroups({logGroupNamePrefix}).promise();
//     return TableNames;
//   } catch {
//     return [];
//   }
// };
