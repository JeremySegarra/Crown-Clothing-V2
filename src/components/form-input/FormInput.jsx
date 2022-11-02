import { FromInputLabel, Input, Group } from "./FormInput.Styles.jsx";

const FormInput = ({ label, ...otherProps }) => {
  //Here we can pass just the number if it is greater than 0 it will be truthy thus envoking the shrink styles
  return (
    <Group>
      <Input {...otherProps} />

      {label && (
        <FromInputLabel shrink={otherProps.value.length}>
          {label}
        </FromInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
