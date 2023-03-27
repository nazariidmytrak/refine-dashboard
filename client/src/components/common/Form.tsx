import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({
  type,
  register,
  onFinishHandler,
  formLoading,
  handleSubmit,
  propertyImage,
  handleImageChange,
}: FormProps) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color='#11142d'>
        {type} a Property
      </Typography>
      <Box mt={2.5} padding='20px' bgcolor='#fcfcfc' borderRadius='15px'>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px',
            width: '100%',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                margin: '10px 0',
                fontSize: 16,
                fontWeight: 500,
                color: '#11142d',
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              id='outlined-basic'
              variant='outlined'
              color='info'
              label='Title'
              fullWidth
              required
              {...register('title', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                margin: '10px 0',
                fontSize: 16,
                fontWeight: 500,
                color: '#11142d',
              }}
            >
              Enter description
            </FormHelperText>
            <TextareaAutosize
              placeholder='Write description'
              color='info'
              minRows={5}
              required
              style={{
                width: '100%',
                padding: 10,
                fontSize: 16,
                borderColor: 'rgba(0,0,0,0.23)',
                borderRadius: 6,
                background: 'transparent',
                color: '#515050',
              }}
              {...register('description', { required: true })}
            />
          </FormControl>

          <Stack direction={{ md: 'row' }} gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  margin: '10px 0',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#11142d',
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue='apartment'
                {...register('propertyType', { required: true })}
              >
                <MenuItem value='apartment'>Apartment</MenuItem>
                <MenuItem value='villa'>Villa</MenuItem>
                <MenuItem value='farmhouse'>Farmhouse</MenuItem>
                <MenuItem value='condos'>Condos</MenuItem>
                <MenuItem value='townhouse'>Townhouse</MenuItem>
                <MenuItem value='duplex'>Duplex</MenuItem>
                <MenuItem value='studio'>Studio</MenuItem>
                <MenuItem value='chalet'>Chalet</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  margin: '10px 0',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#11142d',
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                id='outlined-basic'
                variant='outlined'
                color='info'
                type='number'
                label='Price'
                fullWidth
                required
                {...register('price', { required: true })}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText
              sx={{
                margin: '10px 0',
                fontSize: 16,
                fontWeight: 500,
                color: '#11142d',
              }}
            >
              Enter location
            </FormHelperText>
            <TextField
              id='outlined-basic'
              variant='outlined'
              color='info'
              label='Location'
              fullWidth
              required
              {...register('location', { required: true })}
            />
          </FormControl>

          <Stack direction='column' justifyContent='center' mb={2} gap={1}>
            <Stack direction='row' gap={2}>
              <Typography
                my='10px'
                fontSize={16}
                fontWeight={500}
                color='#11142d'
              >
                Property Photo
              </Typography>
              <Button
                component='label'
                sx={{
                  width: 'fit-content',
                  fontSize: 16,
                  color: '#2ed480',
                  textTransform: 'capitalize',
                }}
              >
                Upload *
                <input
                  hidden
                  accept='image/*'
                  type='file'
                  onChange={(e) => {
                    // @ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color='#808191'
              sx={{ wordBreak: 'break-all' }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type='submit'
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor='#475be8'
            color='#fcfcfc'
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
