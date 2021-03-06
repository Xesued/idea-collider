import React from "react";

import { List, ListItem } from "material-ui/List";
import ActionInfo from "material-ui/svg-icons/action/info";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import FileFolder from "material-ui/svg-icons/file/folder";
import ActionAssignment from "material-ui/svg-icons/action/assignment";
import { blue500, yellow600 } from "material-ui/styles/colors";
import EditorInsertChart from "material-ui/svg-icons/editor/insert-chart";

const ListExampleFolder = ({ match, history, location }) => (
  <div>
    <List>
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        rightIcon={<ActionInfo />}
        primaryText="Add the ability to make stuff happen when it shouldn't happen"
        secondaryText="Jan 9, 2014"
        onClick={() => history.push("/test")}
      />
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        rightIcon={<ActionInfo />}
        primaryText="Recipes"
        secondaryText="Jan 17, 2014"
      />
      <ListItem
        leftAvatar={<Avatar icon={<FileFolder />} />}
        rightIcon={<ActionInfo />}
        primaryText="Work"
        secondaryText="Jan 28, 2014"
      />
    </List>
    <Divider inset={true} />
    <List>
      <Subheader inset={true}>Files</Subheader>
      <ListItem
        leftAvatar={
          <Avatar icon={<ActionAssignment />} backgroundColor={blue500} />
        }
        rightIcon={<ActionInfo />}
        primaryText="Vacation itinerary"
        secondaryText="Jan 20, 2014"
      />
      <ListItem
        leftAvatar={
          <Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />
        }
        rightIcon={<ActionInfo />}
        primaryText="Kitchen remodel"
        secondaryText="Jan 10, 2014"
      />
    </List>
  </div>
);

export default ListExampleFolder;
