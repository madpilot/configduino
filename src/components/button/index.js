import { PRIMARY, PRIMARY_HIGHLIGHT, LIGHTEST, NEUTRAL } from '../../styles/colors.js';
import { h, Component } from 'preact';
import { ThemeProvider } from 'styled-components';
import { Wrapper as StyledButtonWrapper, Button as StyledButton } from './styles.js';

class Button extends Component {
  render() {
    let disabled = !!this.props.disabled;
    if(this.context.validation) {
      disabled = !this.context.validation.valid();
    }

    return (
      <ThemeProvider theme={this.props.theme}>
        <StyledButtonWrapper>
          <StyledButton disabled={disabled}>{this.props.children}</StyledButton>
        </StyledButtonWrapper>
      </ThemeProvider>
    );
  }
}

Button.defaultProps = {
  theme: {
    color: LIGHTEST,
    backgroundColor: PRIMARY,
    disabledColor: LIGHTEST,
    disabledBackgroundColor: NEUTRAL,
    hoverColor: LIGHTEST,
    hoverBackgroundColor: PRIMARY_HIGHLIGHT
  }
}

export default Button;
