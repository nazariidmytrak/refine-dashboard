import { useOne } from '@refinedev/core';
import { useParams } from 'react-router-dom';

import { Profile } from 'components';

const AgentProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  const agentProfile = data?.data ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <Profile
      type='Agent'
      name={agentProfile.name}
      email={agentProfile.email}
      avatar={agentProfile.avatar}
      properties={agentProfile.allProperties}
    />
  );
};
export default AgentProfile;
