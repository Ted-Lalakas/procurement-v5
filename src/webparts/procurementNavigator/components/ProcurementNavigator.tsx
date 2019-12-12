import * as React from 'react';
import styles from './ProcurementNavigator.module.scss';
// import { IProcurementNavigatorProps } from './IProcurementNavigatorProps';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { mockArray } from './QuestionData';


// export default class ProcurementNavigator extends React.Component<IProcurementNavigatorProps, {}> {
export default class ProcurementNavigator extends React.Component<any, any, any> {
  constructor(props:any) {
    super(props);

    // Get the first element and pass it some extra values
    const firstQuestion = mockArray.filter( n => n.questionId == 1 );
    firstQuestion.endText = "";
    firstQuestion.selectedKey = "";

    // Pass a new Object to state and spread the first question
    this.state = {
      tabsDisplay: [ ...firstQuestion ]
    };

    //Bind "this" to the function so that it can use this.state
    this._onChange = this._onChange.bind(this);
  }

  // For testing purposes. Can be removed.
  public componentDidMount() {
    console.log("-------------------------------------------------------------------------");
    console.log('Did Mount');
    console.dir(this.state);
    console.log("-------------------------------------------------------------------------");
  }

  // For testing purposes. Can be removed.
  public componentDidUpdate() {
    console.log("-------------------------------------------------------------------------");
    console.log('Did Update');
    console.dir(this.state);
    console.log("-------------------------------------------------------------------------");
  }

  private _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption) {
    // When the TAB == OPTION Selected
    // This displays END TEXT and ENDS the question sequence
    if ( option.id == option.labelId ) {
      const existsSelectedTab = this.state.tabsDisplay.findIndex(element => option.labelId === element.questionId);
      const rollBackQuestions = this.state.tabsDisplay.slice(0, existsSelectedTab+1);
      const updatedEntriesWithEndText = [...rollBackQuestions];
      const updatedIndex = rollBackQuestions.findIndex( n => n.questionId === option.labelId );

      // Assign the correct End Text to be shown
      let endTextValue:string = "";
      switch(option.key) {
        case "1": 
          endTextValue = updatedEntriesWithEndText[updatedIndex].endTextA;
          break;
        case "2": 
          endTextValue = updatedEntriesWithEndText[updatedIndex].endTextB;
          break;
        case "3": 
          endTextValue = updatedEntriesWithEndText[updatedIndex].endTextC;
          break;
      }

      // Add the extra values to the present Tab
      updatedEntriesWithEndText[updatedIndex].endText = endTextValue;
      updatedEntriesWithEndText[updatedIndex].selectedKey = option.key;

      // Update the state variable so that the current Tab object contains the correct End Text
      this.setState({
          tabsDisplay: [
            ...updatedEntriesWithEndText
          ]
      });

    } else {
      // Find the index in TabsDisplay array of the labelId (ID of the TAB) CLICKED ON 
      const existsSelectedTab = this.state.tabsDisplay.findIndex(element => option.labelId === element.questionId);
      const rollBackQuestions = this.state.tabsDisplay.slice(0, existsSelectedTab+1);

      // Add the extra variables to the last entry in the array
      rollBackQuestions[rollBackQuestions.length - 1].selectedKey = option.key;
      rollBackQuestions[rollBackQuestions.length - 1].endText = "";

      // This is the next element to appear so I give it "" so it is not selected.
      const addQuestion = mockArray.filter( n => n.questionId === option.id );
      addQuestion[0].selectedKey = null;
      addQuestion[0].endText = "";

      // Update state with the previous entries and the next question
      this.setState({
          tabsDisplay: [
            ...rollBackQuestions,
            ...addQuestion
          ]
      });
    }
  }

  public render(): React.ReactElement {
    return (
      <div className={ styles.procurementNavigator }>
        <div className={ styles.container }>          
          {
            this.state.tabsDisplay.map(a => {
              return (
                <div className={ styles.questionTab } key={a.questionId}>
                  <div className={ styles.row }>  
                  <div className={ styles.column }>
                    <h2>{a.title}</h2>
                    <p>{a.questionText}</p>
                    <ChoiceGroup
                      selectedKey={a.selectedKey !== null ? a.selectedKey : null }
                      options={
                        !a.choiceC ? 
                          [{ key: "1", id: a.choiceA, text: a.choiceTextA, labelId: a.questionId },
                          { key: "2", id: a.choiceB, text: a.choiceTextB, labelId: a.questionId }]
                          :
                          [{ key: "1", id: a.choiceA, text: a.choiceTextA, labelId: a.questionId },
                          { key: "2", id: a.choiceB, text: a.choiceTextB, labelId: a.questionId },
                          { key: "3", id: a.choiceC, text: a.choiceTextC, labelId: a.questionId }]
                      }
                      onChange={this._onChange}
                      ariaLabelledBy='Procurement Form'
                    />
                    { a.endText ? 
                      <div className={styles.endtext}>{a.endText}</div>
                      : null }                           
                    </div>
                    </div>
                </div>
              );  
            })
          }            
        </div>
      </div>
    );
  }
}
