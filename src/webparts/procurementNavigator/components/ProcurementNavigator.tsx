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
  //   // mockArray.map(index => {
  //   //   console.log(index);
  //   //   index.showEnd = false;
  //   //   index.questionId == 1 ?
  //   //     index.visible = true
  //   //     : index.visible = false;    
  //   // })

  //   // const firstQuestion = mockArray.filter( n => n.questionId == 1 );

  //   // this.state = {
  //   //   mockArray,
  //   //   tabsDisplay: [ ...firstQuestion ] 
  //   // }

    const firstQuestion = mockArray.filter( n => n.questionId == 1 );

    this.state = {
      mockArray,
      tabsDisplay: [ ...firstQuestion ] 
    }

  }

  // firstQuestion = mockArray.filter( n => n.questionId == 1 );

  // state = {
  //       mockArray,
  //       tabsDisplay: [ ...this.firstQuestion ] 
  // }

  componentDidMount() {
    console.log('Did Mount');
    console.dir(this.state);
  }

  componentDidUpdate() {
    console.log('Did Update');
    console.dir(this.state);
  }

  //Set an array of all items that should be visible
    // let myArr = this.state.mockArray.filter(question => question.visible == true);

    _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption) {
      // console.log(ev.currentTarget);
      // console.log(ev.target);
      // const selectedInput = ev.currentTarget;
      // console.log("THIS IS IT!: "+option.labelId);

      // const question = [...this.state.tabsDisplay];
      
        // if ( option.labelId > n.questionId ) {
        //   n.visible = false;
        // }

        //question.choiceTextA

        // if ( option.id == n.questionId ) {
        //   // console.log(n.questionId);
        //   // console.log(option.id);
        //   n.visible = true;          
        // } else {
        //   if ( (option.id < n.questionId) ) {
        //     n.visible = false; 
        //   } else {
        //     n.visible = true; 
        //   }
        // }

      



      // const rollBackQuestions = () => {
      //   this.state.tabsDisplay.map( (n, index) => {
      //     console.log(index);
      //   })
      // }


      //Remove entries if someone has rolled back on the questions
      const found = this.state.tabsDisplay.findIndex(element => element.questionId == option.labelId);

      if(found) {
        const rollBackQuestions = this.state.tabsDisplay.slice(found);
        const addQuestion = this.state.mockArray.filter( n => n.questionId == option.id );

        this.setState(
          {
            tabsDisplay: [
              ...rollBackQuestions,
              ...addQuestion
            ]
          }
        ) 
      } else {
        const addQuestion = this.state.mockArray.filter( n => n.questionId == option.id );

        this.setState(
          {
            tabsDisplay: [
              ...this.state.tabsDisplay,
              ...addQuestion
            ]
          }
        ) 
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
                          [{ key: "1", id: a.choiceA, text: a.choiceTextA, labelId: a.questionId },
                          { key: "2", id: a.choiceB, text: a.choiceTextB, labelId: a.questionId }]
                          :
                          [{ key: "1", id: a.choiceA, text: a.choiceTextA, labelId: a.questionId },
                          { key: "2", id: a.choiceB, text: a.choiceTextB, labelId: a.questionId },
                          { key: "3", id: a.choiceC, text: a.choiceTextC, labelId: a.questionId }]
                      }
                      // selectedKey={question.questionId}
                      onChange={this._onChange}
                      // onClick={test}
                      ariaLabelledBy='Procurement Form'
                    />
                    { a.showEnd ? 
                      <div>show end</div>
                      : null
                    }
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
