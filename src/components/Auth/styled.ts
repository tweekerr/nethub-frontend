import {Accordion, AccordionDetails, AccordionSummary, styled} from '@mui/material';

export const StyledRoot = styled('div')({
  width: '100%'
});

export const StyledFirstStep = styled('div')({
  background: '#F3EEFF',
  width: '100%',
  height: 115,
  borderRadius: 15,
  padding: 20,
});

export const StyledSecondStep = styled('div')({
  background: '#F3EEFF',
  width: '100%',
  borderRadius: 15,
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
});

export const StyledAccordion = styled(Accordion)({
  width: '100%',
  background: '#F3EEFF',
  padding: 20,
  borderRadius: 15,
  border: 'none',
  outline: 'none',
  position: 'initial',
  borderBottomLeftRadius: '15px !important',
  borderBottomRightRadius: '15px !important',
  boxShadow: 'none',
  elevation: 0
});

export const StyledAccordionSummary = styled(AccordionSummary)({
  padding: '0px 0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: 0,
  border: 'none',
  outline: 'none',
  height: "min-content"
});

export const StyledAccordionDetails = styled(AccordionDetails)({
  margin: 0,
  padding: 0
})
