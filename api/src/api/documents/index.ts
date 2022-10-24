import GraphBuilder from 'core/graphbuilder';

import Types from './types';
import Queries from './queries';
import Mutations from './mutations';

const Graph = new GraphBuilder();

// Set types
Graph.typeDefs(Types);

// Set queries
Graph.query(Queries);

// Setting up mutations
Graph.mutation(Mutations);

// Subscriptions
//Graph.subscription(Subscriptions);

export default Graph;
