const styles = theme => ({
  header: { color: 'gray', textAlign: 'center' },
  paper: {
    width: '80%',
    margin: 'auto',
    padding: '10px 0',
    [theme.breakpoints.down('sm')]: {
      padding: 10,
      width: '100%'
    }
  },
  margin30: { margin: '30px' },
  textGrayCenter: { color: 'gray', textAlign: 'center' },
  textError: { color: 'red' },
  image: {
    [theme.breakpoints.down('sm')]: {
      width: '20px'
    },
    width: '70px'
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      '& *': { padding: '0 !important' }
    }
  },
  inputAmount: {
    [theme.breakpoints.down('sm')]: { width: '30px !important' }
  }
});
export default styles;
