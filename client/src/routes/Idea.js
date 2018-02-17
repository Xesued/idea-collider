import React from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import { Tabs, Tab } from "material-ui/Tabs";
import SubHeader from "material-ui/Subheader";
import HardwareVideogameAsset from "material-ui/svg-icons/hardware/videogame-asset";
import Paper from "material-ui/Paper";

import Slider from "material-ui/Slider";
import Checkbox from "material-ui/Checkbox";

import {
  yellow500,
  green500,
  red500,
  blue500
} from "material-ui/styles/colors";

const CONFIDANCE_MULTIPLIER = {
  10: 0.1,
  500: 0.4,
  1000: 0.8
};

const CONFIDANCE_STEPS = [
  {
    category: "Highlevel plans",
    value: 5,
    steps: [
      "Engineering & UX feel like it is feasible",
      "Draft business modal/plan suggest good business-viability"
    ]
  },
  {
    category: "Anecdotal evidence",
    value: 20,
    steps: [
      "2-3 data points support the idea",
      "Top request from sales",
      "Spoken to 1-3 customers who seem interested",
      "One competitor has it implemented"
    ]
  },
  {
    category: "Market Data",
    value: 100,
    steps: [
      "Surveys you conducted or commissioned clearly shows user/customer support for the idea",
      "Smoke tests (for example a “fake door” ad campaign) get strong positive results (for example high ad CTR).",
      "Multiple/all competitors have it."
    ]
  },
  {
    category: "User/Customer evidence",
    value: 500,
    steps: [
      "Significant amount of product data across multiple months show support for this idea",
      "A customer support/success report surfaces this as a top request by multiple customers",
      "You’ve interviewed 20+ potential users/customers and 70%+ of them say they would use this and/or be willing to pay for it.",
      "You ran a usability study with 10+ users and 80%+ of them understood the idea, were able to use it, and said they would use it.",
      "You ran a successful small scale concierge MVP study with 1–5 users."
    ]
  },
  {
    category: "Test results",
    value: 2000,
    steps: [
      "You launched 2–4 week longitudinal study and 70%+ of participants kept using the product and were interested to buy or continue using at the end of the test.",
      "You’ve built an MVP and had 50+ active users/customers that at willing to use/purchase and are interested.",
      "You launched an alpha or beta version to 20+ early tester customers.",
      "You’ve ran an A/B test and the experiment group shows the key metrics you outlined, and no decline in other key metrics. All results are statistically significant with p-value of 5% of below."
    ]
  }
];

class IdeaCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confidanceLevel: 1,
      effort: 1,
      impact: 3,
      selectedSteps: {}
    };
  }

  handleStepSelection(step, value, isSelected) {
    if (isSelected) {
      this.setState(
        () => ({
          selectedSteps: {
            ...this.state.selectedSteps,
            [step]: value
          }
        }),
        this.updateConfidanceModifier
      );
    } else {
      const copy = { ...this.state.selectedSteps };
      delete copy[step];

      this.setState(
        () => ({
          selectedSteps: copy
        }),
        this.updateConfidanceModifier
      );
    }
  }

  updateConfidanceModifier() {
    const score = this.getConfedanceScore();
    if (score < 100) {
      this.setState(() => ({ confidanceLevel: 0.1 }));
    } else if (score < 500) {
      this.setState(() => ({ confidanceLevel: 0.4 }));
    } else if (score < 2000) {
      this.setState(() => ({ confidanceLevel: 0.8 }));
    } else {
      this.setState(() => ({ confidanceLevel: 1 }));
    }
  }

  getScore() {
    const { confidanceLevel, effort, impact } = this.state;
    return impact / effort * confidanceLevel;
  }

  getConfedanceScore() {
    const selectedStepKeys = Object.keys(this.state.selectedSteps);
    return selectedStepKeys.reduce(
      (sum, selectedStep) => sum + this.state.selectedSteps[selectedStep],
      0
    );
  }

  renderConfidanceLevel() {
    const score = this.getConfedanceScore();

    let text = "High Confidence";
    const paperStyle = {
      margin: 15,
      padding: 15,
      textAlign: "center",
      backgroundColor: green500
    };

    if (score < 100) {
      text = "Low confidence";
      paperStyle.backgroundColor = red500;
    } else if (score < 500) {
      text = "Medium-Low Confidence";
      paperStyle.backgroundColor = yellow500;
    } else if (score < 2000) {
      text = "Medium-High Confidence";
      paperStyle.backgroundColor = blue500;
    }

    return <Paper style={paperStyle}>{text}</Paper>;
  }

  handleEffortSlider = (event, value) => {
    console.log("new effor:", value);
    this.setState(() => ({ effort: value }));
  };

  handleImpactSlider = (event, value) => {
    console.log("new impact:", value);
    this.setState(() => ({ impact: value }));
  };

  render() {
    return (
      <Card>
        <CardHeader
          title="Add the ability to make stuff happen when it shouldn't happen"
          avatar={<HardwareVideogameAsset />}
        />
        <Paper
          style={{
            margin: 15,
            padding: 15,
            textAlign: "center",
            backgroundColor: yellow500
          }}
        >
          Priority Score <br />
          {this.getScore()}
        </Paper>
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis
          pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate
          interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <Tabs>
          <Tab label="Confidance">
            {this.renderConfidanceLevel()}
            <List>
              {CONFIDANCE_STEPS.map(confidanceLevel => (
                <div>
                  <SubHeader>
                    {confidanceLevel.category} ({confidanceLevel.value} points
                    each)
                  </SubHeader>
                  {confidanceLevel.steps.map(step => (
                    <ListItem
                      primaryText={step}
                      leftCheckbox={
                        <Checkbox
                          onCheck={(e, isInputChecked) =>
                            this.handleStepSelection(
                              step,
                              confidanceLevel.value,
                              isInputChecked
                            )
                          }
                        />
                      }
                    />
                  ))}
                </div>
              ))}
            </List>
          </Tab>
          <Tab label="Effort/Impact">
            <div>
              <h2>Estimated Effort</h2>
              <Slider
                min={1}
                max={5}
                step={1}
                onChange={this.handleEffortSlider}
                value={this.state.effort}
              />

              <h2>Estimated Impact</h2>
              <Slider
                min={1}
                max={5}
                step={1}
                onChange={this.handleImpactSlider}
                value={this.state.impact}
              />
            </div>
          </Tab>
        </Tabs>
      </Card>
    );
  }
}

export default IdeaCard;
