import { styled } from '@mui/material';

export const StyledRoot = styled('div')({
  width: 780,
  margin: '0 auto',
});

export const StyledForm = styled('div')({
  background: '#F3EEFF',
  width: '100%',
  height: 75,
  borderRadius: 15,
  padding: 20,
});

export const StyledButton = styled('button')({
  width: 135,
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const StyledImage = styled('image')({
  height: 25,
  width: 25,
  marginRight: 10
})