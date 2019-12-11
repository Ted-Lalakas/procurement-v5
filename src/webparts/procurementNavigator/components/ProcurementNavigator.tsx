import * as React from 'react';
import styles from './ProcurementNavigator.module.scss';
// import { IProcurementNavigatorProps } from './IProcurementNavigatorProps';
// import { escape } from '@microsoft/sp-lodash-subset';
// import { ChoiceGroupBasicExample } from './ChoiceGroup/ChoiceGroup';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { mockArray } from './QuestionData';


// export default class ProcurementNavigator extends React.Component<IProcurementNavigatorProps, {}> {
export default class ProcurementNavigator extends React.Component<any, any, any> {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);

    const firstQuestion = mockArray.filter( n => n.questionId == 1 );

    firstQuestion.map( index => index.endText = "" );

    this.state = {
      tabsDisplay: [ ...firstQuestion ]
    }

  }

  componentDidMount() {
    console.log("-------------------------------------------------------------------------");
    console.log('Did Mount');
    console.dir(this.state.tabsDisplay);
    console.log("-------------------------------------------------------------------------");
  }

  componentDidUpdate() {
    console.log("-------------------------------------------------------------------------");
    console.log('Did Update');
    console.dir(this.state.tabsDisplay);
    console.log("-------------------------------------------------------------------------");
  }

    _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption) {

      console.log("-------------------------------------------------------------------------");

      if ( option.id == option.labelId ) {

        //tabsDisplay
        const existsSelectedTab = this.state.tabsDisplay.findIndex(element => option.labelId === element.questionId);
        const rollBackQuestions = this.state.tabsDisplay.slice(0, existsSelectedTab+1);
        const updatedTabEndText = [...rollBackQuestions];
        const updatedIndex = rollBackQuestions.findIndex( n => n.questionId === option.labelId );

        let endTextValue = "";
        switch(option.key) {
          case "1": 
            endTextValue = updatedTabEndText[updatedIndex].endTextA;
            break;
          case "2": 
            endTextValue = updatedTabEndText[updatedIndex].endTextB;
            break;
          case "3": 
            endTextValue = updatedTabEndText[updatedIndex].endTextC;
            break;
        }

        updatedTabEndText[updatedIndex] = {
          ...updatedTabEndText[updatedIndex],
          endText: endTextValue
        }

        this.setState(
          {
            tabsDisplay: [
              ...updatedTabEndText
            ]
          }
        );

      } else {
        //current tab => option.labelId's show END TEXT == FALSE
        const updatedTabEndText = [...this.state.tabsDisplay];

        updatedTabEndText.map( n => {
          n.endText = "";
        });

        this.setState(
          {
            tabsDisplay: [
              ...updatedTabEndText
            ]
          }
        );

        //Find the index in TabsDisplay array of the labelId (ID of the TAB) CLICKED ON 
        const existsSelectedTab = this.state.tabsDisplay.findIndex(element => option.labelId === element.questionId);
        // console.log("SHOULD SLICE: "+existsSelectedTab);

        const rollBackQuestions = this.state.tabsDisplay.slice(0, existsSelectedTab+1);
        // console.log("Rollback:");
        // console.dir(rollBackQuestions);

        const addQuestion = mockArray.filter( n => n.questionId === option.id );
        this.setState(
          {
            tabsDisplay: [
              ...rollBackQuestions,
              ...addQuestion
            ]
          }
        );
      }
    }

  render(): React.ReactElement {
    return (
      <div className={ styles.procurementNavigator }>
        <div className={ styles.container }>          
          {
            this.state.tabsDisplay.map(a => {
              return (
                <div className={ styles.questionTab } key={a.questionId}>
                  <div className={ styles.row }>  
                  <div className={ styles.column }>
                    <p>{a.title}</p>
                    <p>{a.questionText}</p>
                    <ChoiceGroup
                      options={
                        !a.choiceC ? 
                          [{ key: "1", id: a.choiceA, text: a.choiceTextA, labelId: a.questionId, checked: false },
                          { key: "2", id: a.choiceB, text: a.choiceTextB, labelId: a.questionId, checked: false }]
                          :
                          [{ key: "1", id: a.choiceA, text: a.choiceTextA, labelId: a.questionId, checked: false },
                          { key: "2", id: a.choiceB, text: a.choiceTextB, labelId: a.questionId, checked: false },
                          { key: "3", id: a.choiceC, text: a.choiceTextC, labelId: a.questionId, checked: false }]
                      }
                      onChange={this._onChange}
                      ariaLabelledBy='Procurement Form'
                    />                    
                    <div>{a.endText}</div>                    
                    </div>
                    </div>
                </div>
              )  
            })
          }            
        </div>
      </div>
    );
  }
}
