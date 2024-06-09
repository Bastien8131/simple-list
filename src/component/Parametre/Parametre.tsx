import "./Parametre.scss";
import {Form, FormRow, FormSection, TextField} from "@buildo/bento-design-system";
import {useState} from "react";

export default function Parametre() {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");


  return (
    <Form
      title="Personal information"
      description="Type here your personal information"
      submitButton={{
        label: "Submit",
        onPress: () => window.alert("Submit!"),
      }}
    >
      <FormSection>
        <FormRow>
          <TextField
            name="name"
            placeholder="Type here..."
            label="Name"
            value={name}
            onChange={setName}
          />
          <TextField
            name="surname"
            placeholder="Type here..."
            label="Surname"
            value={surname}
            onChange={setSurname}
          />
        </FormRow>
      </FormSection>
    </Form>
  )
}