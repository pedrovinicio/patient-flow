import React, {useState} from "react";
import { Wrapper, Item, RadioButton, RadioButtonLabel } from './Radio.styles';

const Radio = (props) => {
    const [select, setSelect] = useState(null);

    const handleSelectChange = (answer) => {
        setSelect(answer.id);
        props.onChange(answer);
    };

    return (
        <Wrapper>
            {props.answers.map((answer) =>(
                <Item key={answer.id}>
                    <RadioButton
                        type="radio"
                        name="radio"
                        value={answer.id}
                        checked={select === answer.id}
                        onChange={() => handleSelectChange(answer)}
                    />
                    <RadioButtonLabel />
                    <div>{answer.label}</div>
                </Item>
            ))}
      </Wrapper>
    );
};

export default Radio;
