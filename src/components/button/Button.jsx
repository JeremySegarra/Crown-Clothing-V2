import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./Button.Styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

//This can also be done simply by using a switch statement may be easier to read
//This Syntax is more difficult to understand but all its saying is we are returning an object with 3 properties,
//and we are choosing the key [buttonType] that matches thatkey in the object to return

// const getButton = (buttonType = "base") =>
//   ({
//     base: BaseButton,
//     google: GoogleSignInButton,
//     inverted: InvertedButton,
//   }[buttonType]);
const getButton = (buttonType) => {
  switch (buttonType) {
    case "google":
      return GoogleSignInButton;
    case "inverted":
      return InvertedButton;
    default:
      return BaseButton;
  }
};

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
