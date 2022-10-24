import AdminResolvers from './admin.resolvers';
import AdminStoResolvers from './admin.stos.resolvers';

const resolvers = [AdminResolvers, AdminStoResolvers] as const;

export default resolvers;
