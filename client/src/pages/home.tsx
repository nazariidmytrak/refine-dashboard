import { Typography, Box, Stack } from '@mui/material';
import { useList } from '@refinedev/core';

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from 'components';

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    pagination: {
      pageSize: 4,
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='11142d'>
        Dashboard
      </Typography>

      <Box display='flex' flexWrap='wrap' mt='20px' gap={4}>
        <PieChart
          title='Properties for Sale'
          value={684}
          series={[75, 25]}
          colors={['#475BE8', '#E4E8EF']}
        />
        <PieChart
          title='Properties for Rent'
          value={550}
          series={[60, 40]}
          colors={['#FD8539', '#E4E8EF']}
        />
        <PieChart
          title='Total Customers'
          value={5684}
          series={[75, 25]}
          colors={['#2ED480', '#E4E8EF']}
        />
        <PieChart
          title='Properties for Cities'
          value={555}
          series={[90, 10]}
          colors={['#FE6D8E', '#E4E8EF']}
        />
      </Box>

      <Stack
        mt='25px'
        width='100%'
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Box
        display='flex'
        flexDirection='column'
        minWidth='100%'
        flex={1}
        mt='25px'
        padding='20px'
        bgcolor='#fcfcfc'
        borderRadius='15px'
      >
        <Typography fontSize={18} fontWeight={600} color='#11142d'>
          Latest Properties
        </Typography>
        <Box mt={2.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {latestProperties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              title={property.title}
              location={property.location}
              price={property.price}
              photo={property.photo}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
