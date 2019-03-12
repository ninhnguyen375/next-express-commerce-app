import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField, Select, MenuItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '90%'
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    textAlign: 'center'
  }
});
export class StepOne extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.onNext();
  };
  render() {
    return (
      <form
        style={{
          width: '80%',
          margin: 'auto'
        }}
        onSubmit={this.handleSubmit}
      >
        <TextField required style={{ width: '100%' }} label="Your Address" />
        <br />
        <br />
        <TextField
          required
          inputProps={{ pattern: '0[0-9]{9}' }}
          style={{ width: '100%' }}
          label="Your Phone number"
        />
        <div style={{ textAlign: 'right', padding: '20px 0' }}>
          <Button
            disabled={this.props.activeStep === 0}
            onClick={this.props.onBack}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {this.props.activeStep === getSteps().length - 1
              ? 'Finish'
              : 'Next'}
          </Button>
        </div>
      </form>
    );
  }
}
export class StepTwo extends React.Component {
  state = {
    paymentMethod: ''
  };
  handleChange = e => {
    this.setState({ paymentMethod: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.paymentMethod) this.props.onNext();
  };
  render() {
    return (
      <form
        style={{
          width: '50%',
          margin: 'auto'
        }}
        onSubmit={this.handleSubmit}
      >
        Select payment method
        <Select
          required
          style={{ marginLeft: 10 }}
          onChange={this.handleChange}
          value={this.state.paymentMethod}
        >
          <MenuItem value="Pay on Delivery">Pay on Delivery</MenuItem>
          <MenuItem value="Credit Card">Credit Card</MenuItem>
        </Select>
        {this.state.paymentMethod === 'Credit Card' && (
          <>
            <TextField required style={{ width: '100%' }} label="Full name" />
            <br />
            <br />
            <TextField
              required
              value="4539745478038591"
              inputProps={{
                pattern:
                  '^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12})$'
              }}
              style={{ width: '100%' }}
              label="Card number"
            />
            <br />
            <br />
            Expiration
            <br />
            <TextField
              required
              inputProps={{ type: 'number', min: 1, max: 12 }}
              style={{ width: '30%' }}
              label="MM"
            />
            <TextField
              inputProps={{ type: 'number' }}
              required
              style={{ width: '30%' }}
              label="YY"
            />
            <TextField
              required
              inputProps={{ type: 'number' }}
              style={{ width: '30%', float: 'right' }}
              label="CVV"
            />
          </>
        )}
        <div style={{ textAlign: 'right', padding: '20px 0' }}>
          <Button
            disabled={this.props.activeStep === 0}
            onClick={this.props.onBack}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {this.props.activeStep === getSteps().length - 1
              ? 'Finish'
              : 'Next'}
          </Button>
        </div>
      </form>
    );
  }
}
function getSteps() {
  return ['Comfirm address and phone number', 'Choose payment method'];
}

class Payment extends React.Component {
  state = {
    activeStep: 0,
    paymentMethod: ''
  };
  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return (
          <StepOne
            activeStep={this.state.activeStep}
            onBack={this.handleBack}
            onNext={this.handleNext}
          />
        );
      case 1:
        return (
          <StepTwo
            activeStep={this.state.activeStep}
            onBack={this.handleBack}
            onNext={this.handleNext}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root} style={{ margin: 'auto' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div style={{ textAlign: 'center' }}>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button style={{ margin: 30 }} onClick={this.handleReset}>
                Reset
              </Button>
              <Button
                style={{ margin: 30 }}
                variant="contained"
                color="primary"
                onClick={this.props.onCheckOut}
              >
                Let Go
              </Button>
            </div>
          ) : (
            <div>{this.getStepContent(activeStep)}</div>
          )}
        </div>
      </div>
    );
  }
}

Payment.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Payment);
