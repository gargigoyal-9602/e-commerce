import React from "react";
import { withRouter } from "react-router-dom";
// Customizable Area Start

import axios from "axios";
// Customizable Area End
import TestHeaderControllerWeb, {
  Props,
} from "./TestHeaderControllerWeb";
class EmailLoginRegistrationWeb extends TestHeaderControllerWeb {
  // formRef = React.createRef<FormInstance>();

  onGenderChange = (value: string) => {
    
  };


  onReset = () => {
    // this.formRef.current!.resetFields();
    // this.props.history.push(`/dashboard`)
  };

  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }
  render() {
    const { firstName, lastName } = this.state;
    console.log("============== STATE ========", this.state);
    console.log("============== firstName, lastName ========", firstName, lastName);
    return (
      <div>
        Testing ....
        <button onClick={this.onReset}>go</button>
      </div>
    )
  }
}
// @ts-ignore
export default  withRouter(EmailLoginRegistrationWeb)