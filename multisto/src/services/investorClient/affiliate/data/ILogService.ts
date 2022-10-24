export default interface ILogService {
    logActivity(userId: number, description: string, investorId: number, activityType: number, stoId: number): Promise<void>;
}
