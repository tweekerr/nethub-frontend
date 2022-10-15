import {Box, styled, ToggleButtonGroup} from "@mui/material";

export const FilledDiv = styled('div')<{
  padding?: string,
  background?: string,
  width?: string,
  borderRadius?: string,
  color?: string
}>`
  padding: ${({padding}) => padding ?? '20px'};
  background: ${({background}) => background ?? '#F3EEFF'};
  width: ${({width}) => width};
  border-radius: ${({borderRadius}) => borderRadius ?? '12px'};
  color: ${({color}) => color};
`

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '13px',
    border: 0,
    backgroundColor: '#F3EEFF',
    '&:not(:first-of-type)': {
      padding: '10px 40px',
      borderRadius: '12px',
      fontWeight: 700,
      color: '#242D35',
      textTransform: 'capitalize'
    },
    '&:first-of-type': {
      padding: '10px 40px',
      borderRadius: '12px',
      fontWeight: 700,
      color: '#242D35',
      marginLeft: 0,
      textTransform: 'capitalize'
    },
    '&.Mui-selected': {
      backgroundColor: '#896DC8',
      border: 0,
      color: 'white',
      fontWeight: 700,
      pointerEvents: 'none'
    },
    '&:hover': {
      backgroundColor: '#896DC8'
    }
  },
});
