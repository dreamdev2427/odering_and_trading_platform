import { useContext } from 'react';
import { StoContext } from 'services/core/auth';

const useActiveSto = () => useContext(StoContext);

export default useActiveSto;
