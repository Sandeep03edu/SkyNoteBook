import AddNote from "./AddNote";
import Notes from "./Notes";

export const Home = (props) => {

  return (
    <div>
      <AddNote showAlert = {props.showAlert}/>
      <Notes showAlert = {props.showAlert}></Notes>
    </div>
  );
};
